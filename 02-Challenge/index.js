const currentDay = document.getElementById('current-day');
const fiveDayForcast = document.getElementsByClassName('dayForcast');
var apiData;

//gets the promised object outside of the promise itself
const sortURL = async(promise) => {
    const jsonApi = await promise;
    console.log(jsonApi);
    apiData = jsonApi;

    document.getElementsByTagName('h2')[1].innerHTML = jsonApi.city.name;
    console.log(fiveDayForcast);

    for (let i=0; i< fiveDayForcast.length; i++){
    populateDay(jsonApi.list[((i + 1) * 7)], fiveDayForcast[i]);
    console.log(populateDay);
    }
}

//returns a promise with an object 
function getApi(){
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=28.039465&lon=-81.949806&appid=f7bb730c061711d735ea4290bb9a1390`;

    //fetches information from the url
    var testString = fetch(requestUrl)
    //takes response from the URL (which is a string) and turns it into a JSON object to make it easier to reference later
        .then(function(response){
            return response.json();
        });
    
        //var finalTest = testString.then(result => result.data);
        sortURL(testString);
    }
    //assigns the value of the method to apiData
    apiData = getApi();
    
    var temp = kelvinToFarenheit(289.78);
    console.log(temp);

    //===========================================================================================================
    //HELPER FUNCTIONS :
    function kelvinToFarenheit(Kelvin){
        return((Kelvin - 273.15) * 9 / 5 + 32)
    }

    // This function is ONLY for the 5 day forcast. The current day uses a different function entirely.
    function populateDay(dayJSON, div){
        //calculating the date of the day thats passed in
        
        //calculates a new date from the dayJSON (which references the API). This date is given to us in seconds, so it needs to be converted to miliseconds(multiplied by 1000) in order for the following function to have a readable value
        var calculatedDate = new Date(dayJSON.dt * 1000);
        //Replaces the first child of the div container with the result of the calculated month, day, and year
       div.children[0].innerHTML = (calculatedDate.getMonth() +1 )+ '/' + calculatedDate.getDate() + '/' + calculatedDate.getFullYear();
    
       var iconURL = "http://openweathermap.org/img/w/" + dayJSON.weather[0].icon+ ".png";
       div.children[1].src = iconURL;

       //takes the result of the temp < main < JSON - which is in Kelvin - and assigns it to dayTempKelvin
       var dayTempKelvin = dayJSON.main.temp;
       // runs the kelvinToFarenheit function established earlier with the value of dayTempKelvin passed into it. .toFixed forces the result to be limited to the number of decimal places given in the parameter
       var dayTemp = kelvinToFarenheit(dayTempKelvin).toFixed(2);
       div.children[2].innerHTML = 'Temp: ' + dayTemp + '°F';

        var dayWind = 'Wind: ' + dayJSON.wind.speed + 'MPH';
        div.children[3].innerHTML = dayWind;

       var dayHumid = 'Humidity: ' + dayJSON.main.humidity + ' %';
       div.children[4].innerHTML = dayHumid;
    }


/*function fetch(url)
{
    return new APIPromise((resolve, reject){

    resolve(respo)
    })
    
}*/

//'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid={API key}'
