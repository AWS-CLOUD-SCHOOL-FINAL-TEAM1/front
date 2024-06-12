import React, { useState, useEffect } from "react";
import { Button, Checkbox, ScrollShadow } from "@nextui-org/react";
import Filter from "@/components/estimatePage/Filter";

const PartSelection = ({
  selectedPart,
  optionsData,
  handleCompare,
  handleAddOption,
  compareParts,
  setIsCompareModalOpen,
  setCompareParts, // compareParts를 초기화하기 위한 함수
}) => {
  const [filters, setFilters] = useState({});
  const [maxPrice, setMaxPrice] = useState(
    Math.max(...optionsData[selectedPart].map((option) => option.price))
  );

  useEffect(() => {
    setMaxPrice(
      Math.max(...optionsData[selectedPart].map((option) => option.price))
    );
    setFilters({});
    setCompareParts([]); // 부품 유형이 변경될 때 compareParts 초기화
  }, [selectedPart]);

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const handlePriceChange = (price) => {
    setFilters({ ...filters, price });
  };

  const applyFilters = (options) => {
    return options.filter((option) => {
      return (
        (!filters.keyword ||
          option.name.toLowerCase().includes(filters.keyword.toLowerCase())) &&
        (!filters.price || option.price <= filters.price[1]) &&
        (!filters.price || option.price >= filters.price[0]) &&
        (!filters.cores || option.specs.cores == filters.cores) &&
        (!filters.threads || option.specs.threads == filters.threads) &&
        (!filters.type || option.specs.type == filters.type) &&
        (!filters.socket || option.specs.socket == filters.socket) &&
        (!filters.chipset || option.specs.chipset == filters.chipset) &&
        (!filters.ddr || option.specs.ddr == filters.ddr) &&
        (!filters.formFactor ||
          option.specs.formFactor == filters.formFactor) &&
        (!filters.outputPower ||
          option.specs.outputPower == filters.outputPower) &&
        (!filters.productType ||
          option.specs.productType == filters.productType) &&
        (!filters.boardSize || option.specs.boardSize == filters.boardSize)
      );
    });
  };

  const filteredOptions = applyFilters(optionsData[selectedPart]);

  return (
    <div className="p-10 w-full md:w-1/2 ">
      {selectedPart && (
        <div className="p-4 border rounded bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {selectedPart}
          </h2>
          <Filter
            selectedPart={selectedPart}
            handleFilterChange={handleFilterChange}
            handlePriceChange={handlePriceChange}
            maxPrice={maxPrice}
          />
          <div className="overflow-x-auto">
            <table className="table-auto w-full mb-4 bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 md:px-4 py-2">Select</th>
                  <th className="border px-2 md:px-4 py-2">Image</th>
                  <th className="border px-2 md:px-4 py-2">Part</th>
                  <th className="border px-2 md:px-4 py-2">Details</th>
                  <th className="border px-2 md:px-4 py-2">Price</th>
                  <th className="border px-2 md:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOptions.map((option) => (
                  <tr key={option.id}>
                    <td className="border px-2 md:px-4 py-2">
                      <Checkbox
                        onChange={() => handleCompare(option)}
                        isSelected={compareParts.includes(option)}
                      />
                    </td>
                    <td className="border px-2 md:px-4 py-2">
                      <img
                        src={option.image}
                        alt={option.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="border px-2 md:px-4 py-2">{option.name}</td>
                    <td className="border px-2 md:px-4 py-2">
                      {Object.values(option.specs).join(", ")}
                    </td>
                    <td className="border px-2 md:px-4 py-2">
                      ${option.price}
                    </td>
                    <td className="border px-2 md:px-4 py-2">
                      <Button
                        auto
                        onClick={() => handleAddOption(selectedPart, option)}
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {compareParts.length === 2 && (
            <Button
              className="mt-4"
              onClick={() => setIsCompareModalOpen(true)}
            >
              Compare
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PartSelection;
