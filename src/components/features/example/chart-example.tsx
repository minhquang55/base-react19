import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Button } from "../../shared/ui/button"

const sampleData = {
  revenue: [
    { name: "DIR", value: 20000000 },
    { name: "Intel", value: 50000000 },
    { name: "IB Biz", value: 25000000 },
    { name: "MSチーム", value: 120000000 },
    { name: "DELL", value: 45000000 },
    { name: "SoftBank", value: 5000000 },
  ],
  profit: [
    { name: "DIR", value: 8000000 },
    { name: "Intel", value: 20000000 },
    { name: "IB Biz", value: 12000000 },
    { name: "MSチーム", value: 60000000 },
    { name: "DELL", value: 18000000 },
    { name: "SoftBank", value: 2000000 },
  ],
}

const groupOptions = [
  { label: "Team", value: "team" },
  { label: "Person in charge", value: "person" },
]

export const ChartExample = () => {
  const [moneyType, setMoneyType] = useState<"revenue" | "profit">("revenue")
  const [groupBy, setGroupBy] = useState<"team" | "person">("team")
  const [data, setData] = useState(sampleData["revenue"])

  const handleRefresh = () => {
    // Giả lập fetch lại dữ liệu theo lựa chọn
    setData(sampleData[moneyType])
  }

  const handleCopy = () => {
    const text = data.map((d) => `${d.name}: ${d.value.toLocaleString()}`).join("\n")
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  const max = Math.max(...data.map((d) => d.value))
  const step = 20000000
  const ticks = []
  for (let i = 0; i <= max; i += step) {
    ticks.push(i)
  }

  return (
    <div>
      <h1>Chart Example</h1>
      <div style={{ background: "#e6ebd5", border: "1px solid #ccc", borderRadius: 8, padding: 24, maxWidth: 700 }}>
        <div style={{ marginBottom: 8, fontWeight: "bold" }}>2016/02 - 2016/02</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 40, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(v) => v.toLocaleString()} ticks={ticks} />
            <Tooltip formatter={(v) => v.toLocaleString()} />
            <Legend payload={[{ value: "2016/02", type: "square", color: "#189ad3" }]} />
            <Bar dataKey="value" name="2016/02" fill="#189ad3" />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 16, marginTop: 16, alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 500 }}>Vertical axis:</div>
            <label style={{ marginRight: 8 }}>
              <input type="radio" checked={moneyType === "revenue"} onChange={() => setMoneyType("revenue")} /> Revenue
            </label>
            <label>
              <input type="radio" checked={moneyType === "profit"} onChange={() => setMoneyType("profit")} /> Profit
            </label>
          </div>
          <div>
            <div style={{ fontWeight: 500 }}>Group by:</div>
            {groupOptions.map((opt) => (
              <label key={opt.value} style={{ marginRight: 8 }}>
                <input type="radio" checked={groupBy === opt.value} onChange={() => setGroupBy(opt.value as "team" | "person")} />{" "}
                {opt.label}
              </label>
            ))}
          </div>
          <Button onClick={handleRefresh}>Refresh</Button>
          <Button variant="outline" onClick={handleCopy}>
            Copy
          </Button>
        </div>
      </div>
    </div>
  )
}
