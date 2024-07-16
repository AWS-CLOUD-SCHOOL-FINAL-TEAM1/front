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
                isSelected={checkboxState.ddr === "DDR4"}
                onChange={(e) =>
                  toggleFilter("ddr", e.target.checked ? "DDR4" : "")
                }
              >
                DDR4
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.ddr === "DDR5"}
                onChange={(e) =>
                  toggleFilter("ddr", e.target.checked ? "DDR5" : "")
                }
              >
                DDR5
              </Checkbox>
            </div>
          </div>
        );
      case "그래픽카드":
        return (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="gpuChipset">
              Company
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
                isSelected={checkboxState.formFactor === "M.2 2280"}
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "M.2 2280" : "")
                }
              >
                M.2 2280
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.formFactor === "2.5형"}
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "2.5형" : "")
                }
              >
                2.5형
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.formFactor === " 외장형"}
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? " 외장형" : "")
                }
              >
                외장형
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.formFactor === "3.5형"}
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "3.5형" : "")
                }
              >
                3.5형
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.formFactor === "M.2 2230"}
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "M.2 2230" : "")
                }
              >
                M.2 2230
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
                isSelected={checkboxState.productType === "풀모듈러"}
                onChange={(e) =>
                  toggleFilter(
                    "productType",
                    e.target.checked ? "풀모듈러" : ""
                  )
                }
              >
                풀모듈러
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.productType === "논모듈러"}
                onChange={(e) =>
                  toggleFilter(
                    "productType",
                    e.target.checked ? "논모듈러" : ""
                  )
                }
              >
                논모듈러
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.productType === "세미모듈러"}
                onChange={(e) =>
                  toggleFilter(
                    "productType",
                    e.target.checked ? "세미모듈러" : ""
                  )
                }
              >
                세미모듈러
              </Checkbox>
            </div>
          </div>
        );

      case "케이스":
        return (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="powerSize">
              Power Size
            </label>
            <div className="flex space-x-2" id="powerSize">
              <Checkbox
                isSelected={checkboxState.powerSize === "ATX"}
                onChange={(e) =>
                  toggleFilter("powerSize", e.target.checked ? "ATX" : "")
                }
              >
                ATX
              </Checkbox>
              <Checkbox
                isSelected={checkboxState.powerSize === "SFX"}
                onChange={(e) =>
                  toggleFilter("powerSize", e.target.checked ? "SFX" : "")
                }
              >
                SFX
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
