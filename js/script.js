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
    searchFilm("ritorno al futuro")

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

                       
            // total number of stars
            const starTotal = 5;
            console.log(vote);

            const starPercentageRounded = (((vote / starTotal) * 100) + "%");
            console.log(starPercentageRounded);

            
            // console.lo   g(i);
            // for(var h=0; h<vote; h++) {  
                // document.querySelector(".star-vote-intro").style.width = starPercentageRounded; 
            // }

            // $(".star-vote-intro").each(function()
            // {
            //     console.log(starPercentageRounded);
                
            //     console.log(this);
            //     this.style.width = starPercentageRounded;
            //     console.log(this);
            //     // this.css("width",starPercentageRounded);
            // });

            document.getElementsByClassName("star-vote-intro")[i].style.width = starPercentageRounded;
            
            
            // console.log(vote);

            // switch (vote) {
            //     case 0:
            //         console.log("0 stelle");
            //         for (var j=0; j<5; j++){
            //             $(".star-vote").prepend("<li><i class='far fa-star'></i></li>")
                        
            //         }
            //         break;
            //     case 1:
            //         console.log("1 stelle");
            //         for (var j=0; j<1; j++){
            //             $(".star-vote").prepend("<li><i class='fas fa-star'></i></li>")
            //             console.log("pre");
            //         }
            //         for (var j=0; j<4; j++){
            //             $(".star-vote").append("<li><i class='far fa-star'></i></li>")
            //             console.log("appe");
            //         }
            //         break;
            //     case 2:
            //         console.log("2 stelle");
            //         for (var j=0; j<2; j++){
            //             $(".star-vote").prepend("<li><i class='fas fa-star'></i></li>")
            //         }
            //         for (var j=0; j<3; j++){
            //             $(".star-vote").append("<li><i class='far fa-star'></i></li>")
            //         }
            //         break;
            //     case 3:
            //         console.log("3 stelle");
            //         for (var j=0; j<3; j++){
            //             $(".star-vote").prepend("<li><i class='fas fa-star'></i></li>")
            //         }
            //         for (var j=0; j<2; j++){
            //             $(".star-vote").append("<li><i class='far fa-star'></i></li>")
            //         }
            //         break;
            //     case 4:
            //         console.log("4 stelle");
            //         for (var j=0; j<4; j++){
            //             $(".star-vote").prepend("<li><i class='fas fa-star'></i></li>")
            //         }
            //         for (var j=0; j<1; j++){
            //             $(".star-vote").append("<li><i class='far fa-star'></i></li>")
            //         }
            //         var test = "4 stelle";
            //         break;
            //     case 5:
            //         console.log("5 stelle");
            //         for (var j=0; j<5; j++){
            //             // $(".star-vote").prepend("<li><i class='fas fa-star'></i></li>")
            //             var test = "<li><i class='fas fa-star'></i></li>";
            //             console.log('ciao');
                        
            //         }
                   
            //         break;
            //     default:
            //         console.log('default');
            //         break;
                    
          
          
        };

        
      


    };

    //funzione che pulisci campo input e html
    function clear() {

        $(".wrapper").empty();
        $("#search-input").val("");

    } 











  
   
 