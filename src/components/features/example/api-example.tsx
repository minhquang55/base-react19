import { useState } from "react"

import { getUserProfile } from "@/api/auth/authApi"
import { localStorageServices } from "@/utils/localStorageServices"

import { Button } from "../../shared/ui/button"

export const ApiExample = () => {
  const [loading, setLoading] = useState(false)

  const callProfileApis = async () => {
    setLoading(true)
    for (let i = 0; i < 5; i++) {
      await getUserProfile()
    }
    setLoading(false)
  }

  const handleClearAccessToken = () => {
    localStorageServices.removeAccessToken()
    alert("Đã xoá access-token!")
  }

  return (
    <div className="mb-4">
      <h1>API Example</h1>
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="outline" onClick={handleClearAccessToken}>
          Xoá access-token
        </Button>
        <Button onClick={callProfileApis} disabled={loading}>
          {loading ? "Đang gọi API..." : "Gọi 5 API Profile"}
        </Button>
      </div>
    </div>
  )
}
