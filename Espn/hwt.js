// highest wicket taker -> Of Winning team
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
    // Full Page Search
    let teamsArr = $(".match-info.match-info-MATCH .team");
    let winningTeamName;
    for(let i = 0; i < teamsArr.length; i++){
        let hasClass = $(teamsArr[i]).hasClass("team-gray");
        if(hasClass == false){
            // we get winner team -> find is used for finding only subset of given element
            let teamName = $(teamsArr[i]).find(".name");
            winningTeamName = teamName.text().trim();
        }
    }
    // console.log(winningTeamName);

    let inningsArr = $(".card.content-block.match-scorecard-table .Collapsible");
    for(let i = 0; i < inningsArr.length; i++){
        let teamNameEle = $(inningsArr[i]).find(".header-title.label");
        let teamName = teamNameEle.text();
        teamName = teamName.split("INNINGS")[0].trim();  // kxip and csk
        
        let hwtName = "";
        let hwt = 0;
        
        // Bcoz we want highest wicketer name of winning team (kxip bat then csk ball table given) that's why != winningTeam means we are looking for csk(winner) bolwer name
        if(winningTeamName !== teamName){
            let tableEle = $(inningsArr[i]).find(".table.bowler");
            let allBowlers = $(tableEle).find("tr");
            for(let j = 0; j < allBowlers.length; j++){
                let allColsofPlayer = $(allBowlers[j]).find("td");
                let playerName = $(allColsofPlayer[0]).text();
                let wickets = $(allColsofPlayer[4]).text();
                if(wickets > hwt){
                    hwtName = playerName;
                    hwt = wickets;
                }
            }

            console.log(`Winning Team ${winningTeamName}, highest wicket Taker playerName: ${hwtName}, wickets: ${hwt}`);
        }
    }
}