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
    populateDay(jsonApi.list[8], fiveDayForcast[0]);
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
    //helper functions:
    function kelvinToFarenheit(Kelvin){
        return((Kelvin - 273.15) * 9 / 5 + 32)
    }

    function populateDay(dayJSON, div){
        //calculating the date of the day thats passed in
        var calculatedDate = new Date(dayJSON.dt * 1000);
       div.children[0].innerHTML = (calculatedDate.getMonth() +1 )+ '/' + calculatedDate.getDay() + '/' + calculatedDate.getFullYear();


    }

/*function fetch(url)
{
    return new APIPromise((resolve, reject){

    resolve(respo)
    })
    
}*/

//'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid={API key}'
