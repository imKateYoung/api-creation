const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')

const PORT = 8000 || PORT.env
const app = express()


const wineNews = [
    {
        name: "winespectator",
        address:"https://www.winespectator.com/wine-and-culture",
        base: "https://www.winespectator.com/wine-and-culture"
}
]

const articles = []

 
wineNews.forEach(news => {
    axios.get(news.address)
    .then(response =>{
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("wine")',html).each(function () {
            const title = $(this).text()
            const url =  $(this).attr('href')

            articles.push({
                title,
                url: news.base + url,
                source: news.name
            })
        })
    })
})



app.get('/', (req,res)=>{
    res.json("Welcome to my api")
    
})

app.get('/wine',(req,res) =>{
    res.json(articles)
})




app.listen(PORT, () => console.log(`Listening to port:${PORT}`))