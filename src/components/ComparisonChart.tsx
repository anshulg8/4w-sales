// src/components/ComparisonChart.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Model } from "../types";
import { Box } from "@chakra-ui/react";

interface ChartDataEntry {
  month: string;
  [modelName: string]: number | string;
}

interface ComparisonChartProps {
  selectedModels: Model[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  selectedModels,
}) => {
  const data: ChartDataEntry[] = Object.keys(
    selectedModels[0]?.sales || {}
  ).map((month) => {
    const entry: ChartDataEntry = { month };

    selectedModels.forEach((model) => {
      entry[model.name] = model.sales[month] || 0;
    });

    return entry;
  });

  const colors = ["#3182ce", "#e53e3e", "#38a169", "#dd6b20", "#d53f8c"];

  return (
    <Box mt={6} p={4} w="100%" h="500px">
      {" "}
      {/* Increased height */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedModels.map((model, index) => (
            <Bar
              key={model.name}
              dataKey={model.name}
              fill={colors[index % colors.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ComparisonChart;
