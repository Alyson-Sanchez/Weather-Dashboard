class APIPromise{
    constructor(fn){
        this.fn = fn;
    }

    randomName(){
        console.log('Weather Api was fetched');
    }

    Then(){
        console.log('Weather Api was fetched');
    }

    catch(){
        console.log('Weather Api was fetched');
    }
}
var apiData;

const sortURL = async(promise) => {
    const namedVariable = await promise;
    console.log(namedVariable);
}

function getApi(){
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=28.039465&lon=81.949806&appid=f7bb730c061711d735ea4290bb9a1390`;

    var testString = fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            return data;
        });
    
        //var finalTest = testString.then(result => result.data);
        sortURL(testString);
        /*console.log(finalTest);
        console.log(testString);*/
    }

    apiData = getApi();

    //document.getElementById('p').innerHTML = "${}"

/*function fetch(url)
{
    return new APIPromise((resolve, reject){

    resolve(respo)
    })
    
}*/

//'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid={API key}'
