export const removeEmptyValues = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (value === null || value === undefined || value === "") return false
      if (Array.isArray(value) && value.length === 0) return false
      return true
    }),
  ) as Partial<T>
}
