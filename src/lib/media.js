// Refresh original photos cached before the VPS started serving them from the database.
const originalMediaVersion = '20261114'

export const mediaUrl = url => url?.startsWith('/media/')
  ? `${url}${url.includes('?') ? '&' : '?'}v=${originalMediaVersion}`
  : url
