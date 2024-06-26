// components/Filter.js
import React, { useState, useEffect } from "react";
import { Slider, Input, Checkbox } from "@nextui-org/react";

const Filter = ({
  selectedPart,
  handleFilterChange,
  handlePriceChange,
  maxPrice,
}) => {
  const [keyword, setKeyword] = useState("");
  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [selectedPart, maxPrice]);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    handleFilterChange("keyword", e.target.value);
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
    handlePriceChange(value);
  };

  const renderSpecificFilters = () => {
    const toggleFilter = (filterType, value) => {
      const newValue = value ? value : "";
      handleFilterChange(filterType, newValue);
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
                onChange={(e) =>
                  toggleFilter("cores", e.target.checked ? "4" : "")
                }
              >
                4
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("cores", e.target.checked ? "6" : "")
                }
              >
                6
              </Checkbox>
              <Checkbox
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
                onChange={(e) =>
                  toggleFilter("threads", e.target.checked ? "8" : "")
                }
              >
                8
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("threads", e.target.checked ? "12" : "")
                }
              >
                12
              </Checkbox>
              <Checkbox
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
                onChange={(e) =>
                  toggleFilter("type", e.target.checked ? "CPU" : "")
                }
              >
                CPU
              </Checkbox>
              <Checkbox
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
                onChange={(e) =>
                  toggleFilter("socket", e.target.checked ? "LGA1200" : "")
                }
              >
                LGA1200
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("socket", e.target.checked ? "LGA1700" : "")
                }
              >
                LGA1700
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("socket", e.target.checked ? "AM4" : "")
                }
              >
                AM4
              </Checkbox>
              <Checkbox
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
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "Intel H" : "")
                }
              >
                Intel H
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "Intel B" : "")
                }
              >
                Intel B
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "Intel Z" : "")
                }
              >
                Intel Z
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "AMD A" : "")
                }
              >
                AMD A
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "AMD B" : "")
                }
              >
                AMD B
              </Checkbox>
              <Checkbox
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
                onChange={(e) =>
                  toggleFilter("ddr", e.target.checked ? "4" : "")
                }
              >
                4
              </Checkbox>
              <Checkbox
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
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "NVIDIA" : "")
                }
              >
                NVIDIA
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("chipset", e.target.checked ? "AMD" : "")
                }
              >
                AMD
              </Checkbox>
              <Checkbox
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
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "2.5" : "")
                }
              >
                2.5
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "M.2" : "")
                }
              >
                M.2
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "PCIe" : "")
                }
              >
                PCIe
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("formFactor", e.target.checked ? "U.2" : "")
                }
              >
                U.2
              </Checkbox>
              <Checkbox
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
        return (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="outputPower">
              Output Power
            </label>
            <div className="grid grid-cols-3 gap-2" id="outputPower">
              <Checkbox
                onChange={(e) =>
                  toggleFilter("outputPower", e.target.checked ? "300W" : "")
                }
              >
                300W
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("outputPower", e.target.checked ? "400W" : "")
                }
              >
                400W
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("outputPower", e.target.checked ? "500W" : "")
                }
              >
                500W
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("outputPower", e.target.checked ? "600W" : "")
                }
              >
                600W
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("outputPower", e.target.checked ? "700W" : "")
                }
              >
                700W
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("outputPower", e.target.checked ? "800W" : "")
                }
              >
                800W
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("outputPower", e.target.checked ? "900W" : "")
                }
              >
                900W
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("outputPower", e.target.checked ? "1000W" : "")
                }
              >
                1000W
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("outputPower", e.target.checked ? "1100W" : "")
                }
              >
                1100W
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("outputPower", e.target.checked ? "1200W" : "")
                }
              >
                1200W
              </Checkbox>
            </div>

            <label className="font-semibold" htmlFor="productType">
              Product Type
            </label>
            <div className="flex space-x-2" id="productType">
              <Checkbox
                onChange={(e) =>
                  toggleFilter("productType", e.target.checked ? "Modular" : "")
                }
              >
                Modular
              </Checkbox>
              <Checkbox
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
                onChange={(e) =>
                  toggleFilter("boardSize", e.target.checked ? "ATX" : "")
                }
              >
                ATX
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("boardSize", e.target.checked ? "Micro-ATX" : "")
                }
              >
                Micro-ATX
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("boardSize", e.target.checked ? "Mini-ITX" : "")
                }
              >
                Mini-ITX
              </Checkbox>
              <Checkbox
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
