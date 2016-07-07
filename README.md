# CONtext
CONtext is een onderdeel van een onderzoek naar online identiteit. In CONtext wordt de lezer een verhaal voorgeschoteld dat langzaam de identiteit van de lezer overneemt. Zal de lezer zich hier in herkennen? Of is zijn online identiteit dusdanig anders van de realiteit dat hij of zij zichzelf er niet in terug vindt. Naast dat de identiteit van de lezer wordt gebruikt, zal de context van de lezer ook terug komen in het verhaal. Denk hierbij aan locatie, weer, tijd en dag van de week.

In CONtext is het voor de opdrachtgever mogelijk om nieuwe verhalen toe te voegen, de gebruikte data aan te passen, of oudere verhalen te wijzigen.

Bekijk CONtext live [url](http://37.139.3.52/), en voor de admin op  [admin](http://37.139.3.52/admin)
.
# Install
Om CONtext aan de gang te krijgen doe je het volgende
```
cd app
Meteor
```
De applicatie maakt gebruik van de volgende packages, die ook geinstalleerd moeten worden:
```
kadira:flow-router
kadira:blaze-layout
meteortoys:allthings
accounts-facebook
service-configuration
session
http
alanning:roles
mizzao:timesync
rubaxa:sortable
mirrorcell:geolocation-plus
```

CONtext werkt enkel met een Facebook account. Omdat de data die uit Facebook gehaald wordt gevoelig is, is het momenteel alleen mogelijk om CONtext te gebruiken als je aangemeld bent als testuser bij Facebook. Wil je toch graag een kijkje nemen? Stuur een mailtje naar roosschuurmans@gmail.com .



# Table of Contents
1. [De opdracht](#opdracht)
2. [Feature List](#efeature)
3. [Technieken](#Technieken)
    1. [Teksten opbouwen](##variables) 
4. [Databases](#databases)
5. [Project structure](#projectStructure)
6. [Vakken](#vakken)
7. [Herkansing](#herkansing)

# Opdracht
Voor een onderzoek naar het effect van context‐gevoelige data op gebruikers ga je een app maken voor een real‐time data‐driven verhaal. Dit verhaal wordt aan de hand van externe data in de omgeving van de gebruiker steeds aangepast.

1. De gebruiker leest het verhaal en merkt steeds meer dat hij/zij deel uitmaakt van het verhaal;
2. Het verhaal kan worden gelezen of worden voorgelezen;
3. Met push‐notificaties wordt de gebruiker opmerkzaam gemaakt op context‐gevoelige gebeurtenissen in het verhaal;
4. De opdrachtgever kan de data placeholders in een backend systeem aanpassen;

Het verhaal met de real‐time elementen wordt typografisch vormgegeven (i.s.m. de opdrachtgever).

# Feature List

De features zijn opgedeeld in must have, could have en nice to have. Helaas zijn niet alle features in het uiteindelijke prototype terecht gekomen.
### Must have
- De gebruiker kan de teksten lezen.
- De volgende data van de gebruiker wordt opgehaald: Leeftijd, locatie, naam, geboortedatum, familie, werk, studie, woonadres.
- De weather API wordt opgehaald.
- De opdrachtgever kan zelf verhalen schrijven
- De opdrachtgever kan data variabelen invoegen.
- De data van de gebruiker wordt omgezet in data variabelen
- Mocht de data niet beschikbaar zijn, wordt hier een fallback voor in de plaats gedaan.
- De data variabelen zijn real time verwerkt in de verhalen.

### Could have
- De opdrachtgever kan zelf de fallbacks aanpassen.
- De opdrachtgever kan een gebruikerstest opzetten.
- De vrouwelijke en mannelijke woorden (hij / haar) worden aangepast op basis van het geslacht van de gebruiker. 
- Tijdens een gebruikerstest worden de testpersonen geforceerd om bepaalde verhalen te lezen.
- De opdrachtgever kan reeds geschreven verhalen dupliceren.
- Persoonlijkere data van de gebruiker wordt opgehaald (slaapritme, sportritme, muziek).
- De data van de gebruiker wordt via Apply Magic Sauce omgezet naar persoonlijke eigenschappen.
- De UI is ontworpen zodat de opdrachtgever geen voorkennis van HTML oid hoeft te hebben.

### Nice to have
- De lezer kan swipen tussen verschillende verhalen
- De opdrachtgever kan de geschreven tekst lezen vanuit de data van elke gebruiker
- De opdrachtgever kan de geschreven tekst downloaden naar een pdf
- De opdrachtgever kan subkoppen, serif, en bold toevoegen aan de tekst.

# Technieken
CONtext bestaat eigenlijk uit 3 voornamelijke onderdelen. Het schrijven van een tekst, het lezen van een tekst, en het uitvoeren van een testsessie.
## Schrijven van een RT Story
Voor het schrijven van de tekst heb ik een versimpelde WYSIWYG editor gebouwd. Hier kun je statische teksten als paragraven en tussenkoppen schrijven, maar ook de data-variabelen toevoegen.

Elke RT Story is een onderdeel van de `Stories` collection. De content is vervolgens opgebouwd uit een array of objects die er als volgend uit zien.
```
  "content": [
    {
      "source": "admin",
      "category": "par",
      "subcategory": null,
      "content": "Het was weer een spannende dag op zweinstein. Harry had weer veel geleerd.",
      "_id": {
        "_str": "1757223594be20f4415d832a"
      },
      "order": 1
    }
  ]
```
* `source` geeft aan waar de content vandaan komt.
* `category` geeft in dit geval aan dat het een paragraaf is. Dit had ook een heading of een andere variabele kunnen zijn.
* `subcategory` geeft weer meer informatie over de oorsprong van het object.
* `content` is de daadwerkelijke zin
* `order` is de plek van het contentblok t.o.v het document.

Voor een data variabele, bijvoorbeeld die waarin de naam van een familielid wordt aangeroepen ziet er vergelijkbaar uit.
```
"content": [
{
      "source": "facebook",
      "category": "family",
      "subcategory": "brother",
      "content": null,
      "_id": {
        "_str": "31bf20d7e75c1fd147fb08ad"
      },
      "format": null,
      "order": 3
    }
]
```
De `source` is in dit geval Facebook, hier komt de data vandaan. `Category` en `subcategory` geven weer meer informatie over de data variabelen, content en format zijn leeg, die zijn niet nodig voor dit type data variabele.

Met spacebars wordt vervolgens uitgemaakt wat er met de data variabelen gedaan wordt. Maar daar over meer in
## Lezen van een RT Story
Het uitlezen van de tekst gaat in 2 stappen. Voor elk stukje content wordt er in spacebars gecontroleerd om wat voor type content het gaat. Zo bespaar je de nodige APIcalls als het enkel om een statische tekst gaat.
```
{{#each chaptercontent}}
                    {{#if istext}}
                        {{#if isHeading}}
                            <h4 id='{{_id._str}}' class='static'>{{content}} 
                            </h4>
                        {{else}} <!-- else isheading -->
                            <span id='{{_id._str}}' class='static' >{{content}}
                            </span>
                        {{/if}} <!-- end isheading -->
                    {{else}} <!-- else istext -->
                        {{#if isBreak}}
                            <br id='{{_id._str}}'/>
                        {{/if}} <!-- end isbreak -->
                            {{#if getVar}}
                                <span id='{{_id._str}}'>{{getVar this}}</span>
                            {{/if}} <!-- end getVar -->
                    {{/if}} <!-- end istext -->
                {{/each}}
```
Er wordt op deze manier ook meteen gekeken welke HTML elementen het beste passen bij de verschillende typen content.

Als we er dan daadwerkelijk achter komen dat we met een datavariabele te maken hebben wordt het wat spannender.

Per type `source` is er een functie opgebouwd. Zo heb je Facebook, time, location en weather. 
### Facebook
Bij het inloggen wordt de data van de gebruiker opgeslagen in een collection. In deze data wordt er gezocht naar de gewenste resultaten. Deze data is dus niet RT, maar het voordeel is, dat er ook maar 1 request per sessie wordt gedaan.
Helaas is de data van Facebook niet altijd even logisch opgebouwd, en zul je voor elke type data een aparte zoektocht moeten doen.
```
var likes = {
                        'music' : function () {
                            return datablock[obj.subcategory].data[0].name
                        },
                        'religion' :  function () {
                            return datablock[obj.subcategory];
                        },
                        'political' : function () {
                            return datablock[obj.subcategory];
                        },
                        'favorite_athletes' : function () {
                            return datablock[obj.subcategory][0].name
                        },
                        'favorite_teams' : function() {
                            return datablock[obj.subcategory][0].name
                        }
                    }
```
## Fallbacks
Mocht de gebruiker bepaalde data niet op Facebook hebben staan, komt er een fallback aan te pas. Deze fallbacks zijn door de admin allemaal te wijzigen. 

### Uitvoeren van testsessies
Een testsessie is een moment waarop een bepaalde testgebruiker geforceerd wordt om bepaalde RT Stories te lezen. Dit wordt gebruikt tijdens de tests voor het onderzoek, en is dus een belangrijk onderdeel.

In de adminsuite kan de admin aangeven welke gebruikers aan een test mee mogen doen, welke verhalen ze gaan lezen, en in welke volgorde.
Per gebruiker kan een test ingestart worden. Hier komt het mooie van Meteor, dat RT is, aan de oppervlakte.

In het leesgedeelte van de applicatie zit een trackerfunctie, die constant controleert of de gebruiker in een actieve testsessie zit. 
```
var watcher = function () {
    console.log('start tracker');
    Tracker.autorun(function () {
        if(Meteor.user().profile.testActive) {
            var testusers = Tests.find().fetch()[0].testusers;
            var order;
            for(var i in testusers) {
                if(testusers[i].userid === Meteor.userId()) {
                    order = testusers[i].order;
                }
            }
            FlowRouter.go('/tests/' + order[Meteor.user().profile.currentStory].id)
        }
    })
}
```
Zo wordt de gebruiker geforceert de test te lezen.
Daarnaast kan de admin ook zien welke tekst er nu gelezen wordt, wat handig kan zijn tijdens het uitvoeren van de testsessies.
## Collections / databases
### Chapters
Hierin staat ieder verhaal dat geschreven is. De content van het verhaald wordt ook hier opgeslagen. Onder content verstaat men de subkoppen, tekst, breaks, etc , maar ook de data variabelen.
Daarnaast zijn hier ook wat constante waarden opgeslagen, bijvoorbeeld of dat de tekst een duplicaat is, of gedupliceerd is, en of het geslacht van de gebruiker in de tekst verwerkt moet worden.

### Tests
Bevat maar 1 document, hierin staat beschreven wie er aan de test meedoen, welke verhalen ze gaan lezen, of deze test actief is, welke verhalen er nu gelezen worden, en in welke volgorde deze gelezen kunnen worden.

### Userdata
Bij het inloggen met Facebook wordt de data hier opgeslagen, zodat deze later eventueel voor Apply Magic Sauce oid gebruikt kunnen worden
### Fallbacks
Bevat de fallback voor elke data variabelen die gebruikt kan worden.

# Project Structure
Tijdens de herkansing heb ik het CONtext eens flink op de schop gegooid. Na 5 werken werk was de hele structuur helaas helemaal weg.
Dit is de nieuwe file structure:
```
app
+-- Client      //wordt op de client uitgevoerd
|   +-- layouts     //enkel de basis-layout
|   +-- lib         // bevat de router en template helpers
|   +-- stylesheets // de globale en algemene stylesheets zitten hier
+-- imports
|   +-- pagina  // bevat per onderdeel van CONtext een map, met daarin ook een stylesheet.
|   +-- pagina
+-- lib
|   +-- Methods //onderverdeeld in api.js, delete.js, insert.js en update.js
|   +-- Collections.js // alle Meteor collections 
+-- public // icons, afbeeldingen, etc
+-- server // alle server functionaliteiten.Facebooklogin. publications, etc.
```

Het grote verschil met de vorige structuur is de lib-folder die uit imports is gehaald. Ik vond het niet netjes dat dit tussen allemaal templates stond.
Daarnaast heb ik de methods ook onderverdeeld per type, zodat er meer logica in de structuur van de methods zou zitten.

# Vakken van de minor
### browser technologies
- semantische html
- alle afbeeldingen hebben, mocht dit nodig zijn , een alt text
### Real Time Web
- Meteor
### CSS to the rescue
- prefixes voor de browsers
- ampersands en andere technieken uit het boek CSS secrets
- complexere selectors
- flexbox
- animaties en transities

### Web App from Scratch
- Javascript transities, 
- Geen Jquery! (afgezien van wat Meteor zelf doet)
- API requests
### Performance matters
- minified CSS

# Herkansing
Helaas pindakaas, maar wel geheel volgens verwachting, heb ik dit project moeten herkansen. Ondanks het feit dat ik trots ben op hoe het geworden is, ben ik het volledig eens met de feedback die ik gekregen heb. In 5 weken developen is het me goed gelukt om van de organisatie een mooi zooitje te maken, dus deze herkansing is tevens ook een goed moment om dit eens op te schonen.
Zie de [issues](https://github.com/roosness/CONtext/issues) voor iets meer details
## Feedback:
* Meer uitleg in admin

Bij elke pagina van de Adminsuite heb ik een uitleg gegeven over wat er hier kan gebeuren, en hoe je dit moet bereiken. Ook heb ik meer userfeedback gegeven bij het schrijven van de teksten. Het verplaatsen van onderdelen in de content van de RT stories werd ook als omslachtig gezien. Hier heb ik een drag 'n drop systeem van gemaakt, wat een stuk soepeler en sneller werkt.
* De applicatie heeft geen title
* code review mist in de readme
* html mag semantischer
* lijkt niet helemaal af
* leestekst is te klein
* CSS selectoren zijn te specifiek

### Vragen?

Heb je nog een vraag over dit project? Stuur dan een mailtje naar roosschuurmans@gmail.com


