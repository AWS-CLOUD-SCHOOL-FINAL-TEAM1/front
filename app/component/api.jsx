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
        categories: ["CPU", "GPU"],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Fetched data:', responseData);

    const { data } = responseData;

    if (!data || !data.CPU || !data.GPU) {
      throw new Error('Invalid data structure');
    }

    const cpuData = Array.isArray(data.CPU) ? data.CPU : Object.values(data.CPU || {});
    const gpuData = Array.isArray(data.GPU) ? data.GPU : Object.values(data.GPU || {});

    return { cpuData, gpuData };
  } catch (error) {
    console.error('Fetch components failed:', error.message);
    throw error;
  }
}
