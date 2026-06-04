import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number; hx: number; hy: number }

/**
 * Grayscale constellation web for the footer — a denser sibling of the hero's
 * HeroWeb. Unlike the hero (which drifts continuously and parts around the
 * cursor), this field is completely STATIC at rest: nodes sit on fixed home
 * positions and nothing moves until the pointer enters. On hover the nearby
 * nodes are slowly attracted toward the cursor (a soft spring), tightening the
 * web around it; each node is also tethered to its home, so when the pointer
 * leaves they ease back and the field settles to stillness again — at which
 * point the animation loop stops entirely. Honours prefers-reduced-motion
 * (renders a single static frame, no interaction).
 */
function FooterWeb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const host = canvas.parentElement
    if (!ctx || !host) return

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const CONNECT = 104 // px — neighbour link distance (kept short so the denser field stays an airy, even mesh rather than a solid blob)
    const ATTRACT_RADIUS = 260 // px — pointer influence radius
    const ATTRACT_STRENGTH = 0.22 // accel toward pointer at the centre of the field
    const HOME_K = 0.004 // spring constant pulling each node back to its home
    const DAMP = 0.85 // velocity damping — keeps the motion slow and fluid
    const TONE = '236, 230, 216' // cream, used grayscale (no accent hues)

    let width = 0
    let height = 0
    let nodes: Node[] = []

    let mouseX = -9999
    let mouseY = -9999
    let hovering = false
    let raf = 0
    let running = false

    function build() {
      const rect = host!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Much denser than the hero: small area-per-node and a high cap so the
      // field spreads evenly all the way out to the borders.
      const count = Math.min(260, Math.max(64, Math.round((width * height) / 4900)))
      nodes = Array.from({ length: count }, () => {
        const x = Math.random() * width
        const y = Math.random() * height
        return { x, y, vx: 0, vy: 0, hx: x, hy: y }
      })
    }

    // Advance the simulation one step; returns the field's total kinetic +
    // displacement energy so the loop knows when it has settled back to rest.
    function step() {
      let energy = 0
      for (const n of nodes) {
        // spring back toward the home position
        let ax = (n.hx - n.x) * HOME_K
        let ay = (n.hy - n.y) * HOME_K

        // gentle attraction toward the pointer while hovering
        if (hovering) {
          const dx = mouseX - n.x
          const dy = mouseY - n.y
          const d2 = dx * dx + dy * dy
          if (d2 < ATTRACT_RADIUS * ATTRACT_RADIUS) {
            const d = Math.sqrt(d2) || 1
            const falloff = (1 - d / ATTRACT_RADIUS) ** 1.5
            const f = ATTRACT_STRENGTH * falloff
            ax += (dx / d) * f
            ay += (dy / d) * f
          }
        }

        n.vx = (n.vx + ax) * DAMP
        n.vy = (n.vy + ay) * DAMP
        n.x += n.vx
        n.y += n.vy

        energy += Math.abs(n.vx) + Math.abs(n.vy) + Math.abs(n.x - n.hx) + Math.abs(n.y - n.hy)
      }
      return energy
    }

    function render() {
      ctx!.clearRect(0, 0, width, height)

      // neighbour links — grayscale, fading with distance
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < CONNECT * CONNECT) {
            const t = 1 - Math.sqrt(d2) / CONNECT
            ctx!.strokeStyle = `rgba(${TONE},${(0.035 + t * 0.1).toFixed(3)})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      // faint threads from the pointer to nearby nodes while hovering
      if (hovering) {
        for (const n of nodes) {
          const dx = n.x - mouseX
          const dy = n.y - mouseY
          const d2 = dx * dx + dy * dy
          if (d2 < ATTRACT_RADIUS * ATTRACT_RADIUS) {
            const t = 1 - Math.sqrt(d2) / ATTRACT_RADIUS
            ctx!.strokeStyle = `rgba(${TONE},${(t * 0.16).toFixed(3)})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(n.x, n.y)
            ctx!.lineTo(mouseX, mouseY)
            ctx!.stroke()
          }
        }
      }

      // nodes
      ctx!.fillStyle = `rgba(${TONE},0.5)`
      for (const n of nodes) {
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, 1.4, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function frame() {
      const energy = step()
      render()
      // Keep running while the pointer is active or the field is still settling;
      // once it has eased back home and gone still, stop until the next hover.
      if (hovering || energy > 0.4) {
        raf = requestAnimationFrame(frame)
      } else {
        running = false
        render() // final crisp resting frame
      }
    }

    function start() {
      if (running || reduce) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    function onPointerEnter() {
      hovering = true
      start()
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      hovering = true
      start()
    }

    function onPointerLeave() {
      hovering = false
      mouseX = -9999
      mouseY = -9999
      // loop keeps running until the field settles, then stops itself
    }

    build()
    render() // static first frame (and the only frame under reduced motion)

    if (reduce) return

    host.addEventListener('pointerenter', onPointerEnter)
    host.addEventListener('pointermove', onPointerMove)
    host.addEventListener('pointerleave', onPointerLeave)

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      running = false
      build()
      render()
    })
    ro.observe(host)

    return () => {
      cancelAnimationFrame(raf)
      running = false
      host.removeEventListener('pointerenter', onPointerEnter)
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
      ro.disconnect()
    }
  }, [])

  return <canvas aria-hidden="true" className="footer-web" ref={canvasRef} />
}

export default FooterWeb
