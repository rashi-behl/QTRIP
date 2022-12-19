import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search.substring(search.lastIndexOf("=") + 1));
  return search.substring(search.lastIndexOf("=") + 1);

  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try {
    let res = await fetch(
      config.backendEndpoint +
        "/adventures/detail?adventure=" +
        adventureId
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    console.log(res);
    return res;
  } catch (err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let x = document.getElementById("adventure-name");
  x.innerHTML = adventure.name;
  let y = document.getElementById("adventure-subtitle");
  y.innerHTML = adventure.subtitle;
  let z = document.getElementById("photo-gallery");
  adventure.images.forEach((element) => {
    let imgdiv = document.createElement("img");
    imgdiv.setAttribute("class", "activity-card-image");
    imgdiv.setAttribute("src", element);
    z.appendChild(imgdiv);
  });
  let advcont=document.getElementById("adventure-content");
  advcont.innerHTML=adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photo=document.getElementById("photo-gallery");
  photo.innerHTML="";
  photo.innerHTML+=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="innerCarousel">
   
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;


let z= document.getElementById("innerCarousel");

images.forEach((element,index) => {
  let x =document.createElement("div");
  x.setAttribute("class","carousel-item");
  if(index==0){
    x.classList.add("active");
  }
  let y = document.createElement("img");
  y.setAttribute("src",element);
  y.setAttribute("class","d-block w-100");
  y.style.height = '400px';
  x.appendChild(y);
  z.appendChild(x);
});

//document.getElementsByClassName('carousel-item')[0].classList.add('active');
// let firstChild=document.getElementsByClassName("carousel-item")[0];
// firstChild.classList.add("active");

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    let x= document.getElementById("reservation-person-cost");
    x.innerHTML=adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let rcost = document.getElementById("reservation-cost");
  rcost.innerHTML=adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");
  form.addEventListener("submit",async (event)=>{
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";

    let formElem = form.elements;

    let bodyString = JSON.stringify({
      name:formElem["name"].value,
      date:formElem["date"].value,
      person:formElem["person"].value,
      adventure:adventure.id

    });
    try{
      let res = await fetch(url,{
        method: "POST",
        body: bodyString,
        headers:{
          "Content-Type": "application/json",
        },
      });
      debugger;
      if (res.ok){
        alert("Success!");
        window.location.reload();
      }else{
        let data= await res.json();
        alert(`Failed - ${data.message}`);
      }
    }catch (err){
      console.log(err);
      alert("Failed - fetch call resulted in error");
    }

  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  } else{
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
