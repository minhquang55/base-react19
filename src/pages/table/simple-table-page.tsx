import { useTranslation } from "react-i18next"

import { SimpleTableData } from "@/components/features/table/simple-table/simple-table-data"
import { TypographyH2 } from "@/components/shared/ui/typography-h2"
import { PageLayout } from "@/layouts/PageLayout"

export const SimpleTablePage = () => {
  const { t } = useTranslation()

  return (
    <PageLayout title={t('table:simpleTable.title')}>
      <TypographyH2>{t('table:simpleTable.title')}</TypographyH2>
      <SimpleTableData />
    </PageLayout>
  )
}