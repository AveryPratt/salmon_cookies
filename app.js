'use strict';

var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00am', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', 'Total'];
var totals = [];
var allLocations = [];

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

new Restaurant('firstAndPike', 10, 23, 6.3, activeCurve);
new Restaurant('seaTac', 24, 3, 1.2, activeCurve);
new Restaurant('seattleCenter', 38, 11, 3.7, activeCurve);
new Restaurant('capitolHill', 38, 20, 2.3, activeCurve);
new Restaurant('alki', 16, 2, 4.6, activeCurve);

function Restaurant(name, maxCustomersPerHour, minCustomersPerHour, avgCookiesPerCustomer, curve) {
  this.container = document.getElementById('restaurants');
  this.name = name;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.minCustomersPerHour = minCustomersPerHour;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookies = 0;
  this.curve = curve;
  allLocations.push(this);

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
    this.container.appendChild(trEl);
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
    var multipliers = curve();
    for(var i = 0; i < hours.length - 1; i++){
      var customersPerHour = (Math.ceil(Math.random() * (maxCustomersPerHour - minCustomersPerHour)) + minCustomersPerHour) * multipliers[i];
      this.customersPerHour.push(customersPerHour);
      var cookiesPerHour = Math.ceil(avgCookiesPerCustomer * customersPerHour);
      this.cookiesPerHour.push(cookiesPerHour);
      this.totalCookies += cookiesPerHour;
    }
    this.cookiesPerHour.push(this.totalCookies);
  };
}

function createHeaderRow(){
  var container = document.getElementById('restaurants');
  var trEl = document.createElement('tr');
  var locationThEl = document.createElement('th');
  locationThEl.textContent = 'Location:';
  trEl.appendChild(locationThEl);
  for(var i = 0; i < hours.length; i++){
    var thEl = document.createElement('th');
    thEl.textContent = hours[i] + ':';
    trEl.appendChild(thEl);
  }
  container.appendChild(trEl);
}

function createFooterRow(){
  var container = document.getElementById('restaurants');
  var trEl = document.createElement('tr');
  container.appendChild(trEl);
  var thEl = document.createElement('th');
  thEl.textContent = 'Totals:';
  trEl.appendChild(thEl);
  for(var i = 0; i < hours.length; i++){
    var tdEl = document.createElement('td');
    tdEl.textContent = totals[i];
    trEl.appendChild(tdEl);
  }
}

hours.forEach(function(){totals.push(0);});
createHeaderRow();
for(var i = 0; i < allLocations.length; i++){
  allLocations[i].render();
}
createFooterRow();
