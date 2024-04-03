function createProject() {
    var form = document.getElementById("contactForm");
    var elements = form.elements;
    var arr = [];
    var i = 0;
  
    // You can now access form data using formData object
    for (var i = 0; i < 2; i++) {
      arr.push(elements[i].value);
    }
    
    
    saveProject(arr);
}

async function saveProject(array) {
    
    try{
        const response = await fetch("http://127.0.0.1:3000/projectList/saveProject", {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                array
                
            })
        })
        

        if(!response.ok) {
            throw new Error("The data couldn't be saved")
        }

        const data = await response.json();
        
    }

    catch{
        
    }
    
}