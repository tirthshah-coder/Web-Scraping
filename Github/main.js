const request = require("request");
const cheerio = require("cheerio");
const getRepoPage = require("./getRepoPage");

let url = "https://github.com/topics";

request(url, cb);

function cb(err, res, html){
    if(err){
        console.log("error");
    }else if(res.statusCode == 404){
        console.log("Page Not Found");
    }else{
        getTopicLinks(html);
    }
}

function getTopicLinks(html){
    let $  = cheerio.load(html);
    let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i = 0; i < linkElemArr.length; i++){
        let href = $(linkElemArr[i]).attr("href");
        let topic = href.split("/").pop();
        let fullLink = "https://github.com" + href;
        getRepoPage(fullLink, topic);
    }
}