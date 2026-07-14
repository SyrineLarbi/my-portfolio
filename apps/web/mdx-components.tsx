import type { ComponentProps, ComponentType } from 'react'

type MDXComponents = Record<string, ComponentType<ComponentProps<'div'>>>

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components }
}
