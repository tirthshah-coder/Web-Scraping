// Last ball commentary
const request = require("request");
const cheerio = require("cheerio");

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";

request(url, cb);

function cb(err, response, html){
    if(err){
        console.log(err);
    }else{
        extractHtml(html);
    }
}

function extractHtml(html){
    let $ = cheerio.load(html);
    let elemArr = $(".match-comment-wrapper .match-comment-long-text");
    let text = $(elemArr[0]).text();
    let htmlEle = $(elemArr[0]).html();
    console.log("text: ", text);
    console.log("html: ", htmlEle);
}