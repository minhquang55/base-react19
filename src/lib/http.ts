import axios, { type AxiosInstance, type AxiosRequestConfig, type CustomParamsSerializer, type Method } from "axios"
import { includes, isUndefined } from "lodash-es"
import qs from "qs"

import { API_BASE_URL, API_STATUS } from "@/constants/api"
import { LOGOUT_MESSAGE_CODE } from "@/constants/common"
import { ROUTES } from "@/constants/routes"
import authStore from "@/stores/auth.store"
import { localStorageServices } from "@/utils/localStorageServices"

interface HttpClientRequestConfig extends AxiosRequestConfig {
  url: string
}

type RequestMethods = Extract<Method, "get" | "post" | "put" | "delete" | "patch" | "option" | "head">
type RequestCallback = (token: string) => void

const defaultConfig: AxiosRequestConfig = {
  timeout: 30000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  baseURL: API_BASE_URL,
  paramsSerializer: {
    serialize: qs.stringify as unknown as CustomParamsSerializer,
  },
  withCredentials: true,
}

class HttpClient {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  private static requests: RequestCallback[] = []
  private static isRefreshing = false
  private static readonly axiosInstance: AxiosInstance = axios.create(defaultConfig)
  private static readonly whiteList: string[] = ["/sign-in", "/sign-out"]

  private httpInterceptorsRequest(): void {
    HttpClient.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorageServices.getAccessToken()
        config.headers["Authorization"] = `Bearer ${token}`
        return config
      },
      (error) => {
        return Promise.reject(error instanceof Error ? error : new Error(String(error)))
      },
    )
  }

  private readonly getNewToken = async () => {
    const refresh_token = localStorageServices.getRefreshToken()
    return HttpClient.axiosInstance
      .post(`/auth/refresh-token`, {
        refreshToken: refresh_token,
      })
      .then((data) => {
        localStorageServices.setAccessToken(data.data.token)
        localStorageServices.setRefreshToken(data.data.refreshToken)
        return { access_token: data.data.token, refresh_token: data.data.refreshToken }
      })
      .catch((error) => {
        return Promise.reject(error instanceof Error ? error : new Error(String(error)))
      })
  }

  private httpInterceptorsResponse(): void {
    HttpClient.axiosInstance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        const { config } = error
        if (error?.response?.status === API_STATUS.UNAUTHORIZED) {
          if (!HttpClient.whiteList.some((v) => (config?.url as string).indexOf(v) > -1)) {
            if (!HttpClient.isRefreshing) {
              HttpClient.isRefreshing = true
              this.getNewToken()
                .then((data) => {
                  this.onRefreshed(data.access_token)
                })
                .catch((error) => {
                  HttpClient.requests = []
                  if (!window.location.pathname.includes(ROUTES.AUTH.LOGIN)) {
                    authStore.getState().clearAuth()
                  }
                  return Promise.reject(error instanceof Error ? error : new Error(String(error)))
                })
                .finally(() => {
                  HttpClient.isRefreshing = false
                })
            }
            return new Promise((resolve) => {
              this.subscribeTokenRefresh((token: string) => {
                config.headers["Authorization"] = "Bearer " + token
                resolve(HttpClient.axiosInstance.request(config))
              })
            })
          }
        }
        if (
          includes(LOGOUT_MESSAGE_CODE, error?.response?.data?.error?.code) &&
          !isUndefined(authStore.getState().auth)
        ) {
          // alertStore.getState().setAlertConfig({
          //   type: 'error',
          //   key: 'user-inactive-error',
          //   message: error.response?.data.error.code,
          // })
          authStore.getState().clearAuth()
          throw Error("user inactive")
        }
        return Promise.reject(error instanceof Error ? error : new Error(String(error)))
      },
    )
  }

  private onRefreshed(token: string) {
    HttpClient.requests.forEach((cb) => cb(token))
    HttpClient.requests = []
  }

  private subscribeTokenRefresh(cb: RequestCallback) {
    HttpClient.requests.push(cb)
  }

  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpClientRequestConfig,
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as HttpClientRequestConfig
    return HttpClient.axiosInstance.request(config)
  }

  public post<T>(url: string, params?: AxiosRequestConfig, config?: HttpClientRequestConfig) {
    return this.request<T>("post", url, params, config)
  }

  public get<T>(url: string, params?: AxiosRequestConfig, config?: HttpClientRequestConfig) {
    return this.request<T>("get", url, params, config)
  }

  public patch<T>(url: string, params?: AxiosRequestConfig, config?: HttpClientRequestConfig) {
    return this.request<T>("patch", url, params, config)
  }

  public put<T>(url: string, params?: AxiosRequestConfig, config?: HttpClientRequestConfig) {
    return this.request<T>("put", url, params, config)
  }

  public delete<T>(url: string, params?: AxiosRequestConfig, config?: HttpClientRequestConfig) {
    return this.request<T>("delete", url, params, config)
  }
}

export const http = new HttpClient()
