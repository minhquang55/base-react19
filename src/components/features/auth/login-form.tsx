import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import logoDark from "@/assets/logo-dark.svg"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/components/shared/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shared/ui/form"
import { Input } from "@/components/shared/ui/input"
import { ROUTES } from "@/constants/routes"
import { useStateWithGetter } from "@/hooks/common/useStateWithGetter"
import { useLogin, useUserProfile } from "@/hooks/queries/useAuthQuery"
import { queryClient } from "@/lib/react-query"
import { LOGIN_SCHEMA, type LoginDTO } from "@/schemas/auth.schema"
import authStore from "@/stores/auth.store"
import { localStorageServices } from "@/utils/localStorageServices"

export const LoginForm = () => {
  const [isLoading, setIsLoading, getIsLoading] = useStateWithGetter(false)
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setAuth = authStore.use.setAuth()
  const location = useLocation()

  const form = useForm<LoginDTO>({
    resolver: zodResolver(LOGIN_SCHEMA),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  })

  const { mutate } = useLogin({
    config: {
      onError: (error) => {
        const errorCode = error.response?.data.error.code ?? ""
        toast.error(t(`message:error.${errorCode}`))
        setIsLoading(false)
      },
      onSuccess: (data) => {
        localStorageServices.setAccessToken(data.data?.token ?? "")
        localStorageServices.setRefreshToken(data.data?.refreshToken ?? "")
        queryClient.removeQueries()
        refetchProfile()
      },
    },
  })

  const {
    isSuccess: isGetUserSuccess,
    data: userProfile,
    refetch: refetchProfile,
  } = useUserProfile({
    config: {
      enabled: false,
    },
  })

  useEffect(() => {
    if (isGetUserSuccess && userProfile?.data) {
      setAuth({
        id: userProfile.data.id,
        email: userProfile.data.email,
        name: userProfile.data.name,
      })
      const from = (location.state as { from?: Location })?.from?.pathname ?? ROUTES.HOME
      navigate(from, { replace: true })
      setIsLoading(false)
    }
  }, [isGetUserSuccess, refetchProfile, setAuth, navigate, setIsLoading, userProfile, location.state])

  const onSubmit = (values: LoginDTO) => {
    if (getIsLoading()) return
    setIsLoading(true)
    mutate(values)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <img src={logoDark} alt="Logo" className="w-60 h-auto mx-auto" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>{t("auth:login.email")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t("auth:login.email")} {...field} />
                  </FormControl>
                  <FormMessage className="min-h-[20px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth:login.password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("auth:login.password")}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="min-h-[20px]" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading} variant="secondary">
              {isLoading ? t("common:loading") : t("button:login")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
