"use server";

export async function ComponentAPI(component_type, user_id) {
  console.log(
    "Fetching data for component type:",
    component_type,
    "and user:",
    user_id
  );
  try {
    const response = await fetch(`${process.env.API_KEY}/get_component_list/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        component_type: component_type,
        user_id: user_id,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("API response:", responseData);

    if (!Array.isArray(responseData)) {
      throw new Error("Invalid data structure");
    }

    return responseData;
  } catch (error) {
    console.error("Fetch components failed:", error.message);
    throw error;
  }
}

export const fetchComponentDetail = async (component_id, component_type) => {
  try {
    // 로그 출력
    console.log("Calling fetchComponentDetail with:", {
      component_id,
      component_type,
    });

    const response = await fetch(`${process.env.API_KEY}/component_detail/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        component_id: component_id, // 인코딩된 component_id를 그대로 사용
        component_type: component_type,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch component details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch component detail failed:", error.message);
    throw error;
  }
};

export const createHeart = async ({
  user_id,
  component_id,
  component_type,
}) => {
  try {
    const response = await fetch(`${process.env.API_KEY}/create_heart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, component_id, component_type }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating heart:", error.message);
    throw error;
  }
};

export const deleteHeart = async ({
  user_id,
  component_id,
  component_type,
}) => {
  try {
    const response = await fetch(`${process.env.API_KEY}/delete_heart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, component_id, component_type }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting heart:", error.message);
    throw error;
  }
};
