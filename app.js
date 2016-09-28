'use strict';

var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00am', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', 'Total'];
var totals = [];
for(var i in hours) { totals[i] = 0; }

var simpleCurve = function(){
  var multipliers = [];
  for(var i = 0; i < hours.length - 1; i++){
    var progress = i / (hours.length - 2);
    if(progress <= .5){
      multipliers[i] = progress * 3 + 1;
    }
    else{
      multipliers[i] = 4 - progress * 3;
    }
  }
  return multipliers;
};

var steepCurve = function(){
  var multipliers = [];
  for(var i = 0; i < hours.length - 1; i++){
    var progress = i / (hours.length - 2);
    if(progress <= .5){
      multipliers[i] = progress * 3.9 + .1;
    }
    else{
      multipliers[i] = 4 - progress * 3.9;
    }
  }
  return multipliers;
};

var mealSpikes = function(){
  var multipliers = [];
  for(var i = 0; i < hours.length - 1; i++){
    var progress = i / (hours.length - 2);
    if(progress >= .4 && progress <= .5 || progress >= .8 && progress <= .9){
      multipliers[i] = 5;
    }
    else{
      multipliers[i] = .2;
    }
  }
  return multipliers;
};

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
  //     var customersPerHour = multipliers[i];
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
  this.render();
}

createHeaderRow();
new Restaurant('firstAndPike', 10, 23, 6.3, steepCurve);
new Restaurant('seaTac', 24, 3, 1.2, steepCurve);
new Restaurant('seattleCenter', 38, 11, 3.7, simpleCurve);
new Restaurant('capitolHill', 38, 20, 2.3, mealSpikes);
new Restaurant('alki', 16, 2, 4.6, simpleCurve);
createFooterRow();
