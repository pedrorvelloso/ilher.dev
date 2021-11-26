interface StackSectionProps {
  stack: {
    frontendStack: string
  }
}

const StackSection = ({ stack: { frontendStack } }: StackSectionProps) => {
  return (
    <div>
      <pre dangerouslySetInnerHTML={{ __html: frontendStack }} />
    </div>
  )
}

export default StackSection
