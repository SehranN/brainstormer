const urlParams = new URLSearchParams(window.location.search);
const parameter = urlParams.get('parameter');

getWords()

async function getWords(){
    try{
        var url = "http://127.0.0.1:3000/projectList/getWordsByDomain/" + parameter
        const response = await fetch(url, {
            method: "GET"
        })

        const data = await response.json();
        sentences = []
        for (i = 0; i < 10; i++){
            const response1 = await fetch("http://127.0.0.1:3000/wordGen/rearranger", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
                },
                body: data,
                
            });

            const data1 = await response1.json();
            senetnces.append(data1)

        }
        createTable(sentences)
        parameter = parameter.split(",")
        document.getElementById("searchDomain").textContent = parameter[1]
        
    }
    catch{

    }
}

function createTable(sentences){
    const rearranger = document.getElementById('rearrangersCont');
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    // Iterate through sentences and create rows
    sentences.forEach(function(sentence) {
        var row = document.createElement('tr');
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(sentence));
        row.appendChild(cell);
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    rearranger.appendChild(table)
}