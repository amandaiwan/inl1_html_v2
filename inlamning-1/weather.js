
const KEY = 'cad845a2da604f313d559dee7ddcc7f3';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=nynashamn&appid=' + KEY;

/*ett objekt som håller ajaxobjektet*/ 
function HttpGet(url){
    this.url = url;
    this.ajax = new XMLHttpRequest();
}

/*Denna anropas då funktionen är klar*/ 
HttpGet.prototype.proceed = function(callback){
    this.ajax.onreadystatechange = function(){
        /*200 = statuskod OK, 4 betyder att den ska uppdateras fram till 4*/
        if(this.readyState === 4 && this.status === 200){
            /*Anropas när vi är klara gör detta*/
            callback(this.response);
        }
    }
    this.ajax.open('GET', this.url, true);
    this.ajax.send();
}

/*slipper skriva ut url, behöver då nata amvämda fetch*/ 
    function fetch(url){
        return new HttpGet(url);
    }


    function $(selector){
        return document.querySelector(selector);
    }


    fetch(API_URL).proceed(response =>{

        var weatherData = JSON.parse(response);
       
        var weatherList = weatherData.list;
    
            /*//Foreach skriver endast ut alla. Vi vill skriva ut 5 stycken i vårt fall Nynäs.
            weatherList.forEach(data => {
               console.log(data); 
            });*/ 
    
            //nu tar vi bara 5 element eftersom de ska vara så i nynäs. Vi vill här få alla tr. 
            var tbody = document.getElementById('weather-data');
            for(var index = 0; index < 5; index++) { // $ betyder att vi lägger in kod i html dokumentet
                //Vi ska alltså göra en tr som kommer att skrivas ut 5 ggr. 
                var time = weatherList[index].dt_txt;
                var date = new Date(time);
                var hour = date.getHours() + ":00";
                var weather = weatherList[index].weather[0].description; //väderinfo
                var temp =  weatherList[index].main.temp; //grader
                var speed = weatherList[index].wind.speed; 
                var timestamp = `
    
                <tr>
                 <td>${hour}</td>
                 <td>${(weather).charAt(0).toUpperCase() + weather.substr(1)}</td>
                 <td>${(temp-273.15).toFixed(1) +  "°C"}</td>
                 <td>${speed.toFixed(1) + " m/s"}</td>
                </tr>
                `; // Allt måste skrivas in i samma ordning som i html dokumentet alltså klocka väder värme vind, osv
                tbody.innerHTML += timestamp; // += är för att vi vill plusa på den föregående strängen
            }
        }
    );

    tider = [
        {
            Nummer: '32',
            Avgår: '11:30',
            Ankommer: '11:35'
        },
        {
            Nummer: '34',
            Avgår: '12:30',
            Ankommer: '13:30'
        },
        {
            Nummer: '32',
            Avgår: '13:40',
            Ankommer: '14:35'
        }
    ];

    
        document.getElementById('inputName').addEventListener('click', (event) => {

        var tableDiv = document.getElementById('infoTable');

        while(document.getElementById("rowInfo").firstChild){
            document.getElementById("rowInfo").removeChild(document.getElementById("rowInfo").firstChild);
        }

        for(var i = 0; i<tider.length; i++){
            var tbody = document.getElementById('rowInfo');
            var nr = tider[i].Nummer;
            var avg = tider[i].Avgår;
            var ank = tider[i].Ankommer;
    
            var rowsValue = `
                <tr>
                    <td>${nr}</td>
                    <td>${avg}</td>
                    <td>${ank}</td>
                </tr>
                `;

            tbody.innerHTML += rowsValue;
        
        }
        event.preventDefault();
        
        var placeHolder = document.getElementById('inputData').value;

        var info = `
        <p> Inga problem i trafiken! <br> Åker ifrån: ${placeHolder}</p>`;

        tableDiv.innerHTML = info;

    });
