import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@nextui-org/react";
import Filter from "@/components/estimatePage/Filter";
import axios from "axios";

const PartSelection = ({
  selectedPart,
  handleCompare,
  handleAddOption,
  compareParts,
  setIsCompareModalOpen,
  setCompareParts,
}) => {
  const [optionsData, setOptionsData] = useState([]);
  const [filters, setFilters] = useState({});
  const [maxPrice, setMaxPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const componentTypeMap = {
    CPU: "Cpu",
    메인보드: "Mainboard",
    메모리: "Memory",
    그래픽카드: "Gpu",
    쿨러: "Cooler",
    SSD: "Storage",
    케이스: "PcCase",
    파워: "Power",
  };

  const displayFieldsMap = {
    CPU: ["Core", "Thread"],
    메인보드: ["Socket", "ChipSet"],
    메모리: ["Company", "DDR"],
    그래픽카드: ["Chipset"],
    쿨러: ["Company", "RPM"],
    SSD: ["Company", "FormFactor"],
    케이스: ["PowerSize"],
    파워: ["Company", "MaximumOutput"],
  };

  useEffect(() => {
    const fetchComponentList = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/get_component_list/",
          { component_type: componentTypeMap[selectedPart] }
        );
        console.log("API response data:", response.data); // Log API response

        const data = response.data.map((option) => ({
          ...option,
          price: parseFloat(option.LowestPrice.replace(/[^0-9.-]+/g, "")) || 0, // Extract the minimum price
          DDR: option.DDR || 0, // Default DDR to 0 if not available
        }));

        console.log("Mapped data:", data); // Log mapped data

        setOptionsData(data);
        setMaxPrice(Math.max(...data.map((option) => option.price)));
        setFilters({});
        setCompareParts([]);
        setCurrentPage(1); // Reset to the first page when data changes
      } catch (error) {
        console.error("Failed to fetch component list:", error);
      }
    };

    fetchComponentList();
  }, [selectedPart]);

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const handlePriceChange = (price) => {
    setFilters({ ...filters, price });
  };

  const applyFilters = (options) => {
    return options.filter((option) => {
      const keywordMatch =
        !filters.keyword ||
        Object.values(option).some((value) =>
          String(value).toLowerCase().includes(filters.keyword.toLowerCase())
        );

      return (
        keywordMatch &&
        (!filters.price || option.price <= filters.price[1]) &&
        (!filters.price || option.price >= filters.price[0]) &&
        (!filters.cores || option.Core == filters.cores) &&
        (!filters.threads || option.Thread == filters.threads) &&
        (!filters.type || option.Type == filters.type) &&
        (!filters.socket || option.Socket == filters.socket) &&
        (!filters.chipset || option.ChipSet == filters.chipset) &&
        (!filters.ddr || option.Memory == filters.ddr) &&
        (!filters.formFactor || option.FormFactor == filters.formFactor) &&
        (!filters.outputPower || option.MaximumOutput == filters.outputPower) &&
        (!filters.productType || option.Modular == filters.productType) &&
        (!filters.boardSize || option.Size == filters.boardSize) &&
        (!filters.company || option.Company == filters.company) &&
        (!filters.useCase || option.UseCase == filters.useCase) &&
        (!filters.gpu || option.GPU == filters.gpu) &&
        (!filters.nand || option.NAND == filters.nand) &&
        (!filters.interface || option.Interface == filters.interface) &&
        (!filters.coolingFan || option.CoolingFan == filters.coolingFan) &&
        (!filters.powerSize || option.PowerSize == filters.powerSize)
      );
    });
  };

  const filteredOptions = applyFilters(optionsData);

  // Pagination logic
  const totalPages = Math.ceil(filteredOptions.length / itemsPerPage);
  const paginatedOptions = filteredOptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderDetails = (option) => {
    const fieldsToDisplay = displayFieldsMap[selectedPart];
    return fieldsToDisplay.map((field) => (
      <div key={field}>
        <strong>{field}:</strong> {option[field]}
      </div>
    ));
  };

  return (
    <div className="p-10 w-full md:w-1/2">
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
                {paginatedOptions.map((option) => (
                  <tr key={option.ComponentID}>
                    <td className="border px-2 md:px-4 py-2">
                      <Checkbox
                        onChange={() => handleCompare(option)}
                        isSelected={compareParts.includes(option)}
                      />
                    </td>
                    <td className="border px-2 md:px-4 py-2">
                      <img
                        src={option.ImageURL}
                        alt={option.Model}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="border px-2 md:px-4 py-2">{option.Model}</td>
                    <td className="border px-2 md:px-4 py-2">
                      {renderDetails(option)}
                    </td>
                    <td className="border px-2 md:px-4 py-2">
                      ₩{option.price.toLocaleString()}
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
            <div className="flex justify-between mt-4">
              <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
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
