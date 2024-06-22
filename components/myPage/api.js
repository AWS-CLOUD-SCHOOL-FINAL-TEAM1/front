'use server';

export async function getComponentDetail (componentId,componentType){
    console.log(componentId,componentType);
    try {
        const response = await fetch(
        
          `${process.env.API_KEY}/component_detail/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                component_id: componentId,
                component_type: componentType,
            }),
          }
        );
        const data = await response.json();
        console.log('componentdetail',data)
        return data[0];
      } catch (error) {
        console.error("Failed to fetch component details:", error);
        return 'failed';
      }
}


export async function getCaseDetail (PcCaseID,PcCaseType ){
    try {
        const response = await fetch(
          `${process.env.API_KEY}/component_detail/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                component_id: PcCaseID,
                component_type: PcCaseType,
            }),
          }

        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Failed to fetch case details:", error);
      }
}