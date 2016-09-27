'use strict';

var hours = [['6:00am', 0], ['7:00am', 0], ['8:00am', 0], ['9:00am', 0], ['10:00am', 0], ['11:00am', 0], ['12:00am', 0], ['1:00pm', 0], ['2:00pm', 0], ['3:00pm', 0], ['4:00pm', 0], ['5:00pm', 0], ['6:00pm', 0], ['7:00pm', 0], ['8:00pm', 0], ['Total', 0]];

function createHeaderRow(){
  var container = document.getElementById('restaurants');
  var trEl = document.createElement('tr');
  container.appendChild(trEl);
  var locationThEl = document.createElement('th');
  locationThEl.textContent = 'Location:';
  trEl.appendChild(locationThEl);
  for(var i = 0; i < hours.length; i++){
    var thEl = document.createElement('th');
    thEl.textContent = hours[i][0] + ':';
    trEl.appendChild(thEl);
  }
}

function createFooterRow(){
  var container = document.getElementById('restaurants');
  var trEl = document.createElement('tr');
  container.appendChild(trEl);
  var totalsThEl = document.createElement('th');
  totalsThEl.textContent = 'Totals:';
  trEl.appendChild(totalsThEl);
  for(var i = 0; i < hours.length; i++){
    var tdEl = document.createElement('td');
    tdEl.textContent = hours[i][1];
    trEl.appendChild(tdEl);
  }
}

function Restaurant(name, maxCustomersPerHour, minCustomersPerHour, avgCookiesPerCustomer) {
  this.container = document.getElementById('restaurants');
  this.name = name;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.minCustomersPerHour = minCustomersPerHour;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookies = 0;

  this.createRow = function(){
    var trEl = document.createElement('tr');
    var att = document.createAttribute('id');
    att.value = this.name;
    trEl.setAttributeNode(att);
    this.container.appendChild(trEl);
    return trEl;
  };

  this.render = function(){
    var row = this.createRow();
    var thEl = document.createElement('th');
    thEl.textContent = this.name;
    row.appendChild(thEl);
    this.generateCookiesPerHour();
    for(var i = 0; i < this.cookiesPerHour.length; i++){
      var tdEl = document.createElement('td');
      hours[i][1] += this.cookiesPerHour[i];
      tdEl.textContent = this.cookiesPerHour[i];
      row.appendChild(tdEl);
    }
  };
  this.generateCookiesPerHour = function(){
    for(var i = 0; i < hours.length - 1; i++){
      var customersPerHour = Math.ceil(Math.random() * (maxCustomersPerHour - minCustomersPerHour)) + minCustomersPerHour;
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
new Restaurant('firstAndPike', 65, 23, 6.3);
new Restaurant('seaTac', 24, 3, 1.2);
new Restaurant('seattleCenter', 38, 11, 3.7);
new Restaurant('capitolHill', 38, 20, 2.3);
new Restaurant('alki', 16, 2, 4.6);
createFooterRow();
