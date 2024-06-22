'use server';

export async function OrderResponse(userIdWithPrefix) {
    console.log('userid',userIdWithPrefix);
    try {
        const orderResponse = await fetch(
            `${process.env.API_KEY}/get_order_list/`,
            { method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userIdWithPrefix 
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