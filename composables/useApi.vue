export const useApi = (path: string, opts = {}) => {
  const config = useRuntimeConfig()
  return useFetch(`${config.public.apiBase}${path}`, opts)
}