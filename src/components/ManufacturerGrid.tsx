// src/components/ManufacturerGrid.tsx
import React from "react";
import { Grid, Box, Image, Text, Button } from "@chakra-ui/react";
import { Manufacturer } from "../data";

interface ManufacturerGridProps {
  manufacturers: Manufacturer[];
  onSelect: (manufacturer: Manufacturer) => void;
  searchQuery: string;
}

const ManufacturerGrid: React.FC<ManufacturerGridProps> = ({
  manufacturers,
  onSelect,
  searchQuery,
}) => {
  // Filter manufacturers based on the search query
  const filteredManufacturers = manufacturers.filter((manufacturer) =>
    manufacturer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
      {filteredManufacturers.map((manufacturer) => (
        <Box
          key={manufacturer.name}
          borderWidth={1}
          borderRadius="lg"
          overflow="hidden"
          p={4}
          textAlign="center"
          cursor="pointer"
          onClick={() => onSelect(manufacturer)}
        >
          <Image
            src={manufacturer.logo}
            alt={manufacturer.name}
            boxSize="100px"
            objectFit="contain"
            mb={2}
            mx="auto"
          />
          <Text fontWeight="bold">{manufacturer.name}</Text>
        </Box>
      ))}
    </Grid>
  );
};

export default ManufacturerGrid;
