//global variables
var date = dayjs().format('M/D/YYYY')
var currentDiv = document.querySelector('#cur-div');
var dayDiv = document.querySelector('#five-day');
var cityDiv = document.querySelector('#city-div');
var cityInput = document.querySelector("#city-input");

// to check if there are any cities saved in the localStorage
function checkStorage() {
  if (localStorage.length > 0) {
    appendCities();
  }
}

// appends cities in localStorage to page as buttons, one at a time
function appendCities() {
  var a = [];
  a = JSON.parse(localStorage.getItem('session')) || [];
  for(var i = 0 ; i < a.length; i++) {
    appendCity(a[i]);
  }
}

// appends a city from local storage as a button on page
function appendCity(city){
  var cityId = city.split(' ').join('-');
  var appendCity = $('<button>').text(city).attr('id', cityId).addClass('col my-1 btn btn-secondary').attr('type', 'button mx-3').appendTo(cityDiv);
  // creates event listener for each city
  $('#' + cityId).on("click", function () {
    checkCity(city);
  });
}

// checks if input is a valid city
function checkCity(city){
  $(currentDiv).empty();
  $(dayDiv).empty();
  var cityFixed = city.split(' ').join('%20');
  axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' +
            cityFixed + '.json?' + 
            'access_token=pk.eyJ1Ijoiam9obmRhdmlzOTI3OTAiLCJhIjoiY2t4NDZlNWJ5MjVoYjJucW9kcm5jdGQxZyJ9.1CTxHYCYILbYZTJvrvtwqw')
    .then(function (res){
      // creates location object
      var locationObj = {
        'lat' : res.data.features[0].center[1],
        'long' : res.data.features[0].center[0],
        'name' : res.data.features[0].place_name,
        'name_short' : city
      }
      checkStorageCity(city, locationObj);
      cityInput.value = '';
    })
    .catch(function (err) {
      console.log(err);
      // if city is not a valid city, it clears the input and asks the user to try again
      alert("Not a valid city, please try again!");
      cityInput.value = '';
  });
}

// to check if the city is already saved in the localStorage
function checkStorageCity(city, locationObj) {
  // if localStorage is not empty
  if (localStorage.length > 0) {
    var a = [];
    a = JSON.parse(localStorage.getItem('session')) || [];
    var search = false;
    // checks each object in the localStorage array if it matches the city in the input field
    for(var i = 0 ; i < a.length; i++) {
      if (a[i] === city) {
        // if it matches, it returns true
        search = true;
        break;
      } else {
        // if not, returns false and tries the next object in the array
        search = false;
      }
    }
    // if the input string matches any object in the localStorage
    if (search === true){
      getWeather(locationObj);
    // if the input string does not match any object in the localStorage
    } else {
      appendCityLoc(city, locationObj);
    }
  // if localStorage is empty 
  } else {
    appendCityLoc(city, locationObj);
  }
}

// appends a city from input as a button on page
function appendCityLoc(city, locationObj){
  var cityId = city.split(' ').join('-');
  var appendCity = $('<button>').text(city).attr('id', cityId).addClass('col my-1 btn btn-secondary').attr('type', 'button mx-3').appendTo(cityDiv);
  saveCity(city);
  getWeather(locationObj);
  // creates event listener for each city 
  $('#' + cityId).on("click", function () {
    checkCity(city);
  });
}

function saveCity(city){
  var a = [];
  // create array from localStorage data
  a = JSON.parse(localStorage.getItem('session')) || [];
  // Push the new data (city name) onto the array
  a.push(city);
  // Reset the array back into a string and store it in localStorage
  localStorage.setItem('session', JSON.stringify(a));
}

// gets weather data from API
function getWeather(locationObj){
  axios.get('https://api.openweathermap.org/data/2.5/onecall?units=imperial&' + 
          'lat=' + locationObj.lat + 
          '&lon=' + locationObj.long + 
          '&appid=8ac56aa0cef179cc63eb58f2231b8356')
    .then(function (res){
      // if successful, it creates object with all the needed info from the current day and the next 5 days
      var weatherObj = {
        '0' : {
          'date' : date,
          'img' : 'http://openweathermap.org/img/wn/' + res.data.current.weather[0].icon + '@2x.png',
          'img_text' : res.data.current.weather[0].description,
          'temp' : res.data.current.temp,
          'wind' : res.data.current.wind_speed,
          'hum' : res.data.current.humidity,
          'uv' : res.data.current.uvi,
        },
        '1' : {
          'img' : 'http://openweathermap.org/img/wn/' + res.data.daily[0].weather[0].icon + '@2x.png',
          'img_text' : res.data.daily[0].weather[0].description,
          'temp' : res.data.daily[0].temp.max,
          'wind' : res.data.daily[0].wind_speed,
          'hum' : res.data.daily[0].humidity
        },
        '2' : {
          'img' : 'http://openweathermap.org/img/wn/' + res.data.daily[1].weather[0].icon + '@2x.png',
          'img_text' : res.data.daily[1].weather[0].description,
          'temp' : res.data.daily[1].temp.max,
          'wind' : res.data.daily[1].wind_speed,
          'hum' : res.data.daily[1].humidity
        },
        '3' : {
          'img' : 'http://openweathermap.org/img/wn/' + res.data.daily[2].weather[0].icon + '@2x.png',
          'img_text' : res.data.daily[2].weather[0].description,
          'temp' : res.data.daily[2].temp.max,
          'wind' : res.data.daily[2].wind_speed,
          'hum' : res.data.daily[2].humidity
        },
        '4' : {
          'img' : 'http://openweathermap.org/img/wn/' + res.data.daily[3].weather[0].icon + '@2x.png',
          'img_text' : res.data.daily[3].weather[0].description,
          'temp' : res.data.daily[3].temp.max,
          'wind' : res.data.daily[3].wind_speed,
          'hum' : res.data.daily[3].humidity
        },
        '5' : {
          'img' : 'http://openweathermap.org/img/wn/' + res.data.daily[4].weather[0].icon + '@2x.png',
          'img_text' : res.data.daily[4].weather[0].description,
          'temp' : res.data.daily[4].temp.max,
          'wind' : res.data.daily[4].wind_speed,
          'hum' : res.data.daily[4].humidity
        },
        'city_short' : locationObj.name_short,
        'city_long' : locationObj.name
      }
      appendData(weatherObj);
    })
    // if the API is not working, it clears the input and asks the user to try again another time
    .catch(function (err) {
      console.log(err);
      alert("Cannot connect to weather data, please try again later");
      cityInput.value = '';
  });
}

// creates elements and appends them to the DOM from the data within the weatherObj object
function appendData(weatherObj) {
  // current day element
  var curDiv = $('<div>').addClass('col border border-secondary border-2 my-2').attr('style', 'height: 220px').appendTo(currentDiv);
  var curCity = $('<h4>').text(weatherObj.city_long + ' ' + dayjs().format('(M/D/YYYY)')).appendTo(curDiv);
  var curSpan = $('<span>').appendTo(curCity);
  var curImg = $('<img>').attr('src', weatherObj[0].img).attr('alt', weatherObj[0].img_text).attr('style', 'height: 40px').appendTo(curSpan);
  var curTemp = $('<p>').text('Temp: ' + weatherObj[0].temp + ' °F').appendTo(curDiv);
  var curWind = $('<p>').text('Wind: ' + weatherObj[0].wind + ' MPH').appendTo(curDiv);
  var curHum = $('<p>').text('Humidity: ' + weatherObj[0].hum + '%').appendTo(curDiv);
  var curUV = $('<p>').text('UV Index: ').appendTo(curDiv);
  var curUVSpan = $('<span>').text(weatherObj[0].uv);

  // checks uv rating to give it a background color depending the value, appends it to the current day element above
  if (weatherObj[0].uv < 3){
    curUVSpan.addClass('badge bg-success').appendTo(curUV);
  } else if (weatherObj[0].uv < 6){
    curUVSpan.addClass('badge bg-warning text-dark').appendTo(curUV);
  } else {
    curUVSpan.addClass('badge bg-danger').appendTo(curUV);
  }

  // 1 day into the future weather element
  var oneDayDiv = $('<div>').addClass('col bg-info mx-2 border border-secondary').attr('style', 'height: 200px').appendTo(dayDiv);
  var oneDayDate = $('<h5>').text(dayjs().add(1, 'day').format('M/D/YYYY')).addClass('text-white pt-2').appendTo(oneDayDiv);
  var oneDayImg = $('<img>').attr('src', weatherObj[1].img).attr('alt', weatherObj[1].img_text).attr('style', 'height: 40px').appendTo(oneDayDiv);
  var oneDayTemp = $('<p>').text('Temp: ' + weatherObj[1].temp + ' °F').addClass('text-white').appendTo(oneDayDiv);
  var oneDayWind = $('<p>').text('Wind: ' + weatherObj[1].wind + ' MPH').addClass('text-white').appendTo(oneDayDiv);
  var oneDayHum = $('<p>').text('Humidity: ' + weatherObj[1].hum + '%').addClass('text-white').appendTo(oneDayDiv);
  // 2 days into the future weather element
  var twoDayDiv = $('<div>').addClass('col bg-info mx-2 border border-secondary').attr('style', 'height: 200px').appendTo(dayDiv);
  var twoDayDate = $('<h5>').text(dayjs().add(2, 'day').format('M/D/YYYY')).addClass('text-white pt-2').appendTo(twoDayDiv);
  var twoDayImg = $('<img>').attr('src', weatherObj[2].img).attr('alt', weatherObj[2].img_text).attr('style', 'height: 40px').appendTo(twoDayDiv);
  var twoDayTemp = $('<p>').text('Temp: ' + weatherObj[2].temp + ' °F').addClass('text-white').appendTo(twoDayDiv);
  var twoDayWind = $('<p>').text('Wind: ' + weatherObj[2].wind + ' MPH').addClass('text-white').appendTo(twoDayDiv);
  var twoDayHum = $('<p>').text('Humidity: ' + weatherObj[2].hum + '%').addClass('text-white').appendTo(twoDayDiv);
  // 3 days into the future weather element
  var threeDayDiv = $('<div>').addClass('col bg-info mx-2 border border-secondary').attr('style', 'height: 200px').appendTo(dayDiv);
  var threeDayDate = $('<h5>').text(dayjs().add(3, 'day').format('M/D/YYYY')).addClass('text-white pt-2').appendTo(threeDayDiv);
  var threeDayImg = $('<img>').attr('src', weatherObj[3].img).attr('alt', weatherObj[3].img_text).attr('style', 'height: 40px').appendTo(threeDayDiv);
  var threeDayTemp = $('<p>').text('Temp: ' + weatherObj[3].temp + ' °F').addClass('text-white').appendTo(threeDayDiv);
  var threeDayWind = $('<p>').text('Wind: ' + weatherObj[3].wind + ' MPH').addClass('text-white').appendTo(threeDayDiv);
  var threeDayHum = $('<p>').text('Humidity: ' + weatherObj[3].hum + '%').addClass('text-white').appendTo(threeDayDiv);
  // 4 days into the future weather element
  var fourDayDiv = $('<div>').addClass('col bg-info mx-2 border border-secondary').attr('style', 'height: 200px').appendTo(dayDiv);
  var fourDayDate = $('<h5>').text(dayjs().add(4, 'day').format('M/D/YYYY')).addClass('text-white pt-2').appendTo(fourDayDiv);
  var fourDayImg = $('<img>').attr('src', weatherObj[4].img).attr('alt', weatherObj[4].img_text).attr('style', 'height: 40px').appendTo(fourDayDiv);
  var fourDayTemp = $('<p>').text('Temp: ' + weatherObj[4].temp + ' °F').addClass('text-white').appendTo(fourDayDiv);
  var fourDayWind = $('<p>').text('Wind: ' + weatherObj[4].wind + ' MPH').addClass('text-white').appendTo(fourDayDiv);
  var fourDayHum = $('<p>').text('Humidity: ' + weatherObj[4].hum + '%').addClass('text-white').appendTo(fourDayDiv);
  // 5 days into the future weather element
  var fiveDayDiv = $('<div>').addClass('col bg-info mx-2 border border-secondary').attr('style', 'height: 200px').appendTo(dayDiv);
  var fiveDayDate = $('<h5>').text(dayjs().add(5, 'day').format('M/D/YYYY')).addClass('text-white pt-2').appendTo(fiveDayDiv);
  var fiveDayImg = $('<img>').attr('src', weatherObj[5].img).attr('alt', weatherObj[5].img_text).attr('style', 'height: 40px').appendTo(fiveDayDiv);
  var fiveDayTemp = $('<p>').text('Temp: ' + weatherObj[5].temp + ' °F').addClass('text-white').appendTo(fiveDayDiv);
  var fiveDayWind = $('<p>').text('Wind: ' + weatherObj[5].wind + ' MPH').addClass('text-white').appendTo(fiveDayDiv);
  var fiveDayHum = $('<p>').text('Humidity: ' + weatherObj[5].hum + '%').addClass('text-white').appendTo(fiveDayDiv);
}

// event listener for the search button
document.querySelector("#search-button").addEventListener("click", function (event) {
  event.preventDefault();
  var cityInputTrim = cityInput.value.trim();
  checkCity(cityInputTrim);
});

// checks for cities stored in localStorage before anything
checkStorage();