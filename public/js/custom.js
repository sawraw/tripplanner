


  // console.log(hotels);
  let markers = {};
  let  hotelLocations = {};
  hotels.forEach(function(hotel){
    hotelLocations[hotel.name]={lat: hotel.place.location[0], lng: hotel.place.location[1]};
  });

  let  activityLocations = {};
  activities.forEach(function(hotel){
    hotelLocations[hotel.name]={lat: hotel.place.location[0], lng: hotel.place.location[1]};
  });

  let  restaurantLocations = {};
  restaurants.forEach(function(hotel){
    hotelLocations[hotel.name]={lat: hotel.place.location[0], lng: hotel.place.location[1]};
  });

  let hotelNames = hotels.map(function(hotel){
    return "<option>" + hotel.name + "</option>"
  }).join("");
 $("#hotel-choices").html(hotelNames);

   let restaurantNames = restaurants.map(function(restaurant){
    return "<option>" + restaurant.name + "</option>"
  }).join("");
 $("#restaurant-choices").html(restaurantNames);

   let activityNames = activities.map(function(activity){
    return "<option>" + activity.name + "</option>"
  }).join("");
 $("#activity-choices").html(activityNames);

//hotel button
 $("#hotel-button").on("click", function(){
   let selected = $("#hotel-choices").val();
  //  console.log($("option:contains(selected)"));
   let addToItinerary =  '<div class="itinerary-item day-'+ currentDay +'"> <span class="title">'+ selected + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';
   $("#hotel-itinerary").append(addToItinerary);
  //  let location = hotelLocations[selected];
  //  console.dir(location);
  // let currentMap = $('#map');
   let marker = new google.maps.Marker({
     position: hotelLocations[selected],
     map: map,
     icon: '/images/lodging_0star.png'
   });
  //  if(!markers[currentDay])markers[currentDay]={}
  markers[selected] = marker;

  var bounds = new google.maps.LatLngBounds();
  for (let mark in markers) {
     bounds.extend(markers[mark].getPosition());
  }
  map.fitBounds(bounds);
  // map.panToBounds(hotelLocations[selected]);
});


//activity button
 $("#activity-button").on("click", function(){
   let selected = $("#activity-choices").val();
   let addToItinerary =  '<div class="itinerary-item day-'+ currentDay +'"> <span class="title">'+ selected + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';
   $("#activity-itinerary").append(addToItinerary);

      let marker = new google.maps.Marker({
     position: hotelLocations[selected],
     map: map,
     icon: '/images/star-3.png'
   });
  markers[selected] = marker;

  var bounds = new google.maps.LatLngBounds();
  for (let mark in markers) {
     bounds.extend(markers[mark].getPosition());
  }
  map.fitBounds(bounds);
});

//restaurant button
$("#restaurant-button").on("click", function(){
   let selected = $("#restaurant-choices").val();
   let addToItinerary =  '<div class="itinerary-item day-'+ currentDay +'"> <span class="title">'+ selected + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';
   $("#restaurant-itinerary").append(addToItinerary);

  let marker = new google.maps.Marker({
     position: hotelLocations[selected],
     map: map,
     icon: '/images/restaurant.png'
   });
  markers[selected] = marker;

  var bounds = new google.maps.LatLngBounds();
  for (let mark in markers) {
     bounds.extend(markers[mark].getPosition());
  }
  map.fitBounds(bounds);
});

let currentDay =1;
//day buttons
$(".day-buttons").on("click", function(e){
  //add a day
  if (e.target.id == "day-add"){
      $(e.target).before('<button class="btn btn-circle day-btn">' + this.children.length + '</button>');
  } else {

      currentDay = +$(e.target).text();
      let dayClass = "day-"+currentDay;
      [...$(".itinerary-item")].forEach(function(i){
         if ($(i).hasClass(dayClass)){
            $(i).show();
        }
        else {
          $(i).hide();
        }
    });

    //toggle between days
    //find out day number from target clicked
    //
  }
});

$("#itinerary").on('click', function(e){
  let deletedName = $(e.target).prev().text();
//hasClass("itinerary-item")
  if ($(e.target).hasClass('btn')) {
    $(e.target).parent().detach();
    markers[deletedName].setMap(null);
    delete markers[deletedName];
  // event.stopPropagation();
  var bounds = new google.maps.LatLngBounds();
  for (let mark in markers) {
     bounds.extend(markers[mark].getPosition());
  }
  if(Object.keys(markers).length)map.fitBounds(bounds);

}

});
