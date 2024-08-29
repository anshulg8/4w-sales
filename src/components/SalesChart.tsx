// src/components/SalesChart.tsx
import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  Text,
  useColorMode,
  IconButton,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import html2canvas from "html2canvas";
import { Model } from "../data";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

interface SalesChartProps {
  models: Model[];
}

const colorPalette = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#413ea0",
  "#a4de6c",
  "#d0ed57",
  "#f1e15e",
  "#ff6f6f",
  "#ff9a9a",
];

const getColorForModel = (index: number) =>
  colorPalette[index % colorPalette.length];

const SalesChart: React.FC<SalesChartProps> = ({ models }) => {
  const [chartType, setChartType] = useState<"line" | "bar">("bar");
  const [watermarked, setWatermarked] = useState<boolean>(true);
  const chartRef = useRef<HTMLDivElement>(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const downloadChart = async () => {
    if (!chartRef.current) return;

    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = "sales-chart.png";
    link.click();
  };

  const downloadChartWithWatermark = async () => {
    if (!chartRef.current) return;

    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = "sales-chart-with-watermark.png";
    link.click();
  };

  useEffect(() => {
    const watermark = document.querySelector("#watermark") as HTMLElement;
    if (watermark) {
      watermark.style.display = watermarked ? "block" : "none";
    }
  }, [watermarked]);

  const data = models[0]?.sales
    ? Object.keys(models[0].sales).map((month) => ({
        month,
        ...models.reduce(
          (acc, model) => ({ ...acc, [model.name]: model.sales[month] || 0 }),
          {}
        ),
      }))
    : [];

  return (
    <Box position="relative" p={4}>
      <HStack spacing={4} mb={4} align="center">
        {/* <Button colorScheme="teal" onClick={downloadChart}>
          Download
        </Button> */}
        <Button colorScheme="teal" onClick={downloadChartWithWatermark}>
          Download
        </Button>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="chart-switch" mb="0">
            <Text>Line Chart</Text>
          </FormLabel>
          <Switch
            id="chart-switch"
            isChecked={chartType === "bar"}
            onChange={() =>
              setChartType((prev) => (prev === "line" ? "bar" : "line"))
            }
          />
          <FormLabel htmlFor="chart-switch" mb="0" ml={2}>
            <Text>Bar Chart</Text>
          </FormLabel>
        </FormControl>
        {/* <Button
          colorScheme={watermarked ? "red" : "green"}
          onClick={() => setWatermarked((prev) => !prev)}
        >
          {watermarked ? "Hide Watermark" : "Show Watermark"}
        </Button> */}
      </HStack>
      <div ref={chartRef} style={{ position: "relative" }}>
        {chartType === "line" ? (
          <LineChart width={800} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {models.map((model, index) => (
              <Line
                key={model.name}
                type="monotone"
                dataKey={model.name}
                stroke={getColorForModel(index)}
              />
            ))}
          </LineChart>
        ) : (
          <BarChart width={800} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {models.map((model, index) => (
              <Bar
                key={model.name}
                dataKey={model.name}
                fill={getColorForModel(index)}
              />
            ))}
          </BarChart>
        )}
        {watermarked && (
          <Box
            id="watermark"
            position="absolute"
            top="0"
            left="20%"
            width="100%"
            height="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            pointerEvents="none"
            zIndex="10"
            style={{ display: "none" }}
          >
            <Text
              fontSize="3xl"
              color="rgba(0, 0, 0, 0.5)"
              fontWeight=""
              transform="rotate(-30deg)"
            >
              anshulgarg.in
            </Text>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default SalesChart;
