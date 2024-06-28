"use server";
// api.jsx
export const fetchLandingPageData = async () => {
  try {
    const response = await fetch(`${process.env.API_KEY}/get_landing_page/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);

    return data;
  } catch (error) {
    console.error("Fetch landing page data failed:", error.message);
    throw error;
  }
};
