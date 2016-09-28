'use strict';

var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00am', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', 'Total'];
var totals = [];
var allLocations = [];
var restaurantsTable = document.getElementById('restaurantsTable');
var createLocationForm = document.getElementById('createLocationForm');


// functions for curving the average customers per hour (average daily total remains roughly the same)
var flat = function(){
  var multipliers = [];
  for(var i = 0; i < hours.length - 1; i++){
    multipliers[i] = 1;
  }
  return multipliers;
};

var simpleCurve = function(){
  var multipliers = [];
  for(var i = 0; i < hours.length - 1; i++){
    var progress = i / (hours.length - 1);
    if(progress <= .5){
      multipliers[i] = progress * 2 + .5;
    }
    else{
      multipliers[i] = 2.5 - progress * 2;
    }
  }
  return multipliers;
};

var steepCurve = function(){
  var multipliers = [];
  for(var i = 0; i < hours.length - 1; i++){
    var progress = i / (hours.length - 1);
    if(progress <= .5){
      multipliers[i] = progress * 3.6 + .1;
    }
    else{
      multipliers[i] = 3.7 - progress * 3.6;
    }
  }
  return multipliers;
};

var mealSpikes = function(){
  var multipliers = [];
  for(var i = 0; i < hours.length - 1; i++){
    var progress = i / (hours.length - 1);
    if((progress >= .4 && progress <= .5) || (progress >= .8 && progress <= .9)){
      multipliers[i] = 2.5;
    }
    else{
      multipliers[i] = .5;
    }
  }
  return multipliers;
};

var activeCurve = flat;

function Restaurant(name, maxCustomersPerHour, minCustomersPerHour, avgCookiesPerCustomer, curve) {
  this.name = name;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.minCustomersPerHour = minCustomersPerHour;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookies = 0;
  this.curve = curve;

  this.render = function(){
    var row = this.createRow();
    var thEl = document.createElement('th');
    thEl.textContent = this.name;
    row.appendChild(thEl);
    this.generateCookiesPerHour();
    for(var i = 0; i < this.cookiesPerHour.length; i++){
      var tdEl = document.createElement('td');
      totals[i] += this.cookiesPerHour[i];
      tdEl.textContent = this.cookiesPerHour[i];
      row.appendChild(tdEl);
    }
  };

  this.createRow = function(){
    var trEl = document.createElement('tr');
    var att = document.createAttribute('id');
    att.value = this.name;
    trEl.setAttributeNode(att);
    restaurantsTable.appendChild(trEl);
    return trEl;
  };

  // this.generateCookiesPerHour = function(){
  //   var multipliers = curve();
  //   for(var i = 0; i < hours.length - 1; i++){
  //     var customersPerHour = Number((multipliers[i]).toFixed(2));
  //     this.customersPerHour.push(customersPerHour);
  //     var cookiesPerHour = customersPerHour;
  //     this.cookiesPerHour.push(cookiesPerHour);
  //     this.totalCookies += cookiesPerHour;
  //   }
  //   this.cookiesPerHour.push(this.totalCookies);
  // };

  this.generateCookiesPerHour = function(){
    this.totalCookies = 0;
    var multipliers = curve();
    for(var i = 0; i < hours.length - 1; i++){
      var customersPerHour = (Math.ceil(Math.random() * (maxCustomersPerHour - minCustomersPerHour)) + minCustomersPerHour) * multipliers[i];
      this.customersPerHour[i] = customersPerHour;
      var cookiesPerHour = Math.ceil(avgCookiesPerCustomer * customersPerHour);
      this.cookiesPerHour[i] = cookiesPerHour;
      this.totalCookies += cookiesPerHour;
    }
    this.cookiesPerHour[hours.length - 1] = this.totalCookies;
  };

  allLocations.push(this);
}

function renderDefaultLocations(){
  clearAllLocations();
  new Restaurant('firstAndPike', 10, 23, 6.3, activeCurve);
  new Restaurant('seaTac', 24, 3, 1.2, activeCurve);
  new Restaurant('seattleCenter', 38, 11, 3.7, activeCurve);
  new Restaurant('capitolHill', 38, 20, 2.3, activeCurve);
  new Restaurant('alki', 16, 2, 4.6, activeCurve);
  renderAllLocations();
}

function clearAllLocations(){
  allLocations = [];
  renderAllLocations();
}

function renderAllLocations(){
  restaurantsTable.innerHTML = '';

  createHeaderRow();
  for(var i = 0; i < allLocations.length; i++){
    allLocations[i].render();
  }
  createFooterRow();
}

function handleLocationSubmit(event){
  event.preventDefault();

  var ableToAdd = true;
  var name = event.target.locationName.value;
  var maxCustomersPerHour = parseInt(event.target.maxCustomersPerHour.value);
  var minCustomersPerHour = parseInt(event .target.minCustomersPerHour.value);
  var avgCookiesPerCustomer = parseInt(event.target.avgCookiesPerCustomer.value);
  var curve;
  switch(event.target.funcDropDownList.value){
  case 'Active Curve':
    curve = activeCurve;
  case 'Shallow Curve':
    curve = simpleCurve;
  case 'Steep Curve':
    curve = steepCurve;
  case 'Meal Spikes':
    curve = mealSpikes;
  case 'No Curve':
    curve = flat;
  default:
    curve = flat;
  }

  if(name === ''){
    alert('You must enter a name of the location');
    ableToAdd = false;
  }

  if(typeof minCustomersPerHour !== 'number'){
    alert('You must enter a valid number for Minimum Customers per Hour.');
    ableToAdd = false;
  }

  if(typeof maxCustomersPerHour !== 'number'){
    alert('You must enter a valid number for Maximum Customers per Hour.');
    ableToAdd = false;
  }

  if(typeof avgCookiesPerCustomer !== 'number'){
    alert('You must enter a valid number for Average Cookies per Customer.');
    ableToAdd = false;
  }

  if(ableToAdd){
    new Restaurant(name, maxCustomersPerHour, minCustomersPerHour, avgCookiesPerCustomer, curve);
  }
  renderAllLocations();
}

function createHeaderRow(){
  var trEl = document.createElement('tr');
  var locationThEl = document.createElement('th');
  locationThEl.textContent = 'Location:';
  trEl.appendChild(locationThEl);
  for(var i = 0; i < hours.length; i++){
    var thEl = document.createElement('th');
    thEl.textContent = hours[i] + ':';
    trEl.appendChild(thEl);
  }
  restaurantsTable.appendChild(trEl);
}

function createFooterRow(){
  var trEl = document.createElement('tr');
  var totalsThEl = document.createElement('th');
  totalsThEl.textContent = 'Totals:';
  trEl.appendChild(totalsThEl);
  for(var i = 0; i < hours.length; i++){
    var tdEl = document.createElement('td');
    tdEl.textContent = totals[i];
    trEl.appendChild(tdEl);
  }
  restaurantsTable.appendChild(trEl);
}

createLocationForm.addEventListener('submit', handleLocationSubmit);

hours.forEach(function(){totals.push(0);});
renderDefaultLocations();
