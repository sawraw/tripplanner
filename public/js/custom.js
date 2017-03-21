


  // console.log(hotels);
  let markers = {};
  let  hotelLocations = {};
  hotels.forEach(function(hotel){
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
   let addToItinerary =  '<div class="itinerary-item"> <span class="title">'+ selected + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>'
   $("#hotel-itinerary").append(addToItinerary);
  //  let location = hotelLocations[selected];
  //  console.dir(location);
  let currentMap = $('#map');
   let marker = new google.maps.Marker({
     position: hotelLocations[selected],
     map: map,
     icon: '/images/lodging_0star.png'
   });
  markers[selected] = marker;
});

$("#itinerary").on('click', function(e){
  let deletedName = $(e.target).prev().text();
  console.log(deletedName);
  $(e.target).parent().detach();
  markers[deletedName].setMap(null);
  // event.stopPropagation();
})

//activity button
 $("#activity-button").on("click", function(){
   let selected = $("#activity-choices").val();
   let addToItinerary =  '<div class="itinerary-item"> <span class="title">'+ selected + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>'
   $("#activity-itinerary").append(addToItinerary);
});

//restaurant button
$("#restaurant-button").on("click", function(){
   let selected = $("#restaurant-choices").val();
   let addToItinerary =  '<div class="itinerary-item"> <span class="title">'+ selected + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>'
   $("#restaurant-itinerary").append(addToItinerary);
});
