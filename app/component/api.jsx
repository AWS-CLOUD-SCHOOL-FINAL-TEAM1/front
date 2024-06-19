'use server';

export async function ComponentAPI() {
  console.log('test');
  try {
    const response = await fetch('http://127.0.0.1:8000/component/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "cpu_index": "0",
        "memory_index": "0",
        "cooler_index": "0",
        "case_index": "0",
        "power_index": "0",
        "mainboard_index": "0",
        "gpu_index": "0",
        "storage_index": "0"
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Fetched data:', responseData);

    const { cpu, gpu, mainboard, memory, storage, power, cooler, case: pcCase } = responseData;

    if (!Array.isArray(cpu) || !Array.isArray(gpu) || 
        !Array.isArray(mainboard) || !Array.isArray(memory) || 
        !Array.isArray(storage) || !Array.isArray(power) || 
        !Array.isArray(cooler) || !Array.isArray(pcCase)) {
      throw new Error('Invalid data structure');
    }

    return { 
      cpuData: cpu, 
      gpuData: gpu, 
      mainboardData: mainboard, 
      memoryData: memory, 
      storageData: storage, 
      powerData: power, 
      coolerData: cooler, 
      caseData: pcCase 
    };
  } catch (error) {
    console.error('Fetch components failed:', error.message);
    throw error;
  }
}
