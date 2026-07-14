'use client'

import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error('Bad response')
    return r.json() as Promise<{ count: number }>
  })

export function useCvCount() {
  const { data, error, isLoading } = useSWR('/api/cv/count', fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 30_000,
  })
  return {
    count: data?.count ?? null,
    isLoading,
    isError: !!error,
  }
}