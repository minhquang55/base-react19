import { useMutation, useQuery } from "@tanstack/react-query"

import { getUserProfile, loginApi, logoutApi } from "@/api/auth/authApi"
import type { MutationConfig, QueryConfig } from "@/lib/react-query"
import type { Profile } from "@/types/auth.type"
import type { Response } from "@/types/common.type"

type UserProfileOptions = { config: QueryConfig<typeof getUserProfile> }

export const USER_PROFILE = "USER_PROFILE"

export const useUserProfile = ({ config }: UserProfileOptions) => {
  return useQuery<Response<Profile>, Error>({
    queryKey: [USER_PROFILE],
    queryFn: getUserProfile,
    ...config,
  })
}

type UseLoginOptions = {
  config?: MutationConfig<typeof loginApi>
}

export const useLogin = ({ config }: UseLoginOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: loginApi,
  })
}

type UseLogoutOptions = {
  config?: MutationConfig<typeof logoutApi>
}

export const useLogout = ({ config }: UseLogoutOptions = {}) => {
  return useMutation({
    mutationFn: logoutApi,
    ...config,
  })
}
