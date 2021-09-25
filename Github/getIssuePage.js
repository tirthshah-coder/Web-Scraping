const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getIssuePage(url, topic, repoName){
    request(url, cb);

    function cb(err, res, html){
        if(err){
            console.log("error");
        }else if(res.statusCode == 404){
            console.log("Page Not Found");
        }else{
            getIssues(html);
        }
    }

    function getIssues(html){
        let $ = cheerio.load(html);
        let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    
        let arr = [];
        for(let i = 0; i < issuesElemArr.length; i++){
            let link = $(issuesElemArr[i]).attr("href");
            arr.push(link);
        }
        
        let folderPath = path.join(__dirname, topic);
        dirCreater(folderPath);
        let filePath = path.join(folderPath, repoName + ".pdf");
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
    }
}

function dirCreater(folderpath) {
    if (fs.existsSync(folderpath) == false) {
        fs.mkdirSync(folderpath);
    }
}

module.exports = getIssuePage;