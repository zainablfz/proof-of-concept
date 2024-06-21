> _Fork_ deze leertaak en ga aan de slag. Onderstaande outline ga je gedurende deze taak in jouw eigen GitHub omgeving uitwerken. De instructie vind je in: [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md)

# Merlin's Book of Potions 🧙🏼‍♂️
<!-- Geef je project een titel en schrijf in één zin wat het is -->
Voor de opdrachtgever Merlin.studios heb ik een webgame mogen maken. Hierbij is de bedoeling de gebruiker potions kan brewen.



<img width="588" alt="Scherm­afbeelding 2024-06-21 om 02 21 27" src="https://github.com/zainablfz/proof-of-concept/assets/144009548/f478edba-0138-4a0d-955d-0b40f5bd68b1">


* Livelink: https://proof-of-concept-37tl.onrender.com/


## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->

`User story: Als speler van Merlin's Book of Potions wil ik verschillende magische drankjes kunnen maken door ingrediënten in de ketel te stoppen en te brouwen.`
Wanneer je klaar bent om een potion te brewen, kan je ingrediënten kiezen door hierop te klikken of te slepen om toe te voegen in de cauldron. 

De website bestaat uit de homepagina, brew pagina, en de (nasty) potion pagina. 

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->

Voor deze website is onder andere gebruik gemaakt van Node, Express en EJS en gebruikt de data van de API van Merlin. In de CSS heb ik gebruik gemaakt van custom properties.

Ik heb gewerkt volgens Progressive Enhancement, dit houdt in dat je werkt in vier lagen om de website functioneel en vertrouwelijk te maken. De drie verschillende lagen houden als volgt in:

De eerste laag is de core functionality en dat begint bij de HTML. Dit zorgt ervoor dat de (main) content te lezen is op de website en het acceptabel is per browser/device, oftewel dat de website functioneel is en vertrouwelijk. De volgende laag is de CSS zodat de website usable is, waarbij de basic CSS is geïmplementeerd De derde en vierde laag zijn de enhancement lagen, waarbij er extra CSS en/of JS erbij komt, die de website pleasurable maakt.

## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->
* Clone deze repository.
* Open de repository in je code-editor
* Open de terminal en typ 'npm install'
* Door gebruik te maken van 'npm start', krijg je een lokale link waar je de code live kunt bekijken
* Om je project online te zetten, kun je gebruik maken van 'Render'

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
