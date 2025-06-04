import { API_ENDPOINTS } from "@/constants/api"
import { http } from "@/lib/http"
import type { LoginDTO } from "@/schemas/auth.schema"
import type { Profile } from "@/types/auth.type"
import type { Response } from "@/types/common.type"

export type LoginResponse = {
  refreshToken: string
  token: string
}

export const getUserProfile = async (): Promise<Response<Profile>> => {
  return http.get<Response<Profile>>(API_ENDPOINTS.AUTH.PROFILE)
}

export const loginApi = (data: LoginDTO) => {
  return http.post<Response<LoginResponse>>(API_ENDPOINTS.AUTH.LOGIN, {
    data,
  })
}

export const logoutApi = () => {
  return http.post(API_ENDPOINTS.AUTH.LOGOUT)
}
