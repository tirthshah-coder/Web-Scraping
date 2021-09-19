const request = require("request");
const cheerio = require("cheerio");
const scoreCardObj = require("./matchScoreCard");

function getAllMatchesLink(url) {
    request(url, function (err, response, html) {
        if (err) {
            console.log(err);
        }
        else {
            extractAllLinks(html);
        }
    })
}

function extractAllLinks(html) {
    let $ = cheerio.load(html);
    let scorecardElems = $(".match-info-link-FIXTURES");
    for (let i = 0; i < scorecardElems.length; i++) {
        let link = $(scorecardElems[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + link;
        // console.log(fullLink);
        scoreCardObj.ps(fullLink);
    }
}
module.exports = {
    getAllmatches: getAllMatchesLink
}