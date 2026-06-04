import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number; r: number; g: number; b: number }

// Theme accents: red, amber, pink (matching --color-red / -amber / -pink).
const PALETTE: ReadonlyArray<readonly [number, number, number]> = [
  [229, 72, 77],
  [245, 213, 71],
  [255, 79, 154],
]

/**
 * Animated "constellation" web for the hero background. Nodes drift slowly and
 * connect to nearby neighbours with faint lines; the motion eases up and the
 * field gently parts around the cursor, with accent threads drawn from the
 * pointer to nearby nodes. Kept low-contrast and masked so it never competes
 * with the hero text. Honours prefers-reduced-motion (renders one static frame)
 * and pauses while the hero is scrolled out of view.
 */
function HeroWeb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const host = canvas.parentElement
    if (!ctx || !host) return

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const BASE_SPEED = 0.12 // px/frame base drift
    const CONNECT = 134 // px — neighbour link distance
    const MOUSE_RADIUS = 175 // px — pointer influence radius

    let width = 0
    let height = 0
    let nodes: Node[] = []

    let mouseX = -9999
    let mouseY = -9999
    let active = 0 // 0..1, rises with pointer movement, decays when idle
    let lastMove = 0
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

      const count = Math.min(110, Math.max(34, Math.round((width * height) / 11000)))
      nodes = Array.from({ length: count }, () => {
        const [r, g, b] = PALETTE[(Math.random() * PALETTE.length) | 0]
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * BASE_SPEED * 2,
          vy: (Math.random() - 0.5) * BASE_SPEED * 2,
          r,
          g,
          b,
        }
      })
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      const speed = 1 + active * 1.7

      for (const n of nodes) {
        n.x += n.vx * speed
        n.y += n.vy * speed

        // soft radial repulsion so the field parts around the cursor
        if (active > 0.01) {
          const dx = n.x - mouseX
          const dy = n.y - mouseY
          const d2 = dx * dx + dy * dy
          if (d2 < MOUSE_RADIUS * MOUSE_RADIUS) {
            const d = Math.sqrt(d2) || 1
            const f = (1 - d / MOUSE_RADIUS) * 0.7 * active
            n.x += (dx / d) * f
            n.y += (dy / d) * f
          }
        }

        if (n.x < 0) { n.x = 0; n.vx *= -1 } else if (n.x > width) { n.x = width; n.vx *= -1 }
        if (n.y < 0) { n.y = 0; n.vy *= -1 } else if (n.y > height) { n.y = height; n.vy *= -1 }
      }

      // neighbour links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < CONNECT * CONNECT) {
            const t = 1 - Math.sqrt(d2) / CONNECT
            // blend the two endpoint tones for the link
            const r = (a.r + b.r) >> 1
            const g = (a.g + b.g) >> 1
            const bl = (a.b + b.b) >> 1
            ctx!.strokeStyle = `rgba(${r},${g},${bl},${(0.05 + t * 0.13).toFixed(3)})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      // accent threads from the pointer
      if (active > 0.01) {
        for (const n of nodes) {
          const dx = n.x - mouseX
          const dy = n.y - mouseY
          const d2 = dx * dx + dy * dy
          if (d2 < MOUSE_RADIUS * MOUSE_RADIUS) {
            const t = 1 - Math.sqrt(d2) / MOUSE_RADIUS
            ctx!.strokeStyle = `rgba(${n.r},${n.g},${n.b},${(t * 0.4 * active).toFixed(3)})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(n.x, n.y)
            ctx!.lineTo(mouseX, mouseY)
            ctx!.stroke()
          }
        }
      }

      // nodes — each in its own accent tone
      for (const n of nodes) {
        ctx!.fillStyle = `rgba(${n.r},${n.g},${n.b},0.62)`
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, 1.5, 0, Math.PI * 2)
        ctx!.fill()
      }

      if (performance.now() - lastMove > 110) active = Math.max(0, active - 0.018)
    }

    function frame() {
      draw()
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (running || reduce) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    function stop() {
      running = false
      cancelAnimationFrame(raf)
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      active = Math.min(1, active + 0.22)
      lastMove = performance.now()
    }

    function onPointerLeave() {
      mouseX = -9999
      mouseY = -9999
    }

    build()
    draw() // paint an initial frame immediately (and the only frame if reduced)

    if (reduce) return

    host.addEventListener('pointermove', onPointerMove)
    host.addEventListener('pointerleave', onPointerLeave)

    const ro = new ResizeObserver(() => build())
    ro.observe(host)

    // Only animate while the hero is on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    io.observe(host)

    return () => {
      stop()
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas aria-hidden="true" className="hero-web" ref={canvasRef} />
}

export default HeroWeb
