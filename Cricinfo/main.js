const request = require("request");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const allMatch = require("./allMatch");

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

// Make folder
const iplPath = path.join(__dirname, "ipl");
createDir(iplPath);

request(url, function(err, response, html){
    if(err){
        console.log(err);
    }else{
        extractLink(html);
    }
})

function extractLink(html){
    let $ = cheerio.load(html);
    let anchorEle = $("a[data-hover='View All Results']");
    let link = anchorEle.attr("href");
    let fullLink = "https://www.espncricinfo.com" + link;
    allMatch.getAllmatches(fullLink);    
}

function createDir(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
    }
}