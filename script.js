
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
    myDiv.empty();
    var cityInput = inputName.val()
    displayCityInfo(cityInput)
    fiveDay(cityInput)
    if (!myArr.includes(cityInput)){
        myArr.push(cityInput)
    }
    for(var i=0; i<myArr.length; i++){
        var myH1Tag = $("<button>")
        myH1Tag.text(myArr[i])
        myDiv.append(myH1Tag)
    }
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
        var pThree = $("<h3>").text("Wind Speed: " + windSpeed);
        weatherCard.append(pThree);
        // UV Index
        var uvIndex = response.coord.lon + response.coord.lat;
        var pFour = $("<h3>").text("UV Index: " + uvIndex);
        weatherCard.append(pFour);
        console.log(weatherCard)

        $(".currentWeather").append(weatherCard);
    })
}

function fiveDay(city){
    var chosenCity = city;
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+ chosenCity +"&appid=b0e47115b1fe900748b142de13c8d5ac&units=imperial";
    

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        
        var fiveDayRes= response.list

        for(var i=0; i<fiveDayRes.length; i++){
            
            if(fiveDayRes[i].dt_txt.includes("12:00:00")){
                console.log(fiveDayRes[i]);
                var div = $("<div>")
                div.attr("class","col-2")
                var date= fiveDayRes[i].dt_txt.split(" ")
                var datePtag=$("<p>")
                datePtag.text(date[0])
                var tempP = $("<p>")
                tempP.text(fiveDayRes[i].main.temp)
                var humP=$("<p>")
                humP.text(fiveDayRes[i].main.humidity)
                div.append(datePtag, tempP, humP)
                $(".fiveDayDev").append(div)
            }
            
        }
       
    })
}


