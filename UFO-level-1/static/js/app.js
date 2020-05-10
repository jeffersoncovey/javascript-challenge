// from data.js
var tableData = data;

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");

// Get a reference to the table body
var tbody = d3.select("tbody");

var paragraph = d3.select("#no-data-filter");

// Create event handlers 
button.on("click", runFilter);
form.on("submit", runFilter);

function runFilter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    
    // Select the input element and get the raw HTML node
    var dateInput = d3.select("#datetime");
    var cityInput = d3.select("#city");
    var stateInput = d3.select("#state");
    var countryInput = d3.select("#country");
    var shapeInput = d3.select("#shape");

    // Get the value property of the input element
    var dateValue = dateInput.property("value");
    var cityValue = cityInput.property("value").toLowerCase();
    var stateValue = stateInput.property("value").toLowerCase();
    var countryValue = countryInput.property("value").toLowerCase();
    var shapeValue = shapeInput.property("value").toLowerCase();
      
    // Initialize filtered data variable;
    var filteredData = tableData;

    // Filters data
    if (dateValue != "") {
      filteredData = filteredData.filter(ufo => ufo.datetime === dateValue)
    };
    if (cityValue != "") {
      filteredData = filteredData.filter(ufo => ufo.city === cityValue)
    };
    if (stateValue != "") {
      filteredData = filteredData.filter(ufo => ufo.state === stateValue)
    };
    if (countryValue != "") {
      filteredData = filteredData.filter(ufo => ufo.country === countryValue)
    };
    if (shapeValue != "") {
      filteredData = filteredData.filter(ufo => ufo.shape === shapeValue)
    };
 
    // Clears table between each submission
    document.getElementById("body").innerHTML="";

    // Displays message if no data is available or generates table based on above filters.
    if (filteredData.length === 0){
      paragraph.text("There is no data for the filters you have selected, please try again.");
    } else {
      paragraph.text("");
      filteredData.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });
    }
  };