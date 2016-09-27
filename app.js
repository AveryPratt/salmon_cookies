'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', 'Total'];

function Restaurant(name, maxCustomersPerHour, minCustomersPerHour, avgCookiesPerCustomer) {
  this.container = document.getElementById(name);
  this.name = name;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.minCustomersPerHour = minCustomersPerHour;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookies = 0;

  this.render = function(){
    this.generateCookiesPerHour();
    for(var i = 0; i < this.cookiesPerHour.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
      this.container.appendChild(liEl);
    }
  };
  this.generateCookiesPerHour = function(){
    for(var i = 0; i < hours.length - 1; i++){
      var customersPerHour = Math.round(Math.random() * (maxCustomersPerHour - minCustomersPerHour)) + minCustomersPerHour;
      this.customersPerHour.push(customersPerHour);
      var cookiesPerHour = Math.round(avgCookiesPerCustomer * customersPerHour);
      this.cookiesPerHour.push(cookiesPerHour);
      this.totalCookies += cookiesPerHour;
    }
    this.cookiesPerHour.push(this.totalCookies);
  };
};

var firstAndPike = new Restaurant('firstAndPike', 65, 23, 6.3);
var seaTac = new Restaurant('seaTac', 24, 3, 1.2);
var seattleCenter = new Restaurant('seattleCenter', 38, 11, 3.7);
var capitolHill = new Restaurant('capitolHill', 38, 20, 2.3);
var alki = new Restaurant('alki', 16, 2, 4.6);

firstAndPike.render();
seaTac.render();
seattleCenter.render();
capitolHill.render();
alki.render();
