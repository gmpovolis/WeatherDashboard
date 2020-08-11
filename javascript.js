//my API key
var APIKey = "&units=imperial&appid=dfabaf8934b8ae238833bbf4cb33a533";
// Here we are building the URL we need to query the database
var baseURL = "https://api.openweathermap.org/data/2.5/weather?q="
var forecastBase = "https://api.openweathermap.org/data/2.5/forecast?q=";
var uvBase = "http://api.openweathermap.org/data/2.5/uvi?appid=dfabaf8934b8ae238833bbf4cb33a533&lat=" //
var lonBase = "&lon="
var queryURL = "";
var forecastURL = "";
var history = [];

$(document).on("click", ".clear-btn", function(event){
    event.preventDefault();
    $(".history").remove();
    localStorage.removeItem("history");
    localStorage.removeItem("latestSearch");
})

$(".search-btn").on("click", function(event){
    event.preventDefault();
    if($(".input").val() != "" && $(".input").val() != localStorage.getItem("latestSearch")){
        var lastSearch = $(".input").val().trim();
        lastSearch = lastSearch.replace(/\s+/g, '');
        localStorage.setItem("latestSearch", lastSearch);
        buildURLs();
        addToHistory();
        current();
        forecast();
    }
})

$(document).on("click", ".fas", function(event){
    event.preventDefault();
    console.log("click works")
    console.log(this.getAttribute("class"));
})

function addToHistory(){
    var local = localStorage.getItem("latestSearch");
    $(".allBtns").append('<li class="history"><button class="fas '+local+' fa-home">'+$(".input").val().trim()+'</button></li>')
    var localArr = [];
    if(localStorage.getItem("history") != null){
        localArr = JSON.parse(localStorage.getItem("history"));
    }
    localArr.push(local);
    localStorage.setItem("history", JSON.stringify(localArr));
}

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
       console.log("response1: " +response1);
       var last = {
            name: response1.name,
            temp: response1.main.temp,
            humidity: response1.main.humidity,
            windspeed: response1.wind.speed
        }
    $(".day").text(moment().format('MMMM Do YYYY'))
    $(".header").text(last.name);
    $(".temp").text(last.temp+" F");
    $(".humidity").text(last.humidity+" %");
    $(".windSpeed").text(last.windspeed+" mph");
    
    localStorage.setItem("lon", response1.coord.lon);
    localStorage.setItem("lat", response1.coord.lat);
    uvIndex();
   });
}

function uvIndex(){
    var uvURL = uvBase + localStorage.getItem("lat") + lonBase + localStorage.getItem("lon");

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function(response3){
        $(".uvIndex").text("UV: " + response3.value)
    })
}

function forecast(){
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: forecastURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response2) {
          console.log(response2);
          var index = 0;
        for(var i = 1; i<6; i++){
            $(".day"+i).text(moment().add(i, 'days').format('dddd'));
            $(".weather-icon"+i).empty();
            $(".weather-icon"+i).html("<img src='icons/"+response2.list[3+index].weather[0].icon+".png>");
            $(".tempFore"+i).text(response2.list[3+index].main.temp+" F");
            $(".humidity"+i).text(response2.list[3+index].main.humidity +" %");
            index = index + 8;
        }
      });
   }

if(localStorage.getItem("latestSearch") != null){
    buildURLs();
    current();
    forecast();
}

if(localStorage.getItem("history") != null){
    
for(var i = 0; i< JSON.parse(localStorage.getItem("history")).length; i++){
    $(".allBtns").append('<li class="history"><button class="fas '+JSON.parse(localStorage.getItem("history"))[i]+' fa-home">'+JSON.parse(localStorage.getItem("history")[i]+'</button></li>'));
    }
}