// get birthday of all batsman who played match

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");

request(url, cb);

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractHTML(html);
    }
}

function extractHTML(html) {
    let $ = cheerio.load(html);
    let innigsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
    for (let i = 0; i < innigsArr.length; i++) {
        let teamNameElem = $(innigsArr[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0].trim();
       
        let tableEle = $(innigsArr[i]).find(".table.batsman");
        let allBatsman = $(tableEle).find("tr");
        for(let j = 0; j < allBatsman.length; j++){
            let allColsOfPlayer = $(allBatsman[j]).find("td");
            let isBatsmanCol = $(allColsOfPlayer[0]).hasClass("batsman-cell");
            if(isBatsmanCol){
                let playerName = $(allColsOfPlayer[0]).text();
                let href = $(allColsOfPlayer[0]).find("a").attr("href");  // getted a href
                let fullLink = "https://www.espncricinfo.com" + href;   
                getBirthdayPage(fullLink, playerName, teamName);
            }
        }
    }
}

function getBirthdayPage(url, playerName, teamName){
    request(url, cb);
    function cb(err, response, html){
        if(err){
            console.log(err);
        }else{
            extractBirthday(html, playerName, teamName);
        }
    }
}

function extractBirthday(html, playerName, teamName){
    let $ = cheerio.load(html);
    let detailsArr = $(".player-card-description");
    let birthday = $(detailsArr[1]).text();
    console.log(`${playerName} plays for ${teamName} was born on ${birthday}`);
}