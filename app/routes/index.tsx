import type { LoaderFunction } from 'remix'
import { json, useLoaderData } from 'remix'

import HeroSection from '~/components/sections/hero-section'
import StackSection from '~/components/sections/stack-section'

import { highlight } from '~/utils/hljs.server'
import {
  frontendStack as frontendStackCode,
  backendStack as backendStackCode,
  infraStack as infraStackCode,
} from '~/utils/stack'

type IndexLoaderData = {
  stack: {
    frontendStack: string
    backendStack: string
    infraStack: string
  }
}

export const loader: LoaderFunction = () => {
  const frontendStack = highlight(frontendStackCode, 'json')
  const backendStack = highlight(backendStackCode, 'json')
  const infraStack = highlight(infraStackCode, 'json')

  const stack = { frontendStack, backendStack, infraStack }

  return json({ stack })
}

const Index = () => {
  const data = useLoaderData<IndexLoaderData>()

  return (
    <>
      <HeroSection />
      <StackSection stack={data.stack} />
    </>
  )
}

export default Index
