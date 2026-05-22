type SolarBackgroundProps = {
  className?: string
  compact?: boolean
}

function SolarBackground({ className = '', compact = false }: SolarBackgroundProps) {
  const classes = ['solar-background', compact ? 'solar-background--compact' : '', className]
    .filter(Boolean)
    .join(' ')

  return <div aria-hidden="true" className={classes} />
}

export default SolarBackground
