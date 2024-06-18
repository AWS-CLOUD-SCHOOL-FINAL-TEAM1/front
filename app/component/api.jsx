'use server';

export async function ComponentAPI() {
  console.log('test');
  try {
    const response = await fetch('http://127.0.0.1:8000/filtered-data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categories: ["CPU", "GPU"/*,"MAINBOARD","STORAGE","MEMORY","CASE","POWER","COOLER"*/],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Fetched data:', responseData);

    const { data } = responseData;

    if (!data || !data.CPU || !data.GPU /*|| !data.MAINBOARD|| !data.MEMORY|| !data.STORAGE|| !data.POWER|| !data.COOLER|| !data.CASE */) {
      throw new Error('Invalid data structure');
    }

    const cpuData = Array.isArray(data.CPU) ? data.CPU : Object.values(data.CPU || {});
    const gpuData = Array.isArray(data.GPU) ? data.GPU : Object.values(data.GPU || {});
    /*
    const mainboardData = Array.isArray(data.MAINBOARD) ? data.MAINBOARD : Object.values(data.MAINBOARD || {});
    const memoryData = Array.isArray(data.MEMORY) ? data.MEMORY : Object.values(data.MEMORY || {});
    const storageData = Array.isArray(data.STORAGE) ? data.STORAGE : Object.values(data.STORAGE || {});
    const powerData = Array.isArray(data.POWER) ? data.POWER : Object.values(data.POWER || {});
    const coolerData = Array.isArray(data.COOLER) ? data.COOLER : Object.values(data.COOLER || {});
    const caseData = Array.isArray(data.CASE) ? data.CASE : Object.values(data.CASE || {});
    */

    return { cpuData, gpuData/*,mainboardData,memoryData,storageData,powerData,coolerData,caseData*/ };
  } catch (error) {
    console.error('Fetch components failed:', error.message);
    throw error;
  }
}
