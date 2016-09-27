'use strict';

var firstAndPike = {
  container: document.getElementById('firstAndPike'),
  maxCustomersPerHour: 65,
  minCustomersPerHour: 23,
  avgCookiesPerCustomer: 6.3,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],

  render: function(){
    var arr = this.generateCookiesPerHour();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][2] + ' cookies';
      this.container.appendChild(liEl);
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
    return Math.round(Math.random() * (max - min)) + min;
  }
};
var seaTac = {
  container: document.getElementById('seaTac'),
  maxCustomersPerHour: 24,
  minCustomersPerHour: 3,
  avgCookiesPerCustomer: 1.2,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],

  render: function(){
    var arr = this.generateCookiesPerHour();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][2] + ' cookies';
      this.container.appendChild(liEl);
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
    return Math.round(Math.random() * (max - min)) + min;
  }
};
var seattleCenter = {
  container: document.getElementById('seattleCenter'),
  maxCustomersPerHour: 38,
  minCustomersPerHour: 11,
  avgCookiesPerCustomer: 3.7,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],

  render: function(){
    var arr = this.generateCookiesPerHour();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][2] + ' cookies';
      this.container.appendChild(liEl);
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
    return Math.round(Math.random() * (max - min)) + min;
  }
};
var capitolHill = {
  container: document.getElementById('capitolHill'),
  maxCustomersPerHour: 38,
  minCustomersPerHour: 20,
  avgCookiesPerCustomer: 2.3,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],

  render: function(){
    var arr = this.generateCookiesPerHour();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][2] + ' cookies';
      this.container.appendChild(liEl);
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
    return Math.round(Math.random() * (max - min)) + min;
  }
};
var alki = {
  container: document.getElementById('alki'),
  maxCustomersPerHour: 16,
  minCustomersPerHour: 2,
  avgCookiesPerCustomer: 4.6,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],

  render: function(){
    var arr = this.generateCookiesPerHour();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][2] + ' cookies';
      this.container.appendChild(liEl);
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
    return Math.round(Math.random() * (max - min)) + min;
  }
};

firstAndPike.render();
seaTac.render();
seattleCenter.render();
capitolHill.render();
alki.render();
