# CricInfo Scraping
The main agenda of this activity is to scrap the whole ipl team matches(2020) data and store into the excel sheet.

Scraping is done with the help of cheerio library.

To run the program -> node main.js

It will create the following type of folder structure:

ipl
----Team Name
-------PlayerName.xlsx (excel sheet)

Under the excel sheet there is detail of playerName that we got while scraping like:
1. teamName
2. playerName
3. balls
4. fours
5. sixes
6. sr
7. opponent teamName
8. venue
9. date
10. result
