import { keepPreviousData, useQuery, type UseQueryOptions } from "@tanstack/react-query"

import { getPrimeContractorUsers } from "@/api/example/primeContractorUsersApi"
import type { Response } from "@/types/common.type"
import type { PrimeContractorUsers, PrimeContractorUsersDTO } from "@/types/example.type"

const PRIME_CONTRACTOR_USERS = "PRIME_CONTRACTOR_USERS"

type UseGetPrimeContractorUser<T> = {
  config?: Omit<UseQueryOptions<Response<PrimeContractorUsers[]>, Error, T>, "queryKey"> & {
    select?: (data: Response<PrimeContractorUsers[]>) => T
  }
  params: PrimeContractorUsersDTO
}

export const useGetPrimeContractorUsers = <T>({ params, config = {} }: UseGetPrimeContractorUser<T>) => {
  return useQuery<Response<PrimeContractorUsers[]>, Error, T>({
    queryKey: [params, PRIME_CONTRACTOR_USERS],
    queryFn: () => getPrimeContractorUsers(params),
    placeholderData: keepPreviousData,
    ...config,
  })
}
  
