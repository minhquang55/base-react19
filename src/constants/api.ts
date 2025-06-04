export const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL + "/api/v1"

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/sign-in",
    LOGOUT: "/auth/sign-out",
    PROFILE: "/auth/profile",
  },
}

export const API_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  ERR_NETWORK: "ERR_NETWORK",
}

export const ERROR_FORBIDDEN_MESSAGE = "Forbidden"
