interface CodeProps {
  children: string
}

export const Code = ({ children }: CodeProps) => {
  return (
    <pre
      className="code code__scroll"
      // render code from server side after highligh.js step
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
