import { format } from "date-fns"
import { map } from "lodash-es"
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from "nuqs"

import { DATE_TIME_FORMAT } from "@/constants/common"
import { useGetPrimeContractorUsers } from "@/hooks/queries/usePrimeContractorUserQuery"
import type { Response } from "@/types/common.type"
import type { PrimeContractorUsers, PrimeContractorUsersDTO } from "@/types/example.type"
import { removeEmptyValues } from "@/utils/utils"

const useData = () => {
  const [queryStates] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      limit: parseAsInteger.withDefault(10),
      groups_id_in: parseAsArrayOf(parseAsInteger),
      roles_id_eq: parseAsInteger,
      users_name_cont: parseAsString,
      users_email_cont: parseAsString,
      statusItem_id_eq: parseAsInteger,
    },
    {
      history: "replace",
    },
  )

  const {
    data: primeContractorUsersData,
    isFetching,
    isLoading,
    error,
  } = useGetPrimeContractorUsers<Response<PrimeContractorUsers[]>>({
    params: removeEmptyValues(queryStates) as unknown as PrimeContractorUsersDTO,
  })

  const primeContractorUsersTableData = map(primeContractorUsersData?.data, (primeContractorUser) => ({
    id: primeContractorUser.id,
    department: primeContractorUser.groupUsers[0].group?.name,
    role: primeContractorUser.companyUsers[0].role?.name,
    name: primeContractorUser.name,
    email: primeContractorUser.email,
    status: primeContractorUser.statusItem.name,
    createdAt: format(primeContractorUser.createdAt, DATE_TIME_FORMAT.HYPHEN_DATE_FORMAT),
  }))

  return {
    data: primeContractorUsersTableData,
    meta: primeContractorUsersData?.meta,
    isFetching,
    isLoading,
    error,
  }
}

export default useData
