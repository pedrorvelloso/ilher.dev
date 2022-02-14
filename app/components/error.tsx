import { Section } from './section'
import { H1, H2 } from './typograph'

interface ErrorPageProps {
  description: string
  title: string
}

export const ErrorPage = ({ description, title }: ErrorPageProps) => {
  return (
    <Section className="text-center h-hero-sm lg:h-hero flex flex-col items-center justify-center">
      <H2 className="font-mono">{description}</H2>
      <H1>{title}</H1>
    </Section>
  )
}
