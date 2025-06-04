import { z } from "zod"

import { vStringEmail, vStringRequired } from "@/constants/validates"
import i18n from "@/lib/i18n"

export const LOGIN_SCHEMA = z.object({
  email: vStringEmail(i18n.t("object:email")),
  password: vStringRequired(i18n.t("object:password")),
})

export type LoginDTO = z.infer<typeof LOGIN_SCHEMA>
