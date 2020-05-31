var APIKey = "4ffacb430e8a82ee43b31d99a5c84814";
// var URL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&appid=" + APIKey;
var date = moment().format("MMM Do YY");  
console.log(date);
// var fiveForcast = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + city + "&appid=" + APIKey;
var cityInput = $("#search-cities").val().trim();
// var currentWeather = $(this);
// var currentWeather = $(this).attr("data-search");
var cityList = [];

function searchCall(city) {
  
// var cityInput = $("#search-cities").val().trim();
var URL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&appid=" + APIKey;
     
$.ajax({
        url: URL, 
        method: "GET"
    }).then(function (response) { 
        console.log(URL);
        console.log(response);

        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("wind speed: " + response.wind.speed);
        $(".humidity").text("humidity: " + response.main.humidity);


       var tempK = response.main.temp;
       var tempC = tempK - 273.15; 
       var tempF = (tempC * 1.8)+32;
        // add temp content to html
        $(".tempC").text("temperature (C) " + tempC.toFixed(2));
        $(".tempK").text("temperature (K) " + tempK);
        $(".tempF").text("temperature (F) " + tempF.toFixed(2));
        var cloudIcon = null;
var cloud = response.clouds.all;
if (cloud > 66) {
cloudIcon = "http://openweathermap.org/img/wn/03d@2x.png";  

}
else if(cloud > 33) {
  cloudIcon = "http://openweathermap.org/img/wn/02d@2x.png";  

}
else {
  cloudIcon = "http://openweathermap.org/img/wn/01d@2x.png";  
}
         $("#cloudImage").attr("src", cloudIcon);
  });

}


function fiveForcast(city) {
  var URL = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + city + "&appid=" + APIKey;
       
  $.ajax({
          url: URL, 
          method: "GET"
      }).then(function (response) { 
          console.log(URL);
          console.log(response);
  var fiveDays = response.list.filter( (item) => {return item.dt_txt.includes("12:00")}    )
   console.log(fiveDays);     
   $("#fiveDayRow").empty();  
  fiveDays.forEach((item) =>{createCard(item)});
  });
  
  }


$("#search-cities-button").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var city = $("#search-cities").val().trim();

    // Adding movie from the textbox to our array
    cityList.push(city);

    // Calling renderButtons which handles the processing of our movie array
   searchCall(city);
    fiveForcast(city);
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  // $(document).on("click", "#button");

  // Calling the renderButtons function to display the initial buttons
  // searchCall(city)
function createCard(data) {
var cloudIcon = null;
var cloud = data.clouds.all;
if (cloud > 66) {
cloudIcon = "http://openweathermap.org/img/wn/03d@2x.png";  

}
else if(cloud > 33) {
  cloudIcon = "http://openweathermap.org/img/wn/02d@2x.png";  

}
else {
  cloudIcon = "http://openweathermap.org/img/wn/01d@2x.png";  
}

var date = moment(data.dt_txt).format('MM-DD-YYYY');
var tempK = data.main.temp;
var tempC = tempK - 273.15; 
var tempF = (tempC * 1.8)+32;

var card =`<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
<div class="card-header">${date}</div>
<div class="card-body">
<img src="${cloudIcon}">
  <p class="card-text">temp:${tempF.toFixed(2)}</p>
  <p class="card-text">humidity:${data.main.humidity}</p>
  <p class="card-text">wind:${data.wind.speed}</p>
</div>
</div>`
$("#fiveDayRow").append(card);
console.log(card);
}
