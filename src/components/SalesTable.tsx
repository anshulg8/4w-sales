// src/components/SalesTable.tsx
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
} from "@chakra-ui/react";
import { Model } from "../data";

interface SalesTableProps {
  models: Model[];
}

const SalesTable: React.FC<SalesTableProps> = ({ models }) => {
  // Extract unique months from all models
  const months = Array.from(
    new Set(models.flatMap((model) => Object.keys(model.sales)))
  );

  // Calculate total sales for each month
  const totalSales = months.reduce((acc, month) => {
    acc[month] = models.reduce(
      (total, model) => total + (model.sales[month] || 0),
      0
    );
    return acc;
  }, {} as Record<string, number>);

  return (
    <Box position="relative" p={4}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        // transform="translate(-50%, -50%)"
        zIndex={1}
        pointerEvents="none"
        color="rgba(0, 0, 0, 0.2)"
        fontSize="6xl"
        fontWeight="bold"
        whiteSpace="nowrap"
        textAlign="center"
        transform="rotate(-30deg)"
        width="80%"
        maxWidth="600px"
      >
        <Text>anshulgarg.in</Text>
      </Box>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Month</Th>
              <Th>Total Sales</Th>
              {models.map((model) => (
                <Th key={model.name}>{model.name}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {months.map((month) => (
              <Tr key={month}>
                <Td>{month}</Td>
                <Td>{totalSales[month] || 0}</Td>
                {models.map((model) => (
                  <Td key={model.name}>{model.sales[month] || 0}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesTable;
