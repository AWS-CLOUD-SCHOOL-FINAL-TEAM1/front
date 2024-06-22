"use server";

export async function ComponentAPI(index = 0) {
  console.log("Fetching data with index:", index);
  try {
    const response = await fetch(
      `${process.env.API_KEY}/get_table_data/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table_names: [
            "Cpu",
            "Gpu",
            "Memory",
            "Storage",
            "PcCase",
            "Mainboard",
            "Power",
            "Cooler",
          ],
          table_pages: {
            Cpu: index,
            Gpu: index,
            Memory: index,
            Storage: index,
            PcCase: index,
            Mainboard: index,
            Power: index,
            Cooler: index,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const { Cpu, Gpu, Mainboard, Memory, Storage, Power, Cooler, PcCase } =
      responseData;

    if (
      !Array.isArray(Cpu) ||
      !Array.isArray(Gpu) ||
      !Array.isArray(Mainboard) ||
      !Array.isArray(Memory) ||
      !Array.isArray(Storage) ||
      !Array.isArray(Power) ||
      !Array.isArray(Cooler) ||
      !Array.isArray(PcCase)
    ) {
      throw new Error("Invalid data structure");
    }

    return {
      cpuData: Cpu,
      gpuData: Gpu,
      mainboardData: Mainboard,
      memoryData: Memory,
      storageData: Storage,
      powerData: Power,
      coolerData: Cooler,
      pcCaseData: PcCase,
    };
  } catch (error) {
    console.error("Fetch components failed:", error.message);
    throw error;
  }
}

export const fetchComponentDetail = async (component_id, component_type) => {
  try {
    const response = await fetch(
      `${process.env.API_KEY}/component_detail/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          component_id,
          component_type,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch component details");
    }

    return await response.json();
  } catch (error) {}
};
