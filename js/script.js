// esercizio di oggi: Boolflix
// repo: ajax-ex-boolflix
// Iscriviamoci al sito https://www.themoviedb.org. E’ completamente gratuito. 
// Richiediamo la nostra API_KEY che verrà utilizzata in tutte le nostre chiamate. Servirà all’API a capire chi sta effettuando la chiamata.
// Per richiederla clicchiamo sul nostro user, poi impostazioni, API e clicchiamo su “Richiedi una nuova API key”.
// Una volta generato, in Impostazioni / API avremo la nostra chiave, indispensabile per tutte le nostre chiamate.
// Qua https://developers.themoviedb.org/3 troveremo tutte le chiamate possibili all’API. Possiamo giocarci in un secondo momento, ma come prima cosa concentriamoci su Search / Movies.
// Milestone 1
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato: 
// Titolo
// Titolo Originale
// Lingua
// Voto

$(document).ready(function() {


    var source = $("#film-template").html();
    var template = Handlebars.compile(source);



    $("#search-button").click(function(){
        searchFilm();
    }   );

    $("#search-input").keydown(function(e) {
        if (e.which == 13 && $("#search-input").val() != "") {
            searchFilm();
        }
    });


    function searchFilm() {

        var search = $("#search-input").val();
    
        $(".wrapper").empty();


        $.ajax(
            {
                url: "https://api.themoviedb.org/3/search/movie?api_key=3144ac047c40b3615df0fe245035ca70",
                method: "GET",
                "data": {
                "query": search,
                "language": "it",               
                    
                } ,
                success: function (data) {
                    var results = data.results;
                    for (var i=0; i<20; i++){
                                
                        var context = {
                            "title":results[i].title,
                            "originalTitle":results[i].original_title,
                            "language":results[i].original_language,
                            "popularity":results[i].popularity,
                            "vote":results[i].vote_count,
                        }
                        
                        var html = template(context);
                        $(".wrapper").append(html);
                    }
                },
                error: function(error) {
                    alert("Errore")
                }
            });


    }








})




  
   
 