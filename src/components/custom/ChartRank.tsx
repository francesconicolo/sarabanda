"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"


const chartConfig = {

  green:{
    label: "Green",
    color: "#22c55e",
  },
  red: {
    label: "Red",
    color: "#ef4444",
  },
  yellow: {
    label: "Yellow",
    color: "#f59e0b",
  },
  blue: {
    label: "Blue",
    color: "#3b82f6",
  },
  white: {
    label: "White",
    color: "#fff",
  },

} satisfies ChartConfig

export function ChartRank({rank}:{rank:Object[]}) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-[280px]">
      <BarChart accessibilityLayer data={rank}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="statistiche"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 12)}
        />
        <Bar dataKey="red" fill="var(--color-red)"  stroke="black"  radius={4} label={{ position: "insideBottom", fill: "black"}}/>
        <Bar dataKey="green" fill="var(--color-green)"  stroke="black"  radius={4} label={{ position: "insideBottom", fill: "black"}}/>
        <Bar dataKey="yellow" fill="var(--color-yellow)"  stroke="black"  radius={4} label={{ position: "insideBottom", fill: "black"}}/>
        <Bar dataKey="blue" fill="var(--color-blue)"  stroke="black"  radius={4} label={{ position: "insideBottom", fill: "black"}}/>
        <Bar dataKey="white" fill="var(--color-white)" stroke="black" radius={4} label={{ position: "insideBottom", fill: "black"}}/>

      </BarChart>
    </ChartContainer>
  )
}
