import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  let arr1=[];
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  return fetch(config.backendEndpoint+"/cities")
  .then(res=> res.json())
  .catch(err=> {
    new Error(err);
    return null;
  })
  .then(data=>{
    // console.log(data);
    return data});
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let x= document.createElement("div");
  x.className="col-sm-12 col-md-6 col-lg-3 my-4";
  x.innerHTML+=`
   
        <a href="pages/adventures/?city=${id}" id= "${id}">
          <div class="tile">
            <div class="tile-text text-white">
              <h5>${city}</h5>
              <p>${description}</p>
            </div>
            <img src="${image}" alt="${city}" class= "img-responsive">
          </div>
        </a>
      `
 let data= document.getElementById("data");
 data.appendChild(x);

}

export { init, fetchCities, addCityToDOM };
