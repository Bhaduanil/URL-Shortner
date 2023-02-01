const express = require('express')
const connectdb=require('./connect')
const ShortUrl = require('./models/shortUrls')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
 
})

app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })
  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()
  res.redirect(shortUrl.full)
})



app.post('/deleteitem/:id',async (req,res)=>{
    console.log("Item deleted...")
    await ShortUrl.deleteOne({short:req.params.id})
    res.redirect('/')
})
connectdb();
app.listen(process.env.PORT || 5000);