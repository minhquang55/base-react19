import { useEffect, type ReactNode } from "react"

import { useUserProfile } from "@/hooks/queries/useAuthQuery"
import authStore from "@/stores/auth.store"
import { localStorageServices } from "@/utils/localStorageServices.ts"

export default function AppProvider({ children }: { readonly children: ReactNode }) {
  const accessToken = localStorageServices.getAccessToken()
  const setAuth = authStore.use.setAuth()
  const setIsInitialize = authStore.use.setIsInitialize()
  const isInitialize = authStore.use.isInitialize()

  const {
    data: userProfile,
    isFetched,
    isError,
  } = useUserProfile({
    config: {
      enabled: !!accessToken,
    },
  })

  useEffect(() => {
    if (isFetched && !isError && userProfile?.data) {
      setAuth({
        id: userProfile.data.id,
        email: userProfile.data.email,
        name: userProfile.data.name,
      })
      setIsInitialize("success")
    }
    if (isError) {
      setIsInitialize("error")
    }
  }, [isFetched, isError, userProfile, setAuth, setIsInitialize])

  if (isInitialize === "isLoading" && accessToken) {
    return null
  }

  return <>{children}</>
}
