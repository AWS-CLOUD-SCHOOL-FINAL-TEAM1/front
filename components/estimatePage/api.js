// components/api.js
"use server";

export async function FetchComponentList(component_type, user_id) {
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

export async function CompleteOrder(orderData) {
  try {
    const response = await fetch(`${process.env.API_KEY}/create_order/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData), // JSON 문자열로 변환
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Order created successfully:", data); // 로그 추가
    return data;
  } catch (error) {
    console.error("Failed to create order:", error);
  }
}


export async function CompatibilityCheckAPI(estimate) {
  console.log("Sending estimate to API Gateway:", JSON.stringify({ estimate }));

  try {
    const response = await fetch(`${process.env.API_GATEWAY_URL}/check_compatibility`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estimate }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("API Gateway response:", responseData);

    return responseData;
  } catch (error) {
    console.error("Compatibility check failed:", error.message);
    throw error;
  }
}