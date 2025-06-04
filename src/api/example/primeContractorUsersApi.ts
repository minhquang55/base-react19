import { http } from "@/lib/http"
import type { Response } from "@/types/common.type"
import type { PrimeContractorUsers, PrimeContractorUsersDTO } from "@/types/example.type"

export const getPrimeContractorUsers = (params?: PrimeContractorUsersDTO) =>
  http.get<Response<PrimeContractorUsers[]>>("/prime-contractor-users", {
    params,
  })
