import ReactSyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-light'
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import diff from 'react-syntax-highlighter/dist/cjs/languages/prism/diff'
import sh from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'

ReactSyntaxHighlighter.registerLanguage('ts', ts)
ReactSyntaxHighlighter.registerLanguage('js', js)
ReactSyntaxHighlighter.registerLanguage('tsx', tsx)
ReactSyntaxHighlighter.registerLanguage('jsx', jsx)
ReactSyntaxHighlighter.registerLanguage('diff', diff)
ReactSyntaxHighlighter.registerLanguage('sh', sh)
ReactSyntaxHighlighter.registerLanguage('json', json)

interface SyntaxHighlighterProps {
  language: string
  useInlineStyles?: boolean
  showLineNumbers?: boolean
  lines?: number[]
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  language,
  useInlineStyles = false,
  showLineNumbers = language === 'tsx' ||
    language === 'jsx' ||
    language === 'json',
  lines = [0],
  ...props
}) => {
  return (
    <ReactSyntaxHighlighter
      language={language}
      useInlineStyles={useInlineStyles}
      showLineNumbers={showLineNumbers}
      className="code code__scroll p-4"
      wrapLines
      lineProps={(lineNumber) => {
        const defaultStyle = {
          display: 'block',
          position: 'relative',
        }
        if (lines.includes(lineNumber))
          return {
            style: {
              fontWeight: 'bold',
              ...defaultStyle,
            },
            'data-code-highlight': true,
          }
        return {
          style: defaultStyle,
        }
      }}
      {...props}
    />
  )
}
