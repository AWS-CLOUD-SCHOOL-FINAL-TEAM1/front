// components/estimatePage/Filter.js

import React, { useState, useEffect } from "react";
import { Slider, Input, Checkbox } from "@nextui-org/react";

const Filter = ({
  selectedPart,
  handleFilterChange,
  handlePriceChange,
  maxPrice,
  resetFilters, // resetFilters 콜백 추가
}) => {
  const [keyword, setKeyword] = useState("");
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [checkboxState, setCheckboxState] = useState({});

  useEffect(() => {
    setPriceRange([0, maxPrice]);
    resetFilterStates(); // 필터 상태 초기화
  }, [selectedPart, maxPrice]);

  const resetFilterStates = () => {
    setKeyword("");
    setPriceRange([0, maxPrice]);
    setCheckboxState({});
    resetFilters(); // 외부에서 필터 상태를 초기화하는 콜백 호출
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    handleFilterChange("keyword", e.target.value);
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
    handlePriceChange(value);
  };

  const handleCheckboxChange = (filterType, value) => {
    setCheckboxState((prev) => ({ ...prev, [filterType]: value }));
    handleFilterChange(filterType, value);
  };

  const renderSpecificFilters = () => {
    const toggleFilter = (filterType, value) => {
      const newValue = value ? value : "";
      handleCheckboxChange(filterType, newValue);
    };

    switch (selectedPart) {
      case "CPU":
        return (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="cores">
              Cores
            </label>
            <div className="flex space-x-2" id="cores">
              <Checkbox
                isSelected={checkboxState.cores === "4"}
                onChange={(e) =>
                  toggleFilter("cores", e.target.checked ? "4" : "")
                }
              >
                4
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.cores === "6"}
                onChange={(e) =>
                  toggleFilter("cores", e.target.checked ? "6" : "")
                }
              >
                6
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.cores === "8"}
                onChange={(e) =>
                  toggleFilter("cores", e.target.checked ? "8" : "")
                }
              >
                8
              </Checkbox>
            </div>

            <label className="font-semibold" htmlFor="threads">
              Threads
            </label>
            <div className="flex space-x-2" id="threads">
              <Checkbox
                isSelected={checkboxState.threads === "8"}
                onChange={(e) =>
                  toggleFilter("threads", e.target.checked ? "8" : "")
                }
              >
                8
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.threads === "12"}
                onChange={(e) =>
                  toggleFilter("threads", e.target.checked ? "12" : "")
                }
              >
                12
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.threads === "16"}
                onChange={(e) =>
                  toggleFilter("threads", e.target.checked ? "16" : "")
                }
              >
                16
              </Checkbox>
            </div>
          </div>
        );
      case "쿨러":
        return (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="type">
              Type
            </label>
            <div className="flex space-x-2" id="type">
              <Checkbox
                isSelected={checkboxState.type === "CPU"}
                onChange={(e) =>
                  toggleFilter("type", e.target.checked ? "CPU" : "")
                }
              >
                CPU
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.type === "System"}
                onChange={(e) =>
                  toggleFilter("type", e.target.checked ? "System" : "")
                }
              >
                System
              </Checkbox>
            </div>
          </div>
        );
      case "메인보드":
        return (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="socket">
              Socket
            </label>
            <div className="flex space-x-2" id="socket">
              <Checkbox
                isSelected={checkboxState.socket === "LGA1200"}
                onChange={(e) =>
                  toggleFilter("socket", e.target.checked ? "LGA1200" : "")
                }
              >
                LGA1200
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.socket === "LGA1700"}
                onChange={(e) =>
                  toggleFilter("socket", e.target.checked ? "LGA1700" : "")
                }
              >
                LGA1700
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.socket === "AM4"}
                onChange={(e) =>
                  toggleFilter("socket", e.target.checked ? "AM4" : "")
                }
              >
                AM4
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.socket === "AM5"}
                onChange={(e) =>
                  toggleFilter("socket", e.target.checked ? "AM5" : "")
                }
              >
                AM5
              </Checkbox>
            </div>

            <label className="font-semibold" htmlFor="chipset">
              Chipset
            </label>
            <div className="flex space-x-2" id="chipset">
              <Checkbox
                isSelected={checkboxState.chipset === "Intel H"}
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "Intel H" : "")
                }
              >
                Intel H
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.chipset === "Intel B"}
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "Intel B" : "")
                }
              >
                Intel B
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.chipset === "Intel Z"}
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "Intel Z" : "")
                }
              >
                Intel Z
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.chipset === "AMD A"}
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "AMD A" : "")
                }
              >
                AMD A
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.chipset === "AMD B"}
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "AMD B" : "")
                }
              >
                AMD B
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.chipset === "AMD X"}
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "AMD X" : "")
                }
              >
                AMD X
              </Checkbox>
            </div>
          </div>
        );
      case "메모리":
        return (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="ddr">
              DDR
            </label>
            <div className="flex space-x-2" id="ddr">
              <Checkbox
                isSelected={checkboxState.ddr === "4"}
                onChange={(e) =>
                  toggleFilter("ddr", e.target.checked ? "4" : "")
                }
              >
                4
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.ddr === "5"}
                onChange={(e) =>
                  toggleFilter("ddr", e.target.checked ? "5" : "")
                }
              >
                5
              </Checkbox>
            </div>
          </div>
        );
      case "그래픽카드":
        return (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="gpuChipset">
              Chipset
            </label>
            <div className="flex space-x-2" id="gpuChipset">
              <Checkbox
                isSelected={checkboxState.chipset === "NVIDIA"}
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "NVIDIA" : "")
                }
              >
                NVIDIA
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.chipset === "AMD"}
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "AMD" : "")
                }
              >
                AMD
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.chipset === "Intel"}
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "Intel" : "")
                }
              >
                Intel
              </Checkbox>
            </div>
          </div>
        );
      case "SSD":
        return (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="formFactor">
              Form Factor
            </label>
            <div className="flex space-x-2" id="formFactor">
              <Checkbox
                isSelected={checkboxState.formFactor === "2.5"}
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "2.5" : "")
                }
              >
                2.5
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.formFactor === "M.2"}
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "M.2" : "")
                }
              >
                M.2
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.formFactor === "PCIe"}
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "PCIe" : "")
                }
              >
                PCIe
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.formFactor === "U.2"}
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "U.2" : "")
                }
              >
                U.2
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.formFactor === "mSATA"}
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "mSATA" : "")
                }
              >
                mSATA
              </Checkbox>
            </div>
          </div>
        );
      case "파워":
        const powerOptions = [
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
          "1000",
          "1100",
          "1200",
        ];
        return (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="outputPower">
              Output Power
            </label>
            <div className="grid grid-cols-3 gap-2" id="outputPower">
              {powerOptions.map((option) => (
                <Checkbox
                  key={option}
                  isSelected={checkboxState.outputPower === option}
                  onChange={(e) =>
                    toggleFilter("outputPower", e.target.checked ? option : "")
                  }
                >
                  {option}W ~
                </Checkbox>
              ))}
            </div>

            <label className="font-semibold" htmlFor="productType">
              Product Type
            </label>
            <div className="flex space-x-2" id="productType">
              <Checkbox
                isSelected={checkboxState.productType === "Modular"}
                onChange={(e) =>
                  toggleFilter("productType", e.target.checked ? "Modular" : "")
                }
              >
                Modular
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.productType === "Non-Modular"}
                onChange={(e) =>
                  toggleFilter(
                    "productType",
                    e.target.checked ? "Non-Modular" : ""
                  )
                }
              >
                Non-Modular
              </Checkbox>
            </div>
          </div>
        );
      case "케이스":
        return (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="boardSize">
              Board Size
            </label>
            <div className="flex space-x-2" id="boardSize">
              <Checkbox
                isSelected={checkboxState.boardSize === "ATX"}
                onChange={(e) =>
                  toggleFilter("boardSize", e.target.checked ? "ATX" : "")
                }
              >
                ATX
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.boardSize === "Micro-ATX"}
                onChange={(e) =>
                  toggleFilter("boardSize", e.target.checked ? "Micro-ATX" : "")
                }
              >
                Micro-ATX
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.boardSize === "Mini-ITX"}
                onChange={(e) =>
                  toggleFilter("boardSize", e.target.checked ? "Mini-ITX" : "")
                }
              >
                Mini-ITX
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.boardSize === "E-ATX"}
                onChange={(e) =>
                  toggleFilter("boardSize", e.target.checked ? "E-ATX" : "")
                }
              >
                E-ATX
              </Checkbox>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <Input
        className="mb-4"
        fullWidth
        onChange={handleKeywordChange}
        placeholder="Search by name"
        type="text"
        value={keyword}
      />
      <div className="space-y-4">{renderSpecificFilters()}</div>
      <div className="mt-4">
        <Slider
          className="max-w-md"
          formatOptions={{ style: "currency", currency: "KOR" }}
          label="Price Range"
          maxValue={maxPrice}
          minValue={0}
          onChange={handleSliderChange}
          step={1}
          value={priceRange}
        />
      </div>
    </div>
  );
};

export default Filter;
