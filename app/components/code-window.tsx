import { SyntaxHighlighter } from './syntax-highlighter'

interface CodeWindowProps {
  title: string
  code: string
}

export const CodeWindow = ({ title, code }: CodeWindowProps) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 w-full md:shadow-xl lg:rounded-md">
      <div className="flex items-baseline justify-between relative -mt-2 mb-2">
        <h1 className="text-black dark:text-white font-bold font-mono absolute right-0 left-0 text-center">
          {title}
        </h1>
        <div className="flex">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <SyntaxHighlighter language="json">{code}</SyntaxHighlighter>
      </div>
    </div>
  )
}
