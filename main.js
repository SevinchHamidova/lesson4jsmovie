const elSearchForm = document.querySelector(".js-search-movie");
const elSearchInput = elSearchForm.querySelector(".js-search-movie-title");
const elMovieList = document.querySelector(".js-movie-list");
const elMovieItemTemplate = document.querySelector(".js-movie-item-template").content;
console.log(elSearchForm);


function hourMin(runtime) {
  const hour = Math.floor(runtime / 60);
  const minuts = Math.floor(runtime % 60);
  return `${hour} hrs ${minuts} min`;
}

function myRenderMovies(moviesList, node){
    const moviesFragment = document.createDocumentFragment();
    node.innerHTML = "";
    moviesList.forEach(function(kino){
      const moviesItemClone =  elMovieItemTemplate.cloneNode(true);

      moviesItemClone.querySelector(".movie-img").src = `http://i3.ytimg.com/vi/${kino.ytid}/mqdefault.jpg`;
      moviesItemClone.querySelector(".movie-img").alt = kino.Title;
      moviesItemClone.querySelector(".movie-title").textContent = kino.Title;
      moviesItemClone.querySelector(".movie-list-rating").textContent = kino.imdb_rating;
      moviesItemClone.querySelector(".movie-list-year").textContent = kino.movie_year;
      moviesItemClone.querySelector(".movie-list-time").setAttribute("datetime", `${kino.movie_year}-02-13`);
      moviesItemClone.querySelector(".movie-list-time").textContent = hourMin(kino.runtime);
      moviesItemClone.querySelector(".movie-about-title").textContent = kino.Categories.replaceAll("|", ", ");
      moviesItemClone.querySelector(".info-btn").dataset.imdbId = kino.imdb_id;
      moviesFragment.appendChild(moviesItemClone);
      

    })
    node.appendChild(moviesFragment);
}


myRenderMovies(movies.slice(5, 41), elMovieList);

const elModal = document.querySelector(".js-modal");
const elModalTitle = elModal.querySelector(".modal-title");
const elModalIframe = elModal.querySelector(".js-movie-image");
const elModalImDbRating = elModal.querySelector(".modal-movie-list-rating");
const elModalMovieYear = elModal.querySelector(".modal-movie-list-year");
const elModalRuntime = elModal.querySelector(".modal-movie-list-time");
const elModalCategories = elModal.querySelector(".modal-movie-about-title");
const elModalImDbLink = elModal.querySelector(".modal-link-imdb");


function modalRender(modalMovise){
  
    elModalTitle.textContent = modalMovise.Title;
    elModalIframe.src = `https://www.youtube-nocookie.com/embed/${modalMovise.ytid}`;
    elModalImDbRating.textContent = modalMovise.imdb_rating;
    elModalMovieYear.textContent = modalMovise.movie_year;
    elModalRuntime.textContent = hourMin(modalMovise.runtime);;
    elModalCategories.textContent = modalMovise.Categories.replaceAll("|", ", ");
    // elModalSummary.textContent = modalMovide.summary;
    elModalImDbLink.href =  `https://www.imdb.com/title/${modalMovise.imdb_id}`;
}

// elMovieList.addEventListener("click", function(evt) {
    
//   if(evt.target.matches(".info-btn")) {
      
//       const btnImdbId = evt.target.dataset.imdbId;
      
//       movies.find(function(item) {
//           if(item.imdb_id === btnImdbId) {
//             modalRender(item);
//               elModal.classList.remove("non-active")
//           }
//       })
//   }
  
  
// });


elMovieList.addEventListener("click", function(evt){
  if(evt.target.matches(".info-btn")){
    const btnImDbId = evt.target.dataset.imdbId;
    movies.find(function(item) {
      if(item.imdb_id === btnImDbId){
        modalRender(item);
      }
    });
  }
});

elModal.addEventListener("hide.bs.modal" , function(){
  elModalIframe.src = "";
});


