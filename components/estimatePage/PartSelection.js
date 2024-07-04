import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@nextui-org/react";
import Filter from "@/components/estimatePage/Filter";
import { FetchComponentList } from "./api";
import { getCurrentUser } from "@/auth";

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
  const [userId, setUserId] = useState("");
  const itemsPerPage = 4;

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
    const fetchUserId = async () => {
      const user = await getCurrentUser();
      setUserId(user ? `google_${user.userId}` : "");
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const getComponentList = async () => {
      try {
        const selection = componentTypeMap[selectedPart];
        const response = await FetchComponentList(selection, userId || "");
        const data = response.map((option) => ({
          ...option,
          price: parseFloat(option.LowestPrice.replace(/[^0-9.-]+/g, "")) || 0,
          DDR: option.DDR || 0,
        }));
        setOptionsData(data);
        setMaxPrice(Math.max(...data.map((option) => option.price)));
        setFilters({});
        setCompareParts([]);
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to fetch component list:", error);
      }
    };

    if (selectedPart) {
      getComponentList();
    }
  }, [selectedPart, userId]);

  useEffect(() => {
    setFilters({});
  }, [selectedPart]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  const handlePriceChange = (price) => {
    setFilters((prevFilters) => ({ ...prevFilters, price }));
  };

  const resetFilters = () => {
    setFilters({});
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
    <div className="p-4 md:p-10 w-full md:w-3/4">
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
            resetFilters={resetFilters} // resetFilters 콜백 전달
          />
          <div className="overflow-x-auto">
            <table className="table-auto w-full mb-4 bg-white text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-1 md:px-4 py-2">Select</th>
                  <th className="border px-1 md:px-4 py-2">Image</th>
                  <th className="border px-1 md:px-4 py-2">Part</th>
                  <th className="border px-1 md:px-4 py-2">Details</th>
                  <th className="border px-1 md:px-4 py-2">Price</th>
                  <th className="border px-1 md:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOptions.map((option) => (
                  <tr key={option.ComponentID}>
                    <td className="border px-1 md:px-4 py-2">
                      <Checkbox
                        onChange={() => handleCompare(option)}
                        isSelected={compareParts.includes(option)}
                      />
                    </td>
                    <td className="border px-1 md:px-4 py-2">
                      <img
                        src={option.ImageURL}
                        alt={option.Model}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover"
                      />
                    </td>
                    <td className="border px-1 md:px-4 py-2">{option.Model}</td>
                    <td className="border px-1 md:px-4 py-2">
                      {renderDetails(option)}
                    </td>
                    <td className="border px-1 md:px-4 py-2">
                      ₩{option.price.toLocaleString()}
                    </td>
                    <td className="border px-1 md:px-4 py-2">
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
              className="mt-4 bg-blue-500 text-white"
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
