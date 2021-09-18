// Scraping is to perform operation to store our unorganized data into organize data
const request = require("request");
const cheerio = require("cheerio");
const chalk = require("chalk");

request("https://www.worldometers.info/coronavirus/", cb);

function cb(error, response, html){
    if(error){
        console.log('error: ', error);
    }else{
        handleHtml(html);  // Print html for given url
    }
}

function handleHtml(html){
    // selectorTool -> To find selector from getted response is very difficult that's why we use cheerio (It gives selectorTool)
    let selTool = cheerio.load(html);
    let contentArr = selTool("#maincounter-wrap span");
    console.log(contentArr.length);
    
    let total = selTool(contentArr[0]).text();
    let deaths = selTool(contentArr[1]).text();
    let recovered = selTool(contentArr[2]).text();

    console.log(chalk.gray("Total Cases: "+total));
    console.log(chalk.red("Deaths: "+ deaths));
    console.log(chalk.green("Recovered : "+recovered));
}