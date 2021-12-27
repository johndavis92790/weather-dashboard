var date = dayjs().format('M/D/YYYY');
var date1 = dayjs().add(1, 'day').format('M/D/YYYY');
var date2 = dayjs().add(2, 'day').format('M/D/YYYY');
var date3 = dayjs().add(3, 'day').format('M/D/YYYY');
var date4 = dayjs().add(4, 'day').format('M/D/YYYY');
var date5 = dayjs().add(5, 'day').format('M/D/YYYY');

axios.get('https://api.openweathermap.org/data/2.5/onecall?units=imperial&' + 
          'lat=' + '37.774929' + 
          '&lon=' + '-122.419418' + 
          '&appid=8ac56aa0cef179cc63eb58f2231b8356')
  .then(function (res){
    console.log(res);
    
    var weatherObj = {
      'currentDay' : {
        'date' : date,
        'img' : 'http://openweathermap.org/img/wn/' + res.data.current.weather[0].icon + '@2x.png',
        'temp' : res.data.current.temp,
        'wind' : res.data.current.wind_speed,
        'hum' : res.data.current.humidity,
        'uv' : res.data.current.uvi,
      },
      '1Day' : {
        'date' : date1,
        'img' : 'http://openweathermap.org/img/wn/' + res.data.daily[0].weather[0].icon + '@2x.png',
        'temp' : res.data.daily[0].temp.max,
        'wind' : res.data.daily[0].wind_speed,
        'hum' : res.data.daily[0].humidity
      },
      '2Day' : {
        'date' : date2,
        'img' : 'http://openweathermap.org/img/wn/' + res.data.daily[1].weather[0].icon + '@2x.png',
        'temp' : res.data.daily[1].temp.max,
        'wind' : res.data.daily[1].wind_speed,
        'hum' : res.data.daily[1].humidity
      },
      '3Day' : {
        'date' : date3,
        'img' : 'http://openweathermap.org/img/wn/' + res.data.daily[2].weather[0].icon + '@2x.png',
        'temp' : res.data.daily[2].temp.max,
        'wind' : res.data.daily[2].wind_speed,
        'hum' : res.data.daily[2].humidity
      },
      '4Day' : {
        'date' : date4,
        'img' : 'http://openweathermap.org/img/wn/' + res.data.daily[3].weather[0].icon + '@2x.png',
        'temp' : res.data.daily[3].temp.max,
        'wind' : res.data.daily[3].wind_speed,
        'hum' : res.data.daily[3].humidity
      },
      '5Day' : {
        'date' : date5,
        'img' : 'http://openweathermap.org/img/wn/' + res.data.daily[4].weather[0].icon + '@2x.png',
        'temp' : res.data.daily[4].temp.max,
        'wind' : res.data.daily[4].wind_speed,
        'hum' : res.data.daily[4].humidity
      }
    }
    console.log('weatherObj', weatherObj);
  })
  .catch(function (err) {
    console.log(err);
});


axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' +
          'new%20york' + '.json?' + 
          'access_token=pk.eyJ1Ijoiam9obmRhdmlzOTI3OTAiLCJhIjoiY2t4NDZlNWJ5MjVoYjJucW9kcm5jdGQxZyJ9.1CTxHYCYILbYZTJvrvtwqw')
  .then(function (res){
    console.log(res);
    var locationObj = {
      'lat' : res.data.features[0].center[1],
      'long' : res.data.features[0].center[0],
      'name' : res.data.features[0].place_name
    }
    console.log('locationObj', locationObj);

  })
  .catch(function (err) {
    console.log(err);
});

