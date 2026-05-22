type TagProps = {
  children: string
}

function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex border border-border bg-soft px-2.5 py-1 font-mono text-xs text-amber">
      {children}
    </span>
  )
}

export default Tag
