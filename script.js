const apiKey = "39f204c78b8d7984a012c051ce393e03"

function weatherForecast(chosenCity) {
    // The query URL determines what information the API returns from a search 
    var queryURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${apiKey}&units=metric`
    // The AJAX function searches 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // The values returned by the api can be seen in the response object, logging this helps track the values so they can be "pointed to" when altering the HTML
        console.log(response)
        // Sets the text on the HTML to the value indicated in the API JSON
        var nameOf = $("#city-name").text(response.name)
        // Uses moment.Js to display the current date
        var dateToday = $("#date-today").text(moment().format("(DD/MM/YYYY)"))
        var tempratureOf = $("#temprature").text(response.main.temp + "°C")
        var iconOf = $("#weather-icon").attr('src',
            `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`);
        var humidityOf = $("#humidity").text(response.main.humidity + "%")
        var windSpeedOf = $("#wind-speed").text(response.wind.speed + " M/s")
    })
}

// Preset City on-click functions, sets chosenCity to a set string as the argument for the weather forecast function
$("#adelaide").on("click", function () {
    var chosenCity = "adelaide";
    weatherForecast(chosenCity)
    uvIndexifyer(chosenCity)
    futureForecast(chosenCity)
    uvIndexifyer(chosenCity)
})
$("#melbourne").on("click", function () {
    var chosenCity = "melbourne";
    weatherForecast(chosenCity)
    futureForecast(chosenCity)
    uvIndexifyer(chosenCity)
})
$("#perth").on("click", function () {
    var chosenCity = "perth";
    weatherForecast(chosenCity)
    futureForecast(chosenCity)
    uvIndexifyer(chosenCity)
})
$("#brisbane").on("click", function () {
    var chosenCity = "brisbane";
    weatherForecast(chosenCity)
    futureForecast(chosenCity)
    uvIndexifyer(chosenCity)
})
$("#sydney").on("click", function () {
    var chosenCity = "sydney";
    weatherForecast(chosenCity)
    futureForecast(chosenCity)
    uvIndexifyer(chosenCity)
})
$("#hobart").on("click", function () {
    var chosenCity = "hobart";
    weatherForecast(chosenCity)
    futureForecast(chosenCity)
    uvIndexifyer(chosenCity)
})
$("#canberra").on("click", function () {
    var chosenCity = "canberra";
    weatherForecast(chosenCity)
    futureForecast(chosenCity)
    uvIndexifyer(chosenCity)
})
$("#darwin").on("click", function () {
    var chosenCity = "darwin";
    weatherForecast(chosenCity)
    futureForecast(chosenCity)
    uvIndexifyer(chosenCity)
})

// Search function, reads the users input value and sets it as the argument for the weather forecast function
$("#searchBtn").on("click", function () {
    var chosenCity = $("#searchedCity").val()
    weatherForecast(chosenCity)
    futureForecast(chosenCity)
    uvIndexifyer(chosenCity)
    var newBtn = $("<button></button>")
    newBtn.addClass("btn btn-light cityBtn")
    newBtn.attr("id", $("#searchedCity").val())
    newBtn.text($("#searchedCity").val())
    newBtn.appendTo("#buttonArea")
})

function futureForecast(chosenCity) {
    var queryURL =
        `https://api.openweathermap.org/data/2.5/forecast?q=${chosenCity}&appid=${apiKey}&units=metric`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Adding dates to all future forecast areas
        $("#day1-date").text(moment().add(1, 'd').format("D MMMM"))
        $("#day2-date").text(moment().add(2, 'd').format("D MMMM"))
        $("#day3-date").text(moment().add(3, 'd').format("D MMMM"))
        $("#day4-date").text(moment().add(4, 'days').format("D MMMM"))
        $("#day5-date").text(moment().add(5, 'days').format("D MMMM"))
        // Adding appropriate Icons to each future date
        var day1Icon = $("#day1-icon").attr('src',
            `http://openweathermap.org/img/wn/${response.list[7].weather[0].icon}.png`);
        var day2Icon = $("#day2-icon").attr('src',
            `http://openweathermap.org/img/wn/${response.list[15].weather[0].icon}.png`);
        var day3Icon = $("#day3-icon").attr('src',
            `http://openweathermap.org/img/wn/${response.list[23].weather[0].icon}.png`);
        var day4Icon = $("#day4-icon").attr('src',
            `http://openweathermap.org/img/wn/${response.list[31].weather[0].icon}.png`);
        var day5Icon = $("#day5-icon").attr('src',
            `http://openweathermap.org/img/wn/${response.list[39].weather[0].icon}.png`);
        // Adding temprature to each date subsection
        $("#day1-temp").text(response.list[7].main.temp + "°C");
        $("#day2-temp").text(response.list[15].main.temp + "°C");
        $("#day3-temp").text(response.list[23].main.temp + "°C");
        $("#day4-temp").text(response.list[31].main.temp + "°C");
        $("#day5-temp").text(response.list[39].main.temp + "°C");
        // Adding humidity to each date subsection
        $("#day1-humid").text(response.list[7].main.humidity + "%")
        $("#day2-humid").text(response.list[15].main.humidity + "%")
        $("#day3-humid").text(response.list[23].main.humidity + "%")
        $("#day4-humid").text(response.list[31].main.humidity + "%")
        $("#day5-humid").text(response.list[39].main.humidity + "%")
    })

}

function uvIndexifyer(chosenCity) {
    var queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var uvOf = $("#uv-index").text(response.main.uv)
        if (response.main.uv < 2) {
            $("#uv-index").addClass("bgGreen")
        } else if (response.main.uv < 6) {
            $("#uv-index").addClass("bgAmber")
        } else if (response.main.uv < 10) {
            $("#uv-index").addClass("bgRed")
        }
    })
}