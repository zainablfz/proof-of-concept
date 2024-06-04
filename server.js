
// Importeren
import express from "express"
import fetchJson from './helpers/fetch-json.js'
const app = express()

// Mappen instellen
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


// Variabelen definiëren
const apiUrl = `"https://potion-api-jet.vercel.app/"`;
const potionsUrl = `${apiUrl}potions`;
const ingredientsUrl = `${apiUrl}ingredients`;


// Het maken van routes
app.get('/', (request, response) => {
  Promise.all([
    fetchJson(`${potionsUrl}`),
    fetchJson(`${ingredientsUrl}`)
  ]).then(([potions, ingredients]) => {

  response.render('index', {potions, ingredients });
  })
})


// Een port aanroepen om alles op te hosten
app.set('port', process.env.PORT || 8010)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
