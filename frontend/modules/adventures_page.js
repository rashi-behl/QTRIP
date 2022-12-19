
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.substring(search.lastIndexOf('=') + 1);

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {

    let res = await fetch(config.backendEndpoint + "/adventures?city=" + city)
      .then(res => res.json())
      .then(data => {
        return data;
      });

    return res;
  }
  catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    //addCityToDOM(key.id, key.city, key.description, key.image);
    let x = document.createElement("div");

    x.className = "col-sm-12 col-md-6 col-lg-3 my-4";
    x.innerHTML += `
    <a id="${key.id}" href="detail/?adventure=${key.id}">       
          <div class="activity-card">
          <img  src="${key.image}" alt="${key.name}" class= "activity-card img img-fluid img-responsive">
            <div class="category-banner">
            ${key.category}
            </div>
           <div class="own">

              <h5>${key.name}</h5>
              <p>₹ ${key.costPerHead}</p>
         </div>
         <div class="own">
            <h5>Duration</h5>
              <p>${key.duration} Hours</p>
              </div>
          </div>
        </a>
      `
    let data = document.getElementById("data");
    data.appendChild(x);

  });
}



//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {

  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = [];
  list.filter(x => {
    if (x.duration >= low && x.duration <= high) {
      filteredList.push(x);
    }
  });
  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];
  categoryList.map((category) => {
    list.map((key) => {
      if (key.category === category) {
        filteredList.push(key);
      }
    });
  });

  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = [];

  // 3. Filter by duration and category together
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  // 2. Filter by duration only
  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  // 1. Filter by category only
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }

  // default case when there is no filter
  else {
    filteredList = list;
  }
  return filteredList;

  // Place holder for functionality to work in the Stubs
  //return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  console.log(filters);
  if (filters.category) {
    filters.category.forEach(x => {
      let parentDiv = document.getElementById("category-list");
      let ele = document.createElement('div');
      ele.setAttribute("id","category-list");
      ele.setAttribute("class","category-filter");
      ele.textContent=x;
      parentDiv.appendChild(ele);

    });
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
