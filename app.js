//Include express from node_modules
const express = require('express')
const app = express()

//Define server related variables
const port = 3000

//Include express-handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//require restaurant.json
const restaurant_list = require('./restaurant.json')

//Setting static files
app.use(express.static('public'))

//Setting routes
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurant_list.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurant_list.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurant_list.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword))
  res.render('index', { restaurants: restaurants, keyword: keyword })
})
//Start and listen on the server
app.listen(port, () => console.log('The server is working now!'))
