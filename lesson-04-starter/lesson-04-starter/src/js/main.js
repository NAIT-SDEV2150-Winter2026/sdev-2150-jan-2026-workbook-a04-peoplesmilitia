// main.js
import './components/resource-header.js';
import './components/resource-filters.js';
import './components/resource-results.js';
import './components/resource-details.js';

// Sample data for resources
const response = await fetch('http://localhost:3000/resources');
const resultData = response.json();


const resultsComponent = document.querySelector('resource-results');
resultsComponent.results = resultData;

const detailsComponent = document.querySelector('resource-details');
const filterComponent = document.querySelector('resource-filters');

filterComponent.addEventListener('resource-filters-changed', (event) => {
  resultsComponent.filters = event.detail;

  detailsComponent.resource = null;
});