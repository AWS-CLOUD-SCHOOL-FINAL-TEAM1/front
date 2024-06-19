'use server';

export async function ComponentAPI(index = 0) {
  console.log('Fetching data with index:', index);
  try {
    const response = await fetch('http://127.0.0.1:8000/get_table_data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "table_names":["Cpu", "Gpu","Memory","Storage","PcCase","Mainboard","Power","Cooler"],
        "table_pages":{
              "Cpu": 0,
              "Gpu": 0,
              "Memory": 0,
              "Storage": 0,
              "PcCase": 0,
              "Mainboard": 0,
              "Power": 0,
              "Cooler": 0
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Fetched data:', responseData);

    const { Cpu, Gpu, Mainboard, Memory, Storage, Power, Cooler, PcCase } = responseData;

    if (!Array.isArray(Cpu) || !Array.isArray(Gpu) || 
        !Array.isArray(Mainboard) || !Array.isArray(Memory) || 
        !Array.isArray(Storage) || !Array.isArray(Power) || 
        !Array.isArray(Cooler) || !Array.isArray(PcCase)) {
      throw new Error('Invalid data structure');
    }

    return { 
      cpuData: Cpu, 
      gpuData: Gpu, 
      mainboardData: Mainboard, 
      memoryData: Memory, 
      storageData: Storage, 
      powerData: Power, 
      coolerData: Cooler, 
      pcCaseData: PcCase 
    };
  } catch (error) {
    console.error('Fetch components failed:', error.message);
    throw error;
  }
}
