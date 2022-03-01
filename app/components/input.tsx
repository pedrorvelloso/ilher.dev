import { ReactNode, forwardRef } from 'react'
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
  errorMessage?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftContent, errorMessage, ...inputProps }, ref) => {
    return (
      <InputContainer
        className={clsx(
          'relative border shadow-md flex items-center justify-between text-gray-800 transition-all',
          {
            'bg-gray-300': inputProps.disabled,
            'bg-white': !inputProps.disabled,
            'border-gray-400': !errorMessage && !inputProps.disabled,
            'border-red-600': errorMessage && !inputProps.disabled,
          },
        )}
      >
        <input
          className="outline-none bg-transparent w-full"
          {...inputProps}
          ref={ref}
        />
        {leftContent}
        {errorMessage && !inputProps.disabled && (
          <span className="absolute -bottom-8 right-0 left-0 text-red-600 px-3">
            {errorMessage}
          </span>
        )}
      </InputContainer>
    )
  },
)
