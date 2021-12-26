axios.get('https://api.openweathermap.org/data/2.5/onecall?units=imperial&' + 
          'lat=' + '37.774929' + 
          '&lon=' + '-122.419418' + 
          '&appid=8ac56aa0cef179cc63eb58f2231b8356')
  .then(function (res){
    console.log(res);
    console.log(res.data.current.temp);
  })
  .catch(function (err) {
    console.log(err);
});
