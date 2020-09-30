const base_url = "https://api.jikan.moe/v3";




function searchAnime(event){
    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");
    
    fetch(`${base_url}/search/anime?q=${query}&page=1`)
    .then(res => res.json())
    .then(updateDom)
    .catch(err => console.warn(err.message))
}

function updateDom(data) {

    const searchResults = document.getElementById('search-results');

    
    const animeByCatagories = data.results
        .reduce((acc, anime) => {

            const {type} = anime;
            if(acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;

    }, {});

    searchResults.innerHTML = Object.keys(animeByCatagories).map(key => {
        
        const animesHTML =animeByCatagories[key]
        .sort((a,b)=>a.episodes-b.episodes)
        .map(anime => {
            return `
            <div class="col s12 m7">
                  <div class="card">
                    <div class="card-image">
                      <img src="${anime.image_url}">
                    </div>
                    <div class="card-content">
                    <span class="card-title">${anime.title}</span>
                      <p>${anime.synopsis}</p>
                    </div>
                    <div class="card-action">
                      <a href="${anime.url}">Find out more</a>
                    </div>
                  </div>
                </div>
            `
        }).join("");


        return `
        <section>
             <h3>${key.toUpperCase()}</h3>
             <div class="anime-row">${animesHTML}</div>
        </section>
        `


    }).join("");


        
    }


function pageLoaded(){
 const form = document.getElementById('search_form');
 form.addEventListener("submit", searchAnime);
};


window.addEventListener("load", pageLoaded);