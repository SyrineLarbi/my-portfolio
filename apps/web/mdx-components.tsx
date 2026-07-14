import type { AnchorHTMLAttributes } from 'react'

export function useMDXComponents(
  components: Record<string, unknown>,
): Record<string, unknown> {
  return {
    ...components,
    // Open external links (http/https) in a new tab; keep internal links normal.
    a: ({ href = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const external = /^https?:\/\//i.test(href)
      return external ? (
        <a href={href} target="_blank" rel="noreferrer" {...props} />
      ) : (
        <a href={href} {...props} />
      )
    },
  }
}
