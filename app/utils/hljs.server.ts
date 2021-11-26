import hljs from 'highlight.js'

const withLineNumber = (code: string) => {
  const lines = code.split('\n')
  const linesWithNumbers = lines.map(
    (line, index) =>
      `<span class="code__line" data-line-number="${index + 1}">${line}</span>`,
  )

  return linesWithNumbers.join('\n').trim()
}

export const highlight = (code: string, language: string) => {
  const highlighted = hljs.highlight(code, { language })

  const html = `<code>\n${withLineNumber(highlighted.value)}\n</code>`.replace(
    '\n',
    '',
  )

  return html
}
