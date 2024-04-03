function check(){
  // this to checck if a project is selectd or not

  projectName = document.getElementById("projectName").textContent

  if (projectName == "Project"){
    const mainContent = document.querySelector("#main");
    mainContent.style.display = "none"

    getProject()
    

  }
}

check()

async function getProject(){
  try{
    const response = await fetch("http://127.0.0.1:3000/projectList/getProject", {
        method: "GET"
    })

    const data = await response.json();
    console.log(data);

    projectDropdown(data);
  }
  catch{

  }
}

function projectDropdown(array){
  // Get the select element
  const select = document.getElementById("projectSelector");

  // Loop through the project names and create options
  array.forEach(project => {
    const option = document.createElement("option");
    // option.value = project.toLowerCase().replace(/\s+/g, ''); // Convert project name to lowercase and remove spaces
    option.textContent = project.projectName;
    select.appendChild(option);
  });
}

document.getElementById("projectSelector").addEventListener("change", function() {
  const selectedProject = this.value;

  if (selectedProject === "+ Add Project") {
    // Redirect the user to the add project page
    window.location.href = "addProject.html";
  }
  else{
    document.getElementById("projectName").textContent = selectedProject;
    document.getElementById("main").style.display = "block";
    document.querySelector(".projectSelector").style.display = "none";
  }

})


function fadeIn(element) {
  let opacity = 0;
  const interval = setInterval(() => {
      if (opacity < 1) {
          opacity += 0.1;
          element.style.opacity = opacity;
      } else {
          clearInterval(interval);
      }
  }, 100); // Adjust the duration of the fade here
}

function checkProject(){

  document.getElementById("projectSelector").addEventListener("change", function() {
    const selectedProject = this.value;
    const mainContent = document.getElementById("main");
  


    console.log(projectName)
    if (projectName == "Project"){
      document.getElementById("main").style.display = "none";
      document.getElementById("projectSelector").style.display = "block";

      setTimeout(() => {
        // Show the main content
        mainContent.style.display = "block";
        // Insert project-specific content here
        mainContent.innerHTML = `<h1>${selectedProject}</h1>`;
        // Optionally, you can fade in the content
        mainContent.style.opacity = 0;
        fadeIn(mainContent);
    }, 1000);

    }
    else{
      document.getElementById("projectSelector").style.display = "none";
    }

  })


}


inputs = 1;

// this method helps me to extract words from frontend
function wordGen() {
  var form = document.getElementById("contactForm");
  var elements = form.elements;
  var arr = [];
  var string = "";
  var i = 0;

  // You can now access form data using formData object
  for (var i = 0; i < inputs; i++) {
    arr.push(elements[i].value);
    string += elements[i].value + " "
  }

  generateWordRequest(arr);
  generateImageRequest(string);
}


async function generateWordRequest(array) {
  try {
    // console.log(array, "this is the array")
    const response = await fetch("http://127.0.0.1:3000/nltk/wordGen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        array,
      }),
    });

    if (!response.ok) {
      throw new Error("Words could not be generated");
    }

    const data = await response.json();

    const dataArray = JSON.parse(data.data);

    console.log(dataArray.length);

    // Number of buttons
    const numButtons = dataArray.length;
    
    for (let i = dataArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [dataArray[i], dataArray[j]] = [dataArray[j], dataArray[i]];
    }

    // Calculate the number of rows and columns
    const numCols = 6; // You can adjust this based on your preference
    const numRows = Math.ceil(numButtons / numCols);

    const container = document.getElementById("wordDisplay");

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Create a table element
    const table = document.createElement("table");

    // Create rows and cells with buttons
    for (let i = 0; i < numRows; i++) {
      const row = table.insertRow();

      for (let j = 0; j < numCols; j++) {
        const buttonNumber = i * numCols + j + 1;

        if (buttonNumber > numButtons) {
          // If we have created all buttons, break out of the loop
          break;
        }

        const cell = row.insertCell();
        const button = document.createElement("button");
        button.innerText = `${dataArray[buttonNumber]}`; // Button label
        button.addEventListener("click", () => {
          likedWords(array, dataArray[buttonNumber]);
        });
        cell.appendChild(button);
      }
    }



    // Append the table to the container
    container.appendChild(table);

    // document.querySelector('#words').textContent = result;
  } catch (error) {}
}

async function likedWords(array, word){
    
  var projectName = document.getElementById("projectName").textContent;
  var searchDomain = array;
  var likedWord = word;
  var row = [projectName, searchDomain, likedWord]
    
  try{
    const response = await fetch("http://127.0.0.1:3000/projectList/saveWords", {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          row
            
        })
    })
      
    if(!response.ok) {
        throw new Error("The data couldn't be saved")
    }

    const data = await response.json();
      
  }

  catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

// this adds more input spaces to have more words for the search domain
function addInput() {
  inputs += 1;
  var textarea = document.createElement("input");
  textarea.id = inputs.toString();
  textarea.type = "text";
  textarea.name = inputs.toString();
  var form = document.getElementById("contactForm");
  form.insertBefore(textarea, form.lastElementChild);
}


async function generateImageRequest(prompt) {
  try {
    const container = document.querySelector(".image-container")

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    for(let i = 0; i < 1; i++){
      // showSpinner();

    console.log(prompt)

      const response = await fetch("http://127.0.0.1:3000/openai/imageGen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!response.ok) {
        removeSpinner();
        throw new Error("That image could not be generated");
      }

      const data = await response.json();
      // console.log(data);

      const imageUrl = data.data;
      console.log(imageUrl)

      const image = document.createElement("img")
      image.src = imageUrl
      container.appendChild(image)
      image.addEventListener("click", function(event) {
        likedImages(prompt, imageUrl);
      });

      // removeSpinner(); 
    }

    
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function UI2(wordData, imagesData) {
  words = wordData[0]
  meanings = wordData[1]
  imageUrl = imagesData[2]
  caption = imagesData[3]

  const mainDiv = document.createElement("div")
  const wordDiv = document.createElement("div")
  const imgDiv = document.createElement("div")
  const wordCont = document.createElement("div")
  const imgCont = document.createElement("div")

  for (i = 0; i < wordData.length; i++){
    const word = document.createElement("p")
    word.id = "word"
    const meaning = document.createElement("p")
    meaning.id = "meaning"

    word.innerText = words[i]
    meaning.innerText = meanings[i]

    wordCont.appendChild(word)
    wordCont.appendChild(meaning)
    wordCont.onclick = function() {
      
      likedWords(word.innerText)
    };
    wordDiv.appendChild(wordCont)
  }

  for (i = 0; i < wordData.length; i++){

    const caption = document.createElement("p")
    caption.id = "caption"
    const img = document.createElement("img")

    img.src = data[i]
    caption.innerText = caption[i]

    imgCont.appendChild(img)
    imgCont.appendChild(caption)
    imgCont.onclick = function() {
      
      likedWords(img.src)
    };
    imgDiv.appendChild(imgCont)

  }
    
  mainDiv.appendChild(wordDiv)
  mainDiv.appendChild(imgDiv)
    

}

function UI3(wordData, imagesData){

  words = wordData[0]
  meanings = wordData[1]
  imageUrl = imagesData[2]
  caption = imagesData[3]
  const mainDiv = document.createElement("div")
  const wordDiv = document.createElement("div")
  const imgDiv = document.createElement("div")
  const wordCont = document.createElement("div")
  const imgCont = document.createElement("div")

  const wordSwiper = new Swiper(wordDiv, {
    slidesPerView: 1,
    spaceBetween: 3,
    // Add navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  });

// Initialize Swiper for images
  const imgSwiper = new Swiper(imgDiv, {
      slidesPerView: 1,
      spaceBetween: 10,
      // Add navigation arrows
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });

  


  for (i = 0; i < wordData.length; i++){
    const word = document.createElement("p")
    word.id = "word"
    wordCont.className = "swiper-slide";
    word.innerText = words[i]


    wordCont.appendChild(word)

    wordCont.onclick = function() {
      
      likedWords(word.innerText)
    };
    wordDiv.appendChild(wordCont)
  }

  for (i = 0; i < wordData.length; i++){

    const img = document.createElement("img")
    imgCont.className = "swiper-slide";
    img.src = data[i]

    imgCont.appendChild(img)

    imgCont.onclick = function() {
      
      likedWords(img.src)
    };
    imgDiv.appendChild(imgCont)

  }
    
  mainDiv.appendChild(wordDiv)
  mainDiv.appendChild(imgDiv)

}




async function likedImages(array, location){
  var projectName = document.getElementById("projectName").textContent;
  var searchDomain = array;
  var likedImage = location;
  var row = [projectName, searchDomain, likedImage]
    
  try{
    const response = await fetch("http://127.0.0.1:3000/projectList/saveImage", {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          row
            
        })
    })
      
    if(!response.ok) {
        throw new Error("The data couldn't be saved")
    }   
  }
  catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

