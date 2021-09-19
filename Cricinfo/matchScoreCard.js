const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx"); 

function processScoreCard(url){
    request(url, function(err, response, html){
        if(err){
            console.log(err);
        }else{
            extractMatchDetails(html);
        }
    })
}

function extractMatchDetails(html){
    let $ = cheerio.load(html);
    let descEle = $(".header-info .description");
    let stringArr = descEle.text().split(",");
    let venue = stringArr[1].trim();
    let date = stringArr[2].trim();
    let result = $(".event .status-text");
    result = result.text(); 

    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
    for(let i = 0; i < innings.length; i++){
        let teamName = $(innings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        let opponentIndex = i == 0 ? 1 : 0;
        let opponentTeamName = $(innings[opponentIndex]).find("h5").text();
        opponentTeamName = opponentTeamName.split("INNINGS")[0].trim();

        let currInning = $(innings[i]);
        console.log(`${venue}| ${date}| ${teamName}| ${opponentTeamName}| ${result}`);

        let allRows = currInning.find(".table.batsman tbody tr");
        for(let j = 0; j < allRows.length; j++){
            let allCols = $(allRows[j]).find("td");
            let isWorthy = $(allCols[0]).hasClass("batsman-cell");
            if (isWorthy == true) {
                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let sr = $(allCols[7]).text().trim();
                console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);

                processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentTeamName, venue, date, result);
            }
        }
    }
}

function processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentTeamName, venue, date, result){
    let teamPath = path.join(__dirname, "ipl", teamName);
    createDir(teamPath);

    let filePath = path.join(teamPath, playerName + ".xlsx");
    let content = excelReader(filePath, playerName);
    let playerObj = {
        teamName,
        playerName,
        runs,
        balls,
        fours,
        sixes,
        sr,
        opponentTeamName,
        venue,
        date,
        result
    }

    content.push(playerObj);
    excelWriter(filePath, content, playerName);
}

function createDir(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
    }
}

function excelReader(filePath, sheetName){
    if (fs.existsSync(filePath) == false) {
        return [];
    }

    let wb = xlsx.readFile(filePath);
    let excelData = wb.Sheets[sheetName];
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
}

function excelWriter(filePath, json, sheetName){
    let newWB = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    xlsx.writeFile(newWB, filePath);
}

module.exports = {
    ps: processScoreCard
}