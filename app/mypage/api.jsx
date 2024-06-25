"use server";

export async function OrderResponse(userIdWithPrefix) {
  console.log("userid", userIdWithPrefix);
  try {
    const orderResponse = await fetch(
      `${process.env.API_KEY}/get_order_list/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userIdWithPrefix,
        }),
      }
    );
    const data = await orderResponse.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
}

export const getFavoriteComponents = async (userId) => {
  try {
    const response = await fetch(`${process.env.API_KEY}/get_favorite_list/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const components = [];

    Object.keys(data).forEach((key) => {
      data[key].forEach((component) => {
        components.push({
          ComponentID: component.ComponentID,
          Model: component.Model,
          Type: component.Type,
          Price: component.LowestPrice,
          ImageURL: component.ImageURL,
          specs: [
            `Company: ${component.Company}`,
            `Process: ${component.Process}`,
            `Socket: ${component.Socket}`,
            `Core: ${component.Core}`,
            `Thread: ${component.Thread}`,
            `Clock: ${component.Clock}`,
            `Boost: ${component.Boost}`,
            `Memory: ${component.Memory}`,
            `GpuClock: ${component.GpuClock}`,
          ],
        });
      });
    });

    return components;
  } catch (error) {
    console.error("Error fetching favorite components:", error.message);
    throw error;
  }
};

export const deleteFavoriteComponent = async (componentId) => {
  // 실제 API 호출로 대체 필요
  console.log("Deleting favorite component:", componentId);
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
