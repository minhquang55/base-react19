import { http } from "@/lib/http"
import type { LoginDTO } from "@/schemas/auth.schema"
import type { Profile } from "@/types/auth.type"
import type { Response } from "@/types/common.type"
import { END_POINT } from "@/utils/endpoint"

export type LoginResponse = {
  refreshToken: string
  token: string
}

export const getUserProfile = async (): Promise<Response<Profile>> => {
  return http.get<Response<Profile>>(END_POINT.auth.profile)
}

export const loginApi = (data: LoginDTO) => {
  return http.post<Response<LoginResponse>>(END_POINT.auth.login, {
    data,
  })
}

export const logoutApi = () => {
  return http.post(END_POINT.auth.logout)
}
