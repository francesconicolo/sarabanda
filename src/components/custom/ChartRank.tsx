import { memo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer } from "../ui/chart";

const chartConfig = {
  green: { label: "Green", color: "#22c55e" },
  red: { label: "Red", color: "#ef4444" },
  yellow: { label: "Yellow", color: "#f59e0b" },
  blue: { label: "Blue", color: "#3b82f6" },
  white: { label: "White", color: "#fff" },
};

const ChartRank = memo(({ rank }: { rank: Object[] }) => (
  <ChartContainer config={chartConfig} className="min-h-[200px] w-[280px]"  >
    <BarChart key={JSON.stringify(rank)} accessibilityLayer data={rank} >
      <CartesianGrid vertical={false} />
      <XAxis
        
        dataKey="statistiche"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value.slice(0, 12)}
      />
      <Bar isAnimationActive={false} dataKey="red" fill="var(--color-red)" stroke="black" radius={4} label={{ position: "insideBottom", fill: "black" }} />
      <Bar isAnimationActive={false}  dataKey="green" fill="var(--color-green)" stroke="black" radius={4} label={{ position: "insideBottom", fill: "black" }} />
      <Bar isAnimationActive={false}  dataKey="yellow" fill="var(--color-yellow)" stroke="black" radius={4} label={{ position: "insideBottom", fill: "black" }} />
      <Bar isAnimationActive={false}  dataKey="blue" fill="var(--color-blue)" stroke="black" radius={4} label={{ position: "insideBottom", fill: "black" }} />
      <Bar isAnimationActive={false}  dataKey="white" fill="var(--color-white)" stroke="black" radius={4} label={{ position: "insideBottom", fill: "black" }} />
    </BarChart>
  </ChartContainer>
));

export default ChartRank;
