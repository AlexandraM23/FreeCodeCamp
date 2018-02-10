$(document).ready(function() {
    if (navigator.geolocation) {
      getTempAndDisplayIt();
      
      $("#Cbutton").on("click", function(){
          $("#Cel").hide();
          $("#Fah").show();
      
    });
      $("#Fbutton").on("click", function(){
           $("#Fah").hide();
           $("#Cel").show();
      
    });
    }
  });
                    
  var getTempAndDisplayIt = function(){
    navigator.geolocation.getCurrentPosition(function(position) {
          var Lon = position.coords.longitude;
          var Lat = position.coords.latitude;
          getData(Lon,Lat);
    });   
   
    var getData = function(Lon,Lat){
     $.ajax({
      url: "https://fcc-weather-api.glitch.me/api/current",
      //traditional: true, 
      data: {
        lon: Lon,
        lat: Lat
      },
      dataType: "json",
      success: receiveResponse                                   
     });
   };
   var receiveResponse = function(data){
       $("#location").text(data["name"]);
       $("#tempCelsius").text(data["main"]["temp"]); 
       $("#icon").attr("src",data["weather"][0]["icon"]);
       var Fah = Math.floor(data["main"]["temp"] * 9/5 + 32);
       $("#tempFah").text(Fah);
   };
  };
  
  
  
  
  