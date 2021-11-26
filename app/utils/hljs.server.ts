import hljs from 'highlight.js'

const withLineNumber = (code: string) => {
  const lines = code.split('\n')
  const linesWithNumbers = lines.map(
    (line, index) =>
      `<span class="block relative" data-line-number="${
        index + 1
      }">${line}</span>`,
  )

  return linesWithNumbers.join('\n').trim()
}

export const highlight = (code: string, language: string) => {
  const highlighted = hljs.highlight(code, { language })

  return `<code>\n${withLineNumber(highlighted.value)}\n</code>`
}
