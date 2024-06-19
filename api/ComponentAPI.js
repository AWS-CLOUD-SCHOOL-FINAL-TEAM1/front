
export async function ComponentAPI() {
  try {
    const response = await fetch('http://127.0.0.1:8000/filtered-data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categories: ["CPU", "GPU"],
        last_evaluated_keys: {
          CPU: {
            Category: "CPU",
            ComponentID: "CPU002"
          },
          GPU: {
            Category: "GPU",
            ComponentID: "GPU001"
          }
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const components = [...data.CPU, ...data.GPU];
    return components;
  } catch (error) {
    console.error('Fetch components failed:', error.message);
    throw error;
  }
}