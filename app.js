'use strict';

var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00am', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', 'Total'];
var columnTotals = [];
var allLocations = [];
var restaurantsTable = document.getElementById('restaurantsTable');
var createLocationForm = document.getElementById('createLocationForm');
var currentLocation;

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

// constructors
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
    this.totalCookies = 0;
    var row = this.createRow();
    var thEl = document.createElement('th');
    thEl.textContent = this.name;
    row.appendChild(thEl);
    this.generateCookiesPerHour();
    for(var i = 0; i < this.cookiesPerHour.length; i++){
      var tdEl = document.createElement('td');
      columnTotals[i] += this.cookiesPerHour[i];
      tdEl.textContent = this.cookiesPerHour[i];
      row.appendChild(tdEl);
    }
    var finalTdEl = document.createElement('td');
    var att = document.createAttribute('class');
    att.value = 'finalCell';
    finalTdEl.setAttributeNode(att);
    row.appendChild(finalTdEl);
    this.addEditButton(finalTdEl);
    this.addDeleteButton(finalTdEl);

    this.customersPerHour = [];
    this.cookiesPerHour = [];
  };
  this.addEditButton = function(container){
    var editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    var editIdAtt = document.createAttribute('id');
    editIdAtt.value = this.name + 'Edit';
    editButtonEl.setAttributeNode(editIdAtt);
    var typeAtt = document.createAttribute('type');
    typeAtt.value = 'submit';
    editButtonEl.setAttributeNode(typeAtt);
    var editClass = document.createAttribute('class');
    editClass.value = 'editButton';
    editButtonEl.setAttributeNode(editClass);
    container.appendChild(editButtonEl);
  };
  this.addDeleteButton = function(container){
    var deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    var deleteIdAtt = document.createAttribute('id');
    deleteIdAtt.value = this.name + 'Delete';
    deleteButtonEl.setAttributeNode(deleteIdAtt);
    var typeAtt = document.createAttribute('type');
    typeAtt.value = 'submit';
    deleteButtonEl.setAttributeNode(typeAtt);
    var deleteClass = document.createAttribute('class');
    deleteClass.value = 'deleteButton';
    deleteButtonEl.setAttributeNode(deleteClass);
    container.appendChild(deleteButtonEl);
  };
  this.createRow = function(){
    var trEl = document.createElement('tr');
    var att = document.createAttribute('id');
    att.value = this.name;
    trEl.setAttributeNode(att);
    restaurantsTable.appendChild(trEl);
    return trEl;
  };
  this.generateCookiesPerHour = function(){
    var multipliers = curve();
    for(var i = 0; i < hours.length - 1; i++){
      var customersPerHour = Number((multipliers[i]).toFixed(2));
      this.customersPerHour.push(customersPerHour);
      var cookiesPerHour = customersPerHour;
      this.cookiesPerHour.push(cookiesPerHour);
      this.totalCookies += cookiesPerHour;
    }
    this.cookiesPerHour.push(this.totalCookies);
  };
  // this.generateCookiesPerHour = function(){
  //   this.totalCookies = 0;
  //   var multipliers = curve();
  //   for(var i = 0; i < hours.length - 1; i++){
  //     var customersPerHour = (Math.ceil(Math.random() * (maxCustomersPerHour - minCustomersPerHour)) + minCustomersPerHour) * multipliers[i];
  //     this.customersPerHour[i] = customersPerHour;
  //     var cookiesPerHour = Math.ceil(avgCookiesPerCustomer * customersPerHour);
  //     this.cookiesPerHour[i] = cookiesPerHour;
  //     this.totalCookies += cookiesPerHour;
  //   }
  //   this.cookiesPerHour[hours.length - 1] = this.totalCookies;
  // };
  allLocations.push(this);
}

// functions
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
  var finalThEl = document.createElement('th');
  var att = document.createAttribute('class');
  att.value = 'finalCell';
  finalThEl.setAttributeNode(att);
  trEl.appendChild(finalThEl);
  restaurantsTable.appendChild(trEl);
}
function createFooterRow(){
  var trEl = document.createElement('tr');
  var columnTotalsThEl = document.createElement('th');
  columnTotalsThEl.textContent = 'Totals:';
  trEl.appendChild(columnTotalsThEl);
  for(var i = 0; i < hours.length; i++){
    var tdEl = document.createElement('td');
    tdEl.textContent = columnTotals[i];
    trEl.appendChild(tdEl);
  }
  var finalTdEl = document.createElement('td');
  var att = document.createAttribute('class');
  att.value = 'finalCell';
  finalTdEl.setAttributeNode(att);
  trEl.appendChild(finalTdEl);
  restaurantsTable.appendChild(trEl);
}
function renderDefaultLocations(){
  clearAllLocations();
  new Restaurant('First and Pike', 10, 23, 6.3, activeCurve);
  new Restaurant('SeaTac', 24, 3, 1.2, activeCurve);
  new Restaurant('Seattle Center', 38, 11, 3.7, activeCurve);
  new Restaurant('Capitol Hill', 38, 20, 2.3, activeCurve);
  new Restaurant('Alki', 16, 2, 4.6, activeCurve);
  renderAllLocations();
}
function clearAllLocations(){
  allLocations = [];
  renderAllLocations();
}
function renderAllLocations(){
  for(var i in hours){columnTotals[i] = 0;}
  restaurantsTable.innerHTML = '';

  createHeaderRow();
  for(var i = 0; i < allLocations.length; i++){
    allLocations[i].render();
  }
  createFooterRow();
}

// event handlers
function handleSubmitLocation(event){
  event.preventDefault();

  var legend = document.getElementById('legend');
  var submitButton = document.getElementById('submitButton');

  var ableToAdd = true;
  var name = event.target.locationName.value;
  var maxCustomersPerHour = parseInt(event.target.maxCustomersPerHour.value);
  var minCustomersPerHour = parseInt(event.target.minCustomersPerHour.value);
  var avgCookiesPerCustomer = parseInt(event.target.avgCookiesPerCustomer.value);
  var curve;
  var curveName = event.target.funcDropDownList.value;
  switch(curveName){
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

  var alertMessage = 'Failed to update location.';
  if(name === ''){
    alertMessage += '\nYou must enter a name for the location.';
    ableToAdd = false;
  }
  if(isNaN(minCustomersPerHour)){
    alertMessage += '\nYou must enter a valid number for minimum customers per hour.';
    ableToAdd = false;
  }
  if(maxCustomersPerHour === 'number'){
    alertMessage += '\nYou must enter a valid number for maximum customers per hour.';
    ableToAdd = false;
  }
  if(avgCookiesPerCustomer === 'number'){
    alertMessage += '\nYou must enter a valid number for average cookies per customer.';
    ableToAdd = false;
  }
  if(ableToAdd){
    if(submitButton.textContent === 'Create'){
      new Restaurant(name, maxCustomersPerHour, minCustomersPerHour, avgCookiesPerCustomer, curve);
      console.log(name + ' added.');
    }
    else{
      var previousName = currentLocation.name;
      currentLocation.name = name;
      currentLocation.maxCustomersPerHour = maxCustomersPerHour;
      currentLocation.minCustomersPerHour = minCustomersPerHour;
      currentLocation.avgCookiesPerCustomer = avgCookiesPerCustomer;
      currentLocation.curve = curve;
      console.log(previousName + ' updated to ' + name + '.');
    }
    event.target.locationName.value = '';
    event.target.maxCustomersPerHour.value = '';
    event.target.minCustomersPerHour.value = '';
    event.target.avgCookiesPerCustomer.value = '';
    event.target.funcDropDownList.value = 'Active Curve';
    renderAllLocations();
    console.log('minimum customers per hour: ' + minCustomersPerHour + '\nmaximum customers per hour: ' + maxCustomersPerHour + '\naverage cookies per customer: ' + avgCookiesPerCustomer + '\ncurve type: ' + curveName);
    legend.textContent = 'Add Location';
    submitButton.textContent = 'Create';
  }
  else{
    if(submitButton.textContent === 'Create'){
      console.log('failed to create new location.');
    }
    else{
      console.log(alertMessage);
    }
    alert(alertMessage);
  }
}
function handleTableButtonClick(event){
  event.preventDefault();
  var buttonId = event.target.getAttribute('id');
  // edit button is pressed
  if(event.target.getAttribute('class') === 'editButton'){
    var locationName = buttonId.slice(0, buttonId.length - 4);
    allLocations.forEach(function(loc){if (loc.name === locationName) currentLocation = loc;});
    var legend = document.getElementById('legend');
    var submitButton = document.getElementById('submitButton');
    var nameInput = document.getElementById('locationNameInput');
    var minCustomersPerHourInput =  document.getElementById('minCustomersPerHourInput');
    var maxCustomersPerHourInput =  document.getElementById('maxCustomersPerHourInput');
    var avgCookiesPerCustomerInput =  document.getElementById('avgCookiesPerCustomerInput');
    var funcDropDownList =  document.getElementById('funcDropDownList');
    legend.textContent = 'Edit Location';
    submitButton.textContent = 'Update';
    nameInput.value = currentLocation.name;
    minCustomersPerHourInput.value = currentLocation.minCustomersPerHour;
    maxCustomersPerHourInput.value = currentLocation.maxCustomersPerHour;
    avgCookiesPerCustomerInput.value = currentLocation.avgCookiesPerCustomer;
    switch(currentLocation.curve){
    case activeCurve:
      funcDropDownList.value = 'Active Curve';
    case simpleCurve:
      funcDropDownList.value = 'Simple Curve';
    case steepCurve:
      funcDropDownList.value = 'Steep Curve';
    case mealSpikes:
      funcDropDownList.value = 'Meal Spikes';
    case flat:
      funcDropDownList.value = 'No Curve';
    }
  }
  // delete button is pressed
  else if(event.target.getAttribute('class') === 'deleteButton'){
    locationName = buttonId.slice(0, buttonId.length - 6);
    var rowIndex = allLocations.indexOf(locationName);
    allLocations.splice(rowIndex, 1);
    renderAllLocations();
    console.log(locationName + ' deleted.');
  }
}

// event listeners
createLocationForm.addEventListener('submit', handleSubmitLocation);
restaurantsTable.addEventListener('click', handleTableButtonClick);

renderDefaultLocations();
