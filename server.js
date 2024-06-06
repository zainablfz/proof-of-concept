
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
const apiUrl = "https://potion-api-jet.vercel.app/",
      potionsUrl = `${apiUrl}potions`,
      ingredientsUrl = `${apiUrl}ingredients`;

// Routes aanmaken
app.get('/', (request, response) => {
  Promise.all([
    fetchJson(`${potionsUrl}`),
    fetchJson(`${ingredientsUrl}`)
  ]).then(([potions, ingredients]) => {

  response.render('index', {potions, ingredients });
  })
})

app.get('/brew', (request, response) => {
  Promise.all([
    fetchJson(`${potionsUrl}`),
    fetchJson(`${ingredientsUrl}`)
  ]).then(([potions, ingredients]) => {

  response.render('brew', {potions, ingredients });
  })
})

app.get('/potions', (request, response) => {
  Promise.all([
    fetchJson(`${potionsUrl}`),
    fetchJson(`${ingredientsUrl}`)
  ]).then(([potions, ingredients]) => {

  response.render('potions', {potions, ingredients });
  })
})

app.get('/potion/:id', (request, response) =>{
  fetchJson(`${potionsUrl}/${request.params.id}`).then((potion) =>{
    response.render('potion', {potion});
  })
})

app.get('/nasty-potion', (request, response) =>{
  response.render('nasty-potion')
})

app.post('/brew', (request, response) => {
  fetchJson(`${potionsUrl}`).then((potions) => {
    let ingredients = request.body.ingredients;
    let matchFound = false;
    let matchedPotionId = null;

    if (!Array.isArray(ingredients)) {
      return response.status(400).send('You need 2 or more ingredients to brew a potion.');
    }

    ingredients = ingredients.map(Number);

    function sortArray(arr) {
      return arr.map(Number).sort((a, b) => a - b); 
    }

    for (let i = 0; i < potions.length; i++){
      const sortPotionIngredients = sortArray(potions[i].ingredients);
      if (JSON.stringify(ingredients) === JSON.stringify(sortPotionIngredients)){
        matchFound = true;
        matchedPotionId = potions[i].id;
      } 
    }
    
    if (matchFound) {
      response.redirect(301, `/potion/${matchedPotionId}`)
    } else {
      response.redirect(301, '/nasty-potion')
    }
  })
})


// Een port aanroepen om alles op te hosten
app.set('port', process.env.PORT || 8010)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
