// src/App.tsx
import React, { useState } from "react";
import {
  Container,
  Heading,
  VStack,
  Card,
  CardBody,
  Button,
  HStack,
  useColorMode,
  IconButton,
  Text,
  Select,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { manufacturers, Manufacturer, Model } from "./data";
import ManufacturerGrid from "./components/ManufacturerGrid";
import SalesChart from "./components/SalesChart";
import SalesTable from "./components/SalesTable";
import SearchBar from "./components/SearchBar";
import { MoonIcon, SunIcon, ArrowBackIcon } from "@chakra-ui/icons";

const App: React.FC = () => {
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<Manufacturer | null>(null);
  const [selectedModels, setSelectedModels] = useState<Model[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"brand" | "month">("brand");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleManufacturerSelect = (manufacturer: Manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setSelectedModels(manufacturer.models);
  };

  const handleModelSelect = (model: Model) => {
    setSelectedModels((prevModels) =>
      prevModels.includes(model)
        ? prevModels.filter((m) => m !== model)
        : [...prevModels, model]
    );
  };

  const handleGoHome = () => {
    setSelectedManufacturer(null);
    setSelectedModels([]);
    setSelectedMonth(null);
  };

  const handleFilterTypeChange = (value: "brand" | "month") => {
    setFilterType(value);
    setSelectedMonth(null);
    setSelectedManufacturer(null);
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
  };

  // Get unique months from all models
  const allMonths = Array.from(
    new Set(
      manufacturers.flatMap((manufacturer) =>
        manufacturer.models.flatMap((model) => Object.keys(model.sales))
      )
    )
  );

  // Filtered data when filtering by month
  const modelsByMonth =
    selectedMonth && filterType === "month"
      ? manufacturers.flatMap((manufacturer) =>
          manufacturer.models.map((model) => ({
            ...model,
            sales: { [selectedMonth]: model.sales[selectedMonth] || 0 },
          }))
        )
      : [];

  return (
    <Container maxW="container.xl" py={8} minH="100vh" flexDirection="column">
      <HStack justify="space-between" mb={6}>
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Go Home"
          onClick={handleGoHome}
          visibility={
            selectedManufacturer || selectedMonth ? "visible" : "hidden"
          }
        />
        <Heading textAlign="center" color="teal.500">
          Indian 4 Wheelers Sales Dashboard
        </Heading>
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          aria-label="Toggle Theme"
          onClick={toggleColorMode}
        />
      </HStack>

      <Box mb={6}>
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Text>
            Last updated: August 2024. Please note that while we strive to keep
            the data accurate, we do not take any responsibility for potential
            inaccuracies.
          </Text>
        </Alert>
      </Box>

      <HStack mb={4}>
        <Button
          colorScheme={filterType === "brand" ? "teal" : "gray"}
          onClick={() => handleFilterTypeChange("brand")}
        >
          Filter by Brand
        </Button>
        <Button
          colorScheme={filterType === "month" ? "teal" : "gray"}
          onClick={() => handleFilterTypeChange("month")}
        >
          Filter by Month
        </Button>
        {filterType === "month" && (
          <Select
            placeholder="Select month"
            onChange={(e) => handleMonthSelect(e.target.value)}
          >
            {allMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Select>
        )}
      </HStack>

      {filterType === "brand" && !selectedManufacturer ? (
        <VStack spacing={6} align="stretch">
          <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
          <ManufacturerGrid
            manufacturers={manufacturers.sort((a, b) =>
              a.name.localeCompare(b.name)
            )}
            onSelect={handleManufacturerSelect}
            searchQuery={searchQuery}
          />
        </VStack>
      ) : filterType === "brand" && selectedManufacturer ? (
        <VStack spacing={6} align="stretch">
          <HStack spacing={4}>
            {selectedManufacturer.models.map((model) => (
              <Button
                key={model.name}
                colorScheme={selectedModels.includes(model) ? "teal" : "gray"}
                onClick={() => handleModelSelect(model)}
              >
                {model.name}
              </Button>
            ))}
          </HStack>

          {selectedModels.length > 0 ? (
            <VStack spacing={6} align="stretch">
              <Card>
                <CardBody>
                  <SalesChart models={selectedModels} />
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <SalesTable models={selectedModels} />
                </CardBody>
              </Card>
            </VStack>
          ) : (
            <Text fontSize="lg" color="gray.500" textAlign="center">
              Select models to view sales data. <br />
              No models selected yet.
            </Text>
          )}
        </VStack>
      ) : filterType === "month" && selectedMonth ? (
        <VStack spacing={6} align="stretch">
          <Card>
            <CardBody>
              <SalesChart models={modelsByMonth} />
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <SalesTable models={modelsByMonth} />
            </CardBody>
          </Card>
        </VStack>
      ) : (
        <Text fontSize="lg" color="gray.500" textAlign="center">
          Select a month to view sales data.
        </Text>
      )}
    </Container>
  );
};

export default App;
