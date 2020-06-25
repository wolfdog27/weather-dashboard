// TODO: block that says "Weather Dashboard"
// TODO: container with 4 and 8 rows and col - give ids
// TODO: search bar and search button
// TODO: add created buttons (like movies)
// TODO: also retreives local Data and fiveday forcast 
// TODO: 
// TODO: 
// TODO: 
// TODO: 


// Oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
var inputName = $("#inputName")
var search = $("#search")
var myDiv = $(".myDiv")
var myArr = []
var fromlocalStorage= JSON.parse(localStorage.getItem("inputValue"))
if(fromlocalStorage !== null){
    console.log(myArr);
    for(var j=0; j<fromlocalStorage.length; j++){
        myArr.push(fromlocalStorage[j])
    }
    for(var i=0; i<myArr.length; i++){
        var myH1Tag = $("<button>")
        myH1Tag.text(myArr[i])
        myDiv.append(myH1Tag)
    }
}
search.click(function(){
    var cityInput = inputName.val()
    myArr.push(cityInput)
     var myH1Tag = $("<button>")
        myH1Tag.text(cityInput)  
        myDiv.append(myH1Tag)
    localStorage.setItem("inputValue", JSON.stringify(myArr))
})
// Oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo


function displayCityInfo(city){
    var chosenCity = city;
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=b0e47115b1fe900748b142de13c8d5ac&units=imperial";
    console.log (queryUrl)

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        var weatherCard = $("<div class='card'>");
        // temperature
        var temperature = response.main.temp;
        var pOne = $("<h3>").text("Temperature: " + temperature);
        weatherCard.append(pOne);
        // humidity
        var humidity = response.main.humidity;
        var pTwo = $("<h3>").text("Humidity: " + humidity);
        weatherCard.append(pTwo);
        // wind speed
        var windSpeed = response.wind.speed;
        var pThree = ("<h3>").text("Wind Speed: " + windSpeed);
        weatherCard.append(pThree);
        // UV Index
        var uvIndex = response.coord.lon + response.coord.lat;
        var pFour = ("<h3>").text("UV Index: " + uvIndex);
        weatherCard.append(pFour);
        console.log(weatherCard)
    })
}

displayCityInfo();


search.click(function(){
    displayCityInfo(inputName.val().trim())
})


// TODO: run ajax within display city function
//     then make buttons
//     make h3, append var 


// var ApiKey = "b0e47115b1fe900748b142de13c8d5ac";
// var q = "";


// $.ajax({
//     url: queryUrl,
//     method: "GET"
// }).then(function(response) {
//     console.log(queryUrl)
//     console.log(response)

//     $("div.city").html("<h1>" + response.name + "</h1>")
//     $("div.wind").text(`wind speed ${response.wind.speed} knots`)
//     $("div.humidity").text(`humidity ${response.main.humidity}%`)
    
//     var tempF = ((response.main.temp - 275.15) * 1.80 + 32).toFixed(2);
//     console.log(tempF);

//     var tempDiv = $(".temp");
//     tempDiv.text(tempF);
//     $(".temp").append(tempDiv);
// });

