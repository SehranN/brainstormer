const urlParams = new URLSearchParams(window.location.search);
const parameter = urlParams.get('parameter');

getWords()

async function getWords(){
    try{
        var url = "http://127.0.0.1:3000/projectList/getWords/" + parameter
        const response = await fetch(url, {
            method: "GET"
        })

        const data = await response.json();
        createTable(data)
        document.getElementById("projectName").textContent = parameter
        
    }
    catch{

    }
}

function createTable(jsonData) {
    const likedWordsDiv = document.getElementById('likedWords');

        const likedWordsByDomain = {};

        // Group liked words by search domain
        jsonData.forEach(item => {
            const domain = item.searchDomain.trim();
            if (!likedWordsByDomain[domain]) {
                likedWordsByDomain[domain] = [];
            }
            likedWordsByDomain[domain].push(item.likedWords);
        });

        // Create tables for each search domain
        for (const domain in likedWordsByDomain) {
            if (likedWordsByDomain.hasOwnProperty(domain)) {
                const table = document.createElement('table');
                const caption = document.createElement('caption');
                const button = document.createElement('Rearranger');
                caption.textContent = `Search Domain: ${domain}`;
                table.appendChild(caption);

                const headerRow = table.insertRow();
                const headerCell = document.createElement('th');
                headerCell.textContent = 'Liked Words';
                headerRow.appendChild(headerCell);

                likedWordsByDomain[domain].forEach(words => {
                    const row = table.insertRow();
                    const cell = row.insertCell();
                    cell.textContent = words;
                });

                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    param = parameter + "," + `${domain}`
                    navigateToSecondPage(event, param);
                });

                likedWordsDiv.appendChild(table);
                likedWordsDiv.appendChild(button)
            }
        }
}

function navigateToSecondPage(event,parameter) {
    
    const url = new URL('public/rearranger.html', window.location.origin);
    url.searchParams.append('parameter', parameter);
    window.location.href = url;

}

