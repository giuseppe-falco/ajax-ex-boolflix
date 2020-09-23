// repo: ajax-ex-boolflix
// Iscriviamoci al sito https://www.themoviedb.org. E’ completamente gratuito. 
// Richiediamo la nostra API_KEY che verrà utilizzata in tutte le nostre chiamate. Servirà all’API a capire chi sta effettuando la chiamata.
// Qua https://developers.themoviedb.org/3 troveremo tutte le chiamate possibili all’API. Possiamo giocarci in un secondo momento, ma come prima cosa concentriamoci su Search / Movies.
// Milestone 1
    // Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
    // Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato: 
    // Titolo
    // Titolo Originale
    // Lingua
    // Voto
//Milestone 2:
    // Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
    // Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
    // Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
    // Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
    // Qui un esempio di chiamata per le serie tv:
    // https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs

$(document).ready(function() {
    //parte ricerca e stampa in pagina al click sulll botton cerca
    $("#search-button").click(function(){
        searchFilm($("#search-input").val());
    }   );
    //parte ricerca e stampa in pagina al tasto invio sul campo input
    $("#search-input").keyup(function(e) {
        if (e.which == 13 && $("#search-input").val() != "") {
        searchFilm($("#search-input").val());
        }
    });

    //////////////////////////temporaneo////////////////
    searchFilm("ritorno al passato")

    //////////////////////////temporaneo////////////////

    
})











//******************************************funczioni*************************************+ */
    //funzione ricerca film
    function searchFilm(input) {
        clear()
    
        if(input != " " && input != "  ") {
            $.ajax(
                {
                    url: "https://api.themoviedb.org/3/search/movie",
                    method: "GET",
                    "data": {
                    "api_key":"3144ac047c40b3615df0fe245035ca70",
                    "query": input,
                    "language": "it",               
                        
                    } ,
                    success: function (data) {
                        render (data.results, $(".wrapper"));
                    },
                    error: function(error) {
                        alert("Errore")
                    }
                });
            }



    };

    //funzione che stampa in pagina 
    function render(results, destination) {

        var source = $("#film-template").html();
        var template = Handlebars.compile(source);

        // var obj = [];

        for (var i=0; i<results.length; i++){
            
            var vote = (results[i].vote_average / 2).toFixed(2);

            var context = {
                "title":results[i].title,
                "originalTitle":results[i].original_title,
                "language":results[i].original_language,
                "vote": vote,
                "voteNumber":results[i].vote_count,
            };
            
            
                         
            var html = template(context);
            destination.append(html);

                       
            const starTotal = 5;
            const starPercentageRounded = (((vote / starTotal) * 100) + "%");

            
            document.getElementsByClassName("star-vote-intro")[i].style.width = starPercentageRounded;
            
                     
        };    
      
    };

    //funzione che pulisci campo input e html
    function clear() {

        $(".wrapper").empty();
        $("#search-input").val("");

    } 











  
   
 