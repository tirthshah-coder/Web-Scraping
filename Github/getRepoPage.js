const request = require("request");
const cheerio = require("cheerio");
const getIssuePage = require("./getIssuePage");

function getRepoPage(url, topic){
    request(url, cb);
    function cb(err, res, html){
        if(err){
            console.log("error");
        }else if(res.statusCode == 404){
            console.log("Page Not Found");
        }else{
            getRepoLinks(html);
        }
    }

    function getRepoLinks(html){
        let $ = cheerio.load(html);
        let headingsArr = $(".f3.color-text-secondary.text-normal.lh-condensed");
        console.log(topic);

        // Get top 5 repo
        for(let i = 0; i < 5; i++){
            let anchors = $(headingsArr[i]).find("a");
            let link = $(anchors[1]).attr("href");
            let repoName = link.split("/").pop();
            let fullLink = `https://github.com${link}/issues`;
            getIssuePage(fullLink, topic, repoName);
        }
    }
}

module.exports = getRepoPage;