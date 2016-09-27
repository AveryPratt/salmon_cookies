'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var firstAndPike = {
  container: document.getElementById('firstAndPike'),
  maxCustomersPerHour: 65,
  minCustomersPerHour: 23,
  avgCookiesPerCustomer: 6.3,

  render: function(){
    var arr = this.assembleArray();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][1] + ' cookies';
      this.container.appendChild(liEl);
    }
  },
  assembleArray: function(){
    var totalCookies = 0;
    var arr = [];
    for(var i = 0; i < hours.length; i++){
      arr[i] = this.generateCookiesPerHour(this.generateCustomersPerHour(i));
      totalCookies += arr[i][1];
    }
    arr.push(['Total', totalCookies]);
    return arr;
  },
  generateCookiesPerHour: function(arr){
    arr[1] = Math.round(arr[1] * this.avgCookiesPerCustomer);
    return arr;
  },
  generateCustomersPerHour: function(i){
    return [hours[i], Math.round(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour)) + this.minCustomersPerHour];
  }
};

var seaTac = {
  container: document.getElementById('seaTac'),
  maxCustomersPerHour: 24,
  minCustomersPerHour: 3,
  avgCookiesPerCustomer: 1.2,
  totalCookies: 0,

  render: function(){
    var arr = this.assembleArray();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][1] + ' cookies';
      this.container.appendChild(liEl);
    }
  },
  assembleArray: function(){
    var totalCookies = 0;
    var arr = [];
    for(var i = 0; i < hours.length; i++){
      arr[i] = this.generateCookiesPerHour(this.generateCustomersPerHour(i));
      totalCookies += arr[i][1];
    }
    arr.push(['Total', totalCookies]);
    return arr;
  },
  generateCookiesPerHour: function(arr){
    arr[1] = Math.round(arr[1] * this.avgCookiesPerCustomer);
    return arr;
  },
  generateCustomersPerHour: function(i){
    return [hours[i], Math.round(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour)) + this.minCustomersPerHour];
  }
};

var seattleCenter = {
  container: document.getElementById('seattleCenter'),
  maxCustomersPerHour: 38,
  minCustomersPerHour: 11,
  avgCookiesPerCustomer: 3.7,
  totalCookies: 0,

  render: function(){
    var arr = this.assembleArray();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][1] + ' cookies';
      this.container.appendChild(liEl);
    }
  },
  assembleArray: function(){
    var totalCookies = 0;
    var arr = [];
    for(var i = 0; i < hours.length; i++){
      arr[i] = this.generateCookiesPerHour(this.generateCustomersPerHour(i));
      totalCookies += arr[i][1];
    }
    arr.push(['Total', totalCookies]);
    return arr;
  },
  generateCookiesPerHour: function(arr){
    arr[1] = Math.round(arr[1] * this.avgCookiesPerCustomer);
    return arr;
  },
  generateCustomersPerHour: function(i){
    return [hours[i], Math.round(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour)) + this.minCustomersPerHour];
  }
};

var capitolHill = {
  container: document.getElementById('capitolHill'),
  maxCustomersPerHour: 38,
  minCustomersPerHour: 20,
  avgCookiesPerCustomer: 2.3,
  totalCookies: 0,

  render: function(){
    var arr = this.assembleArray();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][1] + ' cookies';
      this.container.appendChild(liEl);
    }
  },
  assembleArray: function(){
    var totalCookies = 0;
    var arr = [];
    for(var i = 0; i < hours.length; i++){
      arr[i] = this.generateCookiesPerHour(this.generateCustomersPerHour(i));
      totalCookies += arr[i][1];
    }
    arr.push(['Total', totalCookies]);
    return arr;
  },
  generateCookiesPerHour: function(arr){
    arr[1] = Math.round(arr[1] * this.avgCookiesPerCustomer);
    return arr;
  },
  generateCustomersPerHour: function(i){
    return [hours[i], Math.round(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour)) + this.minCustomersPerHour];
  }
};

var alki = {
  container: document.getElementById('alki'),
  maxCustomersPerHour: 16,
  minCustomersPerHour: 2,
  avgCookiesPerCustomer: 4.6,
  totalCookies: 0,

  render: function(){
    var arr = this.assembleArray();
    for(var i = 0; i < arr.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = arr[i][0] + ': ' + arr[i][1] + ' cookies';
      this.container.appendChild(liEl);
    }
  },
  assembleArray: function(){
    var totalCookies = 0;
    var arr = [];
    for(var i = 0; i < hours.length; i++){
      arr[i] = this.generateCookiesPerHour(this.generateCustomersPerHour(i));
      totalCookies += arr[i][1];
    }
    arr.push(['Total', totalCookies]);
    return arr;
  },
  generateCookiesPerHour: function(arr){
    arr[1] = Math.round(arr[1] * this.avgCookiesPerCustomer);
    return arr;
  },
  generateCustomersPerHour: function(i){
    return [hours[i], Math.round(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour)) + this.minCustomersPerHour];
  }
};

firstAndPike.render();
seaTac.render();
seattleCenter.render();
capitolHill.render();
alki.render();
