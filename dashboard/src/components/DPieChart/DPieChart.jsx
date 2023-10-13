import React from "react";
import { Pie, Cell, PieChart } from "recharts";


const dataPie = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  // { name: "Group C", value: 300 },
  // { name: "Group D", value: 200 },
];

const COLORS = ["#c7bff1", "#6e56f5"];

const DPieChart = () => {
  return (
      <PieChart width={100} height={100}>
        <text x={"55%"} y={"48%"} dy={8} textAnchor="middle">
        48%
      </text>
        <Pie
          data={dataPie}
          cx={50}
          cy={45}
          innerRadius={30}
          outerRadius={45}
          fill="#8884d8"
          stroke="0"
          paddingAngle={0}
          dataKey="value"
        >
          {dataPie.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              dataKey={entry.name}
            />
          ))}
        </Pie>
      </PieChart>
  );
};

export default DPieChart;
