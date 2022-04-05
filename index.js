const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const page = Math.floor(Math.random(1) * 500)
const API_KEY = '9bdbb779bd25379a72ff666005051a54'
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${page}`
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = `https://api.thetmdb.org/3/search/movie?api_key=${API_KEY}&query=`

getMovies(API_URL)

async function getMovies (url) {
    const res = await fetch(url)
    const data = await res.json()
    
    console.log(data.results);
    showMovies(data.results);
}

function showMovies (movies) {
    main.innerHTML = ''
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <img src="${IMAGE_PATH + poster_path}" 
        alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">9.7</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
                ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value
    
    if (searchTerm === '') {

        getMovies(SEARCH_API + searchTerm)
        search.value = ''
        
    } else {
        window.location.reload()
    }
})