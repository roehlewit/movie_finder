const search = document.getElementById('search'),
	submit = document.getElementById('submit'),
	nowPlaying = document.getElementById('current-btn'),
	resultsText = document.getElementById('results'),
	movies = document.getElementById('movies');

// Search movies and fetch
function searchMovies(e) {
	e.preventDefault();

	//clear previous

	//get search term
	const term = search.value;

	//check if empty
	if (term.trim()) {
		fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=ab01e4a439e39a54315ecee8554ea570&query=${term}&language=en-US&page=1&include_adult=false`
		)
			.then((res) => res.json())
			.then((data) => {
				resultsText.innerHTML = `<h2>Search Results for ${term}:</h2>`;

				if (data.results === null) {
					resultsText.innerHTML = `<h2>There are no matches</h2>`;
				} else {
					movies.innerHTML = data.results
						.map(
							(result) => `
                    <div class="movie-results">
                        <div class="movie-img">
                        <img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.title}: Photo N/A">
						</div>
						<div class="movie-info">
						 <p>Title: <em>${result.title}</em></p>
						 <p>Release Date: ${result.release_date}</p>
						 <p>Rating: ${result.vote_average} / 10</p>
						 </div>
                    </div>
                    `
						)
						.join('');
				}
			});

		//clear search text
		search.value = '';
	} else {
		alert('Enter a search term');
	}
}

function getNowPlaying(e) {
	fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ab01e4a439e39a54315ecee8554ea570&language=en-US&page=1
	`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			resultsText.innerHTML = `<h2>Now Playing: </h2> `;
			movies.innerHTML = data.results.map(
				(result) =>
					`<div class="movie-results">
				<div class="movie-img">
				<img src="https://image.tmdb.org/t/p/w185${result.poster_path}" alt="${result.title}: Photo N/A">
				</div>
				<div class="movie-info">
				 <p>Title: <em>${result.title}</em></p>
				 <p>Release Date: ${result.release_date}</p>
				 <p>Rating: ${result.vote_average} / 10</p>
				 </div>
			</div>
				`
			).join('');
		});
}

//Event Listener
submit.addEventListener('submit', searchMovies);
nowPlaying.addEventListener('click', getNowPlaying);
