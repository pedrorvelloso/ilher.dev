/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { HeadersFunction } from 'remix'

export const getHeaders: HeadersFunction = ({ loaderHeaders }) => {
  const headers = new Headers()
  const usefulHeaders = ['Cache-Control', 'Vary', 'Server-Timing']
  for (const headerName of usefulHeaders) {
    if (loaderHeaders.has(headerName)) {
      headers.set(headerName, loaderHeaders.get(headerName)!)
    }
  }

  return headers
}
