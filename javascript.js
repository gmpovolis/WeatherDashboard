//my API key
var APIKey = "&appid=dfabaf8934b8ae238833bbf4cb33a533";
// Here we are building the URL we need to query the database
var baseURL = "https://api.openweathermap.org/data/2.5/weather?q="
var forecastBase = "https://api.openweathermap.org/data/2.5/forecast?id=";
var queryURL = "";
var forecastURL = "";

$(".search-btn").on("click", function(event){
    event.preventDefault();
    var lastSearch = $(".input").val().trim();
    lastSearch = lastSearch.replace(/\s+/g, '');
    localStorage.setItem("latestSearch", lastSearch);
    buildURLs();
})

function buildURLs(){
    queryURL = baseURL+ localStorage.getItem("latestSearch")+APIKey;
    forecastURL = forecastBase + localStorage.getItem("latestSearch")+APIKey;
    console.log("queryURL: "+ queryURL);
    console.log("Forecast: " +forecastURL);
}

function current(){
 // Here we run our AJAX call to the OpenWeatherMap API
 $.ajax({
   url: queryURL,
   method: "GET"
 })
   // We store all of the retrieved data inside of an object called "response"
   .then(function(response1) {
        
     
   });
}

function forecast(){
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: forecastURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response2) {
        
        
      });
   }

