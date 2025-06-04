import { useTranslation } from "react-i18next"

import { SelectedTableData } from "@/components/features/table/selected-table-data/selected-table-data"
import { TypographyH2 } from "@/components/shared/ui/typography-h2"
import { PageLayout } from "@/layouts/PageLayout"

export const SelectedTablePage = () => {
  const { t } = useTranslation()

  return (
    <PageLayout title={t('table:selectedTable.title')}>
      <TypographyH2>{t('table:selectedTable.title')}</TypographyH2>
      <SelectedTableData />
    </PageLayout>
  )
}