export async function getCart(){          
    const response = await fetch('http://localhost:8000/api/cart/');
    if(response.ok) {
        const data = await response.json();        
        return data;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}


export async function addItem(id_product:number){
       
  
    const response = await fetch(`http://localhost:8000/api/add_item/${id_product}/`, {
        method: 'POST',   
        headers: {
            "Content-Type": "application/json",           
        }
        
    });
    if(response.ok) {
        const data = await response.json();        

        
        return data;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  export async function removeItem(id_product:number){
       
  
    const response = await fetch(`http://localhost:8000/api/delete_item/${id_product}/`, {
        method: 'DELETE',   
        headers: {
            "Content-Type": "application/json",           
        }
        
    });
    if(response.ok) {
        const data = await response.json();        

        
        return data;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
  }



  export async function finishOrder(){
       
  
    const response = await fetch('http://localhost:8000/api/finishorder/', {
        method: 'DELETE',   
        headers: {
            "Content-Type": "application/json",           
        }
        
    });
    if(response.ok) {
        const data = await response.json();        

        
        return data;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
  }