'use strict';

var firstAndPikeEl = document.getElementById('firstAndPike');
var seaTacEl = document.getElementById('seaTac');
var seattleCenterEl = document.getElementById('seattleCenter');
var capitolHillEl = document.getElementById('capitolHill');
var alkiEl = document.getElementById('alki');

var firstAndPike = {
  maxCustomersPerHour: 65,
  minCustomersPerHour: 23,
  avgCookiesPerCustomer: 6.3,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],

  populateHTML: function(){
    var arr = this.generateCookiesPerHour();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][2] + ' cookies';
      firstAndPikeEl.appendChild(liEl);
    }
  },
  generateCookiesPerHour: function(){
    var arr = this.generateCustomersPerHour();
    var totalCookies = 0;
    for(var i = 0; i < arr.length; i++){
      var hourlyCookies = Math.round(arr[i][1] * this.avgCookiesPerCustomer);
      arr[i][2] = hourlyCookies;
      totalCookies += hourlyCookies;
    }
    arr[arr.length] = ['Total', 0, totalCookies];
    return arr;
  },
  generateCustomersPerHour: function(){
    var customersPerHour = Array();
    for(var i = 0; i < this.hours.length; i++){
      customersPerHour[i] = [this.hours[i], this.generateRand(this.minCustomersPerHour, this.maxCustomersPerHour)];
    }
    return customersPerHour;
  },
  generateRand: function(min, max){
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
};
var seaTac = {
  maxCustomersPerHour: 24,
  minCustomersPerHour: 3,
  avgCookiesPerCustomer: 1.2,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],

  populateHTML: function(){
    var arr = this.generateCookiesPerHour();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][2] + ' cookies';
      seaTacEl.appendChild(liEl);
    }
  },
  generateCookiesPerHour: function(){
    var arr = this.generateCustomersPerHour();
    var totalCookies = 0;
    for(var i = 0; i < arr.length; i++){
      var hourlyCookies = Math.round(arr[i][1] * this.avgCookiesPerCustomer);
      arr[i][2] = hourlyCookies;
      totalCookies += hourlyCookies;
    }
    arr[arr.length] = ['Total', 0, totalCookies];
    return arr;
  },
  generateCustomersPerHour: function(){
    var customersPerHour = Array();
    for(var i = 0; i < this.hours.length; i++){
      customersPerHour[i] = [this.hours[i], this.generateRand(this.minCustomersPerHour, this.maxCustomersPerHour)];
    }
    return customersPerHour;
  },
  generateRand: function(min, max){
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
};
var seattleCenter = {
  maxCustomersPerHour: 38,
  minCustomersPerHour: 11,
  avgCookiesPerCustomer: 3.7,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],

  populateHTML: function(){
    var arr = this.generateCookiesPerHour();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][2] + ' cookies';
      seattleCenterEl.appendChild(liEl);
    }
  },
  generateCookiesPerHour: function(){
    var arr = this.generateCustomersPerHour();
    var totalCookies = 0;
    for(var i = 0; i < arr.length; i++){
      var hourlyCookies = Math.round(arr[i][1] * this.avgCookiesPerCustomer);
      arr[i][2] = hourlyCookies;
      totalCookies += hourlyCookies;
    }
    arr[arr.length] = ['Total', 0, totalCookies];
    return arr;
  },
  generateCustomersPerHour: function(){
    var customersPerHour = Array();
    for(var i = 0; i < this.hours.length; i++){
      customersPerHour[i] = [this.hours[i], this.generateRand(this.minCustomersPerHour, this.maxCustomersPerHour)];
    }
    return customersPerHour;
  },
  generateRand: function(min, max){
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
};
var capitolHill = {
  maxCustomersPerHour: 38,
  minCustomersPerHour: 20,
  avgCookiesPerCustomer: 2.3,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],

  populateHTML: function(){
    var arr = this.generateCookiesPerHour();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][2] + ' cookies';
      capitolHillEl.appendChild(liEl);
    }
  },
  generateCookiesPerHour: function(){
    var arr = this.generateCustomersPerHour();
    var totalCookies = 0;
    for(var i = 0; i < arr.length; i++){
      var hourlyCookies = Math.round(arr[i][1] * this.avgCookiesPerCustomer);
      arr[i][2] = hourlyCookies;
      totalCookies += hourlyCookies;
    }
    arr[arr.length] = ['Total', 0, totalCookies];
    return arr;
  },
  generateCustomersPerHour: function(){
    var customersPerHour = Array();
    for(var i = 0; i < this.hours.length; i++){
      customersPerHour[i] = [this.hours[i], this.generateRand(this.minCustomersPerHour, this.maxCustomersPerHour)];
    }
    return customersPerHour;
  },
  generateRand: function(min, max){
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
};
var alki = {
  maxCustomersPerHour: 16,
  minCustomersPerHour: 2,
  avgCookiesPerCustomer: 4.6,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],

  populateHTML: function(){
    var arr = this.generateCookiesPerHour();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][2] + ' cookies';
      alkiEl.appendChild(liEl);
    }
  },
  generateCookiesPerHour: function(){
    var arr = this.generateCustomersPerHour();
    var totalCookies = 0;
    for(var i = 0; i < arr.length; i++){
      var hourlyCookies = Math.round(arr[i][1] * this.avgCookiesPerCustomer);
      arr[i][2] = hourlyCookies;
      totalCookies += hourlyCookies;
    }
    arr[arr.length] = ['Total', 0, totalCookies];
    return arr;
  },
  generateCustomersPerHour: function(){
    var customersPerHour = Array();
    for(var i = 0; i < this.hours.length; i++){
      customersPerHour[i] = [this.hours[i], this.generateRand(this.minCustomersPerHour, this.maxCustomersPerHour)];
    }
    return customersPerHour;
  },
  generateRand: function(min, max){
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
};


firstAndPike.populateHTML();
seaTac.populateHTML();
seattleCenter.populateHTML();
capitolHill.populateHTML();
alki.populateHTML();
