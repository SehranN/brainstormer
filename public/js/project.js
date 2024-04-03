// functions for the project page
generateProjectData();


function generateProjectDiv(projectData) {
    const ideaCont = document.getElementById("ideaCont");
    
    console.log(projectData.length)
    for (let i = 0; i < projectData.length; i++){

        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");

        const projectName = document.createElement("h2");
        projectName.textContent = `Name: ${projectData[i].projectName}`;

        // const searchWords = document.createElement("p");
        // searchWords.textContent = `Search Domain: ${searchDomain.join(", ")}`;


        const projectLink = document.createElement("a"); // Create an anchor element
        projectLink.href = "#"; // Set the URL for the page to navigate to
        projectLink.classList.add("project-link");
        projectLink.addEventListener('click', function(event) {
            event.preventDefault();
            navigateToSecondPage(event, `${projectData[i].projectName}`);
        });

        const projectDate = document.createElement("p");
        projectDate.textContent = `Date: ${projectData[i].date}`;

        // Append the elements to the projectDiv
        projectDiv.appendChild(projectName);
        // projectDiv.appendChild(document.createElement("br"));
        // projectDiv.appendChild(searchWords);
        projectDiv.appendChild(document.createElement("br"));
        projectDiv.appendChild(projectDate);
        projectLink.appendChild(projectDiv); // Append the anchor element to the projectDiv
        ideaCont.appendChild(
            projectLink
        );
    }

}

async function generateProjectData(){
    try{
        const response = await fetch("http://127.0.0.1:3000/projectList/getProject", {
            method: "GET"
        })

        const data = await response.json();
        console.log(data);

        generateProjectDiv(data);
    }
    catch{

    }
}

function navigateToSecondPage(event,parameter) {
    
    const url = new URL('public/ideas.html', window.location.origin);
    url.searchParams.append('parameter', parameter);
    window.location.href = url;

}



function addProject(){
    var pageUrl = 'addProject.html';

    // Open the page in a new tab or window
    window.open(pageUrl, '_blank');
}
