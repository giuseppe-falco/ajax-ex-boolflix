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
//Milestone 3
    //aggiungiamo la copertina del film o della serie al nostro elenco.
    //Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
    //Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare (troviamo tutte le dimensioni possibili a questo link: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la parte finale dell’URL passata dall’API.
//Milestone 4:
    //Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp, creando un layout completo simil-Netflix:
    //Un header che contiene logo e search bar
    //Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio la poster_path con w342)
    //Andando con il mouse sopra una card (on hover), appaiono le informazioni aggiuntive già prese nei punti precedenti più la overview

    $(document).ready(function() {
    //parte ricerca e stampa in pagina al click sulll botton cerca
    $("#search-button").click(function(){
        var input = $("#search-input").val(); 
        startSearch(input);
    }   );
    //parte ricerca e stampa in pagina al tasto invio sul campo input
    $("#search-input").keyup(function(e) {
        if (e.which == 13 && $("#search-input").val() != "") {
            var input = $("#search-input").val(); 
            startSearch(input);
        }
    });

    //////////////////////////temporaneo////////////////
    searchFilm("ritorno al futuro")

    //////////////////////////temporaneo////////////////
    
   
    $(".logo-header").click(function(){
        startSearch(" ");
      }); 















})











//******************************************funczioni*************************************+ */
    //funzione ricerca film
    function searchFilm(input) {
        clear();
        // controllo input non sia vuoto
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
                        var type = "film";
                        checkResultsEmpty(type, data)
                    },
                    error: function(error) {
                        alert("Errore")
                    }
                });
            }
    };

    //funzione ricerca serie tv
    function searchShow (input) {
        clear();
        // controllo input non sia vuoto
        if(input != " " && input != "  ") {
            $.ajax(
                {
                    url: "https://api.themoviedb.org/3/search/tv",
                    method: "GET",
                    "data": {
                    "api_key":"3144ac047c40b3615df0fe245035ca70",
                    "query": input,
                    "language": "it",               
                    } ,
                    success: function (data) {
                        var type = "show";
                        checkResultsEmpty(type, data)
                    },
                    error: function(error) {
                        alert("Errore")
                    }
                });
            }
    };

    //controllo esistano dei risultati
    function checkResultsEmpty(type, data) {
        if (data.total_results == 0) {
            alert("Nessun "+ type + " trovato per questa ricerca")
        } else {
            render (type, data.results);
        }
    }
    //funzione che stampa in pagina 
    function render(type, results) {
        //copia template film 
        var source = $("#film-template").html();
        var template = Handlebars.compile(source);

        for (var i=0; i<results.length; i++){
            //calcolo voto medio in scala 5
            var vote = (results[i].vote_average / 2).toFixed(2);

            //var percorso immagine
            var path = results[i].poster_path;
            //se il percorso è nullo assegno percorso = immagine film bud spencer            
            if (path == null ){
                path = "27bKMOKfVtOicxZPP1Nk78WyCFE.jpg";
            }

            var context = {
                "title":results[i].title || results[i].name,
                "originalTitle":results[i].original_title || results[i].original_name,

                "language":results[i].original_language,
                "vote": vote,
                "voteNumber":results[i].vote_count,
                "type":type,

                "path":path,
            };

            //appendo in sezioni diverse film e serie
            if (type == "film") {
                var destination = $("#list-film");
            }else if (type = "show") {
                var destination = $("#list-show");
            }
            //appendo in pagina la lista dei film trovati
            var html = template(context);
            destination.append(html);

            //totale stelle
            const starTotal = 5;
            //percentuale valore voto
            const starPercentageRounded = (((vote / starTotal) * 100) + "%");
            //colora stelle in percentuale al voto            
            document.getElementsByClassName("star-vote-intro")[i].style.width = starPercentageRounded;
            
                     
            //soluzione di samuele
            // var num = vote;
            // var string = "";
            // for(var i=0;i<5;i++){
            //     if (i<=num){
            //         string = string = "<i class='fas fa-star'></i>";
            //     } else {
            //         string = string = "<i class='far fa-star'></i>";
            //     }
            //     console.log(string);
                
            // }
        };    
      
    };

    //funzione che pulisci campo input e html
    function clear() {
        // svuota pagina film
        $("#list-show").empty();
        $("#list-film").empty();
        // svuota cmapo input
        $("#search-input").val("");

    } 



    //funzione che fa partire la ricerca
    function startSearch(input){

        var option = $("#select-search").val();
        console.log(option);

        switch (option) {
            case "search-film":
                $("#wrapper>h2:first-of-type").show();
                $("#wrapper>h2:last-of-type").hide();
                searchFilm(input);
                break;
            case "search-show":
                $("#wrapper>h2:last-of-type").show();
                $("#wrapper>h2:first-of-type").hide();
                searchShow(input);
                break;
            case "search-global":
                $("#wrapper>h2:first-of-type").show();
                $("#wrapper>h2:last-of-type").show();
                searchFilm(input);
                searchShow(input);
                break; 
        
        }
    }
    






  
   
 