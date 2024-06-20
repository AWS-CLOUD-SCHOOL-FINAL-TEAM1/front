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
            <label className="font-semibold">Cores</label>
            <div className="flex space-x-2">
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
            <label className="font-semibold">Threads</label>
            <div className="flex space-x-2">
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

      case "메인보드":
        return (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Socket</label>
            <div className="flex space-x-2">
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
            <label className="font-semibold">Chipset</label>
            <div className="flex space-x-2">
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
            <label className="font-semibold">DDR</label>
            <div className="flex space-x-2">
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
            <label className="font-semibold">Chipset</label>
            <div className="flex space-x-2">
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
            <label className="font-semibold">Form Factor</label>
            <div className="flex space-x-2">
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
            <label className="font-semibold">Output Power</label>
            <div className="grid grid-cols-3 gap-2">
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
            <label className="font-semibold">Product Type</label>
            <div className="flex space-x-2">
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
            <label className="font-semibold">PowerSize</label>
            <div className="flex space-x-2">
              <Checkbox
                onChange={(e) =>
                  toggleFilter("PowerSize", e.target.checked ? "ATX" : "")
                }
              >
                ATX
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("PowerSize", e.target.checked ? "Micro-ATX" : "")
                }
              >
                Micro-ATX
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  toggleFilter("PowerSize", e.target.checked ? "Mini-ITX" : "")
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
        type="text"
        placeholder="Search by name"
        value={keyword}
        onChange={handleKeywordChange}
        className="mb-4"
        fullWidth
      />
      <div className="space-y-4">{renderSpecificFilters()}</div>
      <div className="mt-4">
        <Slider
          label="Price Range"
          step={1}
          minValue={0}
          maxValue={maxPrice}
          value={priceRange}
          onChange={handleSliderChange}
          formatOptions={{ style: "currency", currency: "KOR" }}
          className="max-w-md"
        />
      </div>
    </div>
  );
};

export default Filter;
