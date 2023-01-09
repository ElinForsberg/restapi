console.log("hej");


// const updateBtn = document.createElement("button");
// const deleteBtn = document.createElement("button");

  
async function getData(){
try {
    const response = await fetch("http://localhost:3000/objects");
    const data = await response.json();
    console.log(data);
    const myObject = data;
    for (const object of myObject){
        const main = document.querySelector("main");
        const div = document.createElement("div");
        div.classList.add("css-forObjectDiv");
        main.appendChild(div);
    
        const type = document.createElement("h1");
        type.classList.add("type")
        type.innerText = object.type;
        div.appendChild(type);
        
        const location = document.createElement("h3");
        location.classList.add("bedrooms")
        location.innerText = object.location;
        div.appendChild(location)

        const bedrooms = document.createElement("h3");
        bedrooms.classList.add("bedrooms")
        bedrooms.innerText = object.bedrooms;
        div.appendChild(bedrooms)

        const price = document.createElement("h3");
        price.classList.add("bedrooms")
        price.innerText = object.price;
        div.appendChild(price)

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.innerText = "Delete object";
        div.appendChild(deleteBtn);

        const updateBtn = document.createElement("button");
        updateBtn.classList.add("updateBtn");
        updateBtn.innerText = "Update object";
        div.appendChild(updateBtn);

        deleteBtn.addEventListener("click", async function deleteData(event) {
            try {
                const response = await fetch(`http://localhost:3000/objects/byid/{id}`, {method: "DELETE"});
                event == object.id;
            }
              
            catch (error) {
                console.log(error);
            }
            })

            // updateBtn.addEventListener("click", async function updateData() {
            //     try {
            //         const response = await fetch("http://localhost:3000/objects/byid/1234567", {method: "PUT"});
            //     }
            //     catch (error) {
            //         console.log(error);
            //     }
            //     })
           
        }

 
} 
catch (error) {
    console.log(error);
}

}

getData();




//        const data = await response.json();
       //console.log(data);
    //    // console.log(data);
     //    const object = data;
    //     const main = document.querySelector("main");
    //     const div = document.createElement("div");
    //     div.classList.add("css-forObjectDiv");
    //     main.appendChild(div);
    
    //     const type = document.createElement("h1");
    //     type.classList.add("type")
     //   type.innerText = object.type;
    //     div.appendChild(type);
        
    //     const location = document.createElement("h3");
    //     location.classList.add("bedrooms")
    //     location.innerText = object.location;
    //     div.appendChild(location)

    //     const bedrooms = document.createElement("h3");
    //     bedrooms.classList.add("bedrooms")
    //     bedrooms.innerText = object.bedrooms;
    //     div.appendChild(bedrooms)

    //     const price = document.createElement("h3");
    //     price.classList.add("bedrooms")
    //     price.innerText = object.price;
    //     div.appendChild(price)

        
    //     deleteBtn.classList.add("deleteBtn");
    //     deleteBtn.innerText = "Delete object";
    //     div.appendChild(deleteBtn);

        
    //     updateBtn.classList.add("updateBtn");
    //     updateBtn.innerText = "Update object";
    //     div.appendChild(updateBtn);
   // }

  

