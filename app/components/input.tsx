import { ReactNode } from 'react'
import clsx from 'clsx'

interface InputContainerProps {
  className?: string
}

export const InputContainer: React.FC<InputContainerProps> = ({
  children,
  className,
}) => <div className={clsx('p-3 rounded-xl', className)}>{children}</div>

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftContent?: ReactNode
}

export const Input = ({ leftContent, ...inputProps }: InputProps) => {
  return (
    <InputContainer className="relative bg-white border border-gray-400 shadow-md flex items-center justify-between text-gray-800">
      <input className="outline-none bg-transparent w-full" {...inputProps} />
      {leftContent}
    </InputContainer>
  )
}
