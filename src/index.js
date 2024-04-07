// Your code here
// // Your code here
// allows link with the db.json file
const db = "http://localhost:3000/films"
// gets the tickets element by id
document.addEventListener("DOMContentLoaded", () => {
    getMovies();
    document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});
// fetchs the films from db.json
function getMovies() {
    fetch(db)
    .then(res => res.json())
    .then(movies => {
        movies.forEach(movie => {renderMovieList(movie)})
        const firstMovie = document.querySelector("#id1");
        firstMovie.dispatchEvent(new Event("click"));
    })
}

function renderMovieList(movie) {
    const li = document.createElement("li");
    li.textContent = `${movie.title}`;
    li.id = "id" + movie.id;
    const ul = document.querySelector("#films");
    ul.appendChild(li);
    li.classList.add("film");
    li.classList.add('item');
    li.addEventListener("click", () => {handleMovieClick(movie)})
}

function handleMovieClick(movie) {
    const poster = document.querySelector("img#poster")
    poster.src = movie.poster;
    poster.alt = movie.title;
    const data = document.querySelector("#showing");
    data.querySelector("#title").textContent = movie.title;
    data.querySelector("#runtime").textContent = movie.runtime+" minutes";
    data.querySelector("#film-").textContent = movie.description;
    data.querySelector("#showtime").textContent = movie.showtime;
    data.querySelector("#ticket-num").textContent = movie.capacity - movie.tickets_sold + " remaining tickets";
}
// calculates the number of tickets remaining
function handleBuyTicket(e) {
    const ticketDiv = document.querySelector("#ticket-num");
    const tickets = ticketDiv.textContent.split(" ")[0];
    if (tickets > 0) {
        ticketDiv.textContent = tickets - 1 + " remaining tickets";
    }
    else if (tickets == 0) {
        alert("No more tickets!");
        e.target.classList.add("sold-out");
        e.target.classList.remove("orange");
    }
}