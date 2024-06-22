"use server";

export async function FetchComponentList () {
    try {
      const response = await fetch(
        `${process.env.API_KEY}/get_component_list/`,
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    component_type: componentTypeMap[selectedPart] 
                }),
              }
      );
      console.log("API response data:", response.data); // Log API response

      const data = await response.data.map((option) => ({
        ...option,
        price: parseFloat(option.LowestPrice.replace(/[^0-9.-]+/g, "")) || 0, // Extract the minimum price
        DDR: option.DDR || 0, // Default DDR to 0 if not available
      }));

      console.log("Mapped data:", data); 
      return(data);// Log mapped data// Reset to the first page when data changes
    } catch (error) {
      console.error("Failed to fetch component list:", error);
    }
};

export async function CompleteOrder(orderData){
    try {
        const response = await fetch(
          `${process.env.API_KEY}/create_order/`,

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderData
            }),
          }
        );
        console.log("Order created successfully:", response.data);
        return await response.data;
      } catch (error) {
        console.error("Failed to create order:", error);
      }

}