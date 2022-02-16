import { CodeWindow } from '~/components/code-window'
import { Section } from '~/components/section'
import { backendStack, frontendStack, infraStack } from '~/utils/stack'

export const StackSection = () => {
  return (
    <div className="bg-accent py-8">
      <Section className="grid grid-cols-1 gap-y-4 gap-x-4 xl:gap-x-8 lg:grid-cols-3 justify-items-center mx-0 lg:mx-auto">
        <CodeWindow title="frontend.json" code={frontendStack} />
        <CodeWindow title="backend.json" code={backendStack} />
        <CodeWindow title="infra.json" code={infraStack} />
      </Section>
    </div>
  )
}
