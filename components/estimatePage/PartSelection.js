import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@nextui-org/react";
import Filter from "@/components/estimatePage/Filter";
import { FetchComponentList } from "./api";
import { getCurrentUser } from "@/auth";
import CustomImage from "@/components/CustomImage";

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
    CPU: "CPU",
    메인보드: "MAINBOARD",
    메모리: "MEMORY",
    그래픽카드: "GPU",
    쿨러: "COOLER",
    SSD: "STORAGE",
    케이스: "PcCase",
    파워: "POWER",
  };

  const displayFieldsMap = {
    CPU: ["Core", "Thread"],
    메인보드: ["Socket", "ChipSet"],
    메모리: ["Company", "Spec"],
    그래픽카드: ["Company"],
    쿨러: ["Company", "RPM"],
    SSD: ["Company", "FormFactor"],
    케이스: ["PowerSize"],
    파워: ["MaximumOutput", "Modular"],
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
          Spec: option.Spec || "",
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

      const outputPowerMatch =
        !filters.outputPower ||
        (parseInt(option.MaximumOutput, 10) >=
          parseInt(filters.outputPower, 10) &&
          parseInt(option.MaximumOutput, 10) <
            parseInt(filters.outputPower, 10) + 100);

      const powerSizePrefix = option.PowerSize
        ? option.PowerSize.split("(")[0].trim().split("/")[0]
        : "";

      return (
        keywordMatch &&
        (!filters.price || option.price <= filters.price[1]) &&
        (!filters.price || option.price >= filters.price[0]) &&
        (!filters.cores || option.Core == filters.cores) &&
        (!filters.threads || option.Thread == filters.threads) &&
        (!filters.type || option.Type == filters.type) &&
        (!filters.socket || option.Socket == filters.socket) &&
        (!filters.chipset || option.Company == filters.chipset) &&
        (!filters.ddr || option.Spec == filters.ddr) &&
        (!filters.formFactor || option.FormFactor == filters.formFactor) &&
        outputPowerMatch &&
        (!filters.productType || option.Modular == filters.productType) &&
        (!filters.boardSize || option.Size == filters.boardSize) &&
        (!filters.company || option.Company == filters.company) &&
        (!filters.useCase || option.UseCase == filters.useCase) &&
        (!filters.gpu || option.GPU == filters.gpu) &&
        (!filters.nand || option.NAND == filters.nand) &&
        (!filters.interface || option.Interface == filters.interface) &&
        (!filters.coolingFan || option.CoolingFan == filters.coolingFan) &&
        (!filters.powerSize ||
          (filters.powerSize === "ATX" && powerSizePrefix.startsWith("ATX")) ||
          (filters.powerSize === "SFX" && powerSizePrefix.startsWith("SF")))
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

  const handleFilterChangeAndResetPage = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
    setCurrentPage(1); // Reset the page to 1
  };

  const handlePriceChangeAndResetPage = (price) => {
    setFilters((prevFilters) => ({ ...prevFilters, price }));
    setCurrentPage(1); // Reset the page to 1
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
            handleFilterChange={handleFilterChangeAndResetPage}
            handlePriceChange={handlePriceChangeAndResetPage}
            maxPrice={maxPrice}
            resetFilters={resetFilters} // resetFilters 콜백 전달
          />
          <div className="overflow-x-auto">
            <table className="table-auto w-full mb-4 bg-white text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-1 md:px-4 py-2">비교</th>
                  <th className="border px-1 md:px-4 py-2">사진</th>
                  <th className="border px-1 md:px-4 py-2">모델</th>
                  <th className="border px-1 md:px-4 py-2">정보</th>
                  <th className="border px-1 md:px-4 py-2">가격</th>
                  <th className="border px-1 md:px-4 py-2">선택</th>
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
                      <CustomImage
                        src={option.ImageURL}
                        alt={option.Model}
                        className="w-12 h-12 md:w-16 md:h-16 object-contain"
                      />
                    </td>
                    <td className="border px-1 md:px-4 py-2">{option.Model}</td>
                    <td className="border px-1 md:px-4 py-2">
                      {renderDetails(option)}
                    </td>
                    <td className="border px-1 md:px-4 py-2">
                      {option.price === 0
                        ? "재입고 예정"
                        : `₩${option.price.toLocaleString()}`}
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
            <div className="flex justify-end mt-4">
              <Button
                className="px-4 py-2 rounded text-white"
                style={{
                  background: "#2897ff",
                  background:
                    "-webkit-linear-gradient(0deg, #2897ff 0%, #ae46f7 100%)",
                  background: "linear-gradient(0deg, #2897ff 0%, #ae46f7 100%)",
                }}
                onClick={() => setIsCompareModalOpen(true)}
              >
                Compare
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PartSelection;
