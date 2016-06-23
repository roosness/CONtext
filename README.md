# CONtext

CONtext is een onderdeel van een onderzoek naar online identiteit.
In CONtext wordt de lezer een verhaal voorgeschoteld dat langzaam de identiteit van de lezer overneemt. Zal de lezer zich hier in herkennen? Of is zijn online identiteit dusdanig anders van de realiteit dat hij of zij zichzelf er niet in terug vindt. Naast dat de identiteit van de lezer wordt gebruikt, zal de context van de lezer ook terug komen in het verhaal. Denk hierbij aan locatie, weer, tijd en dag van de week. 

In CONtext is het voor de opdrachtgever mogelijk om nieuwe verhalen toe te voegen, de gebruikte data aan te passen, of oudere verhalen te wijzigen.

Bekijk CONtext [live url](http://37.139.3.52), en voor de admin op 
[admin](http://37.139.3.52/admin)

## De opdracht
Voor een onderzoek naar het effect van context‐gevoelige data op gebruikers ga je een app maken voor een real‐time data‐driven verhaal. Dit verhaal wordt aan de hand van externe data in de omgeving van de gebruiker steeds aangepast.

1. De gebruiker leest het verhaal en merkt steeds meer dat hij/zij deel uitmaakt van het verhaal;

2. Het verhaal kan worden gelezen of worden voorgelezen;

3. Met push‐notificaties wordt de gebruiker opmerkzaam gemaakt op context‐gevoelige gebeurtenissen in het verhaal;

4. De opdrachtgever kan de data placeholders in een backend systeem aanpassen;

5. Het verhaal met de real‐time elementen wordt typografisch vormgegeven (i.s.m. de opdrachtgever).

## Feature list
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

## Technieken
* meteor met daarin de volgende packages toegevoegd
  * kadira:flow-router
  * kadira:blaze-layout
  * http
  * session
  * mizzao:timesync
  * zimme:active-route
  * accounts-facebook
  * service-configuration
  * alanning:roles
* spacebars
* (s)css
* Prepros

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

### Feature List
De feature list is opgedeeld in verschillende fases. Dit zijn de fases waarin ik prototypes ga opleveren, die deze features dan bevatten

## Installeer de app
Download de app naar je pc, en in de terminal
```
cd app
meteor 
```

## Planning
Aan het begin van het project heb ik de planning in 3 fase opgedeeld, die ieder zo’n anderhalve week in beslag zouden nemen. Nu merk ik wel, dat het goed is om een planning te hebben, maar dat de laatste week toch altijd een beetje anders loopt.
Dit zijn de 3 fases:

### Fase 1
- De gebruiker kan de tekst lezen
- De gebruiker kan zich registreren
- de eerste data variabelen zijn toegevoegd (het weer, de tijd, welke dag van de week, de locatie)
- de variabelen worden omgezet in ‘echte’ tekst, en geen harde data
- de variabelen zijn real time verwerkt in de verhalen
- de beheerder kan verhalen invoeren
- de beheerder kan variabelen toevoegen

### Fase 2
- de database met variabelen wordt automatisch gevuld, mocht deze leeg zijn.
- de beheerder kan de volgorde waarop de gebruiker de verhalen te zien krijgt wijzigen
- de beheerder kan verhalen wijzigen
- de UI van de tekst is geoptimaliseerd voor leesbaarheid
- de data van de gebruiker(naam, geslacht, geboortedata, adres) opgehaald
- de data van de social media van de gebruiker worden opgehaald (sport en slaap apps etc)
- de nieuwe data kan verwerkt worden in de verhalen
- de beheerder kan verschillende versies van een verhaal aanmaken, waarbij de hoeveelheid opgehaalde data per versie intenser is.

### Fase 3
- de lezer kan swipen tussen verschillende verhalen
- de data van de persoonlijkheidstest wordt verwerkt in de verhalen
- downloadlink om de verhalen met default waardes als pdf te downloaden

## Vakken van de minor
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


### Vragen?

Heb je nog een vraag over dit project? Stuur dan een mailtje naar roosschuurmans@gmail.com

