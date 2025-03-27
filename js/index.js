
document.addEventListener("DOMContentLoaded", () => {
    const musicContainer = document.getElementById("music-container");
    const nowPlaying = document.getElementById("now-playing");
    const nowPlayingImg = document.getElementById("now-playing-img");
    const nowPlayingTitle = document.getElementById("now-playing-title");
    const nowPlayingArtist = document.getElementById("now-playing-artist");
    const audioPlayer = new Audio(); 

    const searchInput = document.getElementById("search-input");
    const genreFilter = document.getElementById("genre-filter");

    let allSongs = [];

    
    fetch("http://localhost:3000/musics")
        .then(response => response.json())
        .then(data => {
            allSongs = data;
            displaySongs(data);
        })
        .catch(error => console.error("Error fetching songs:", error));


    function displaySongs(songs) {
        musicContainer.innerHTML = "";
        songs.forEach(song => {
            const songDiv = document.createElement("div");
            songDiv.classList.add("music-item");

            songDiv.innerHTML = `
                <img src="${song.image}" class="music-image" alt="${song.title}">
                <h4>${song.title}</h4>
                <p>Artist: ${song.artist}</p>
            `;

    
            songDiv.addEventListener("click", () => {
                nowPlayingImg.src = song.image;
                nowPlayingTitle.textContent = song.title;
                nowPlayingArtist.textContent = `Artist: ${song.artist}`;
                audioPlayer.src = `audio/${song.title}`; 
                audioPlayer.play();
            });

            musicContainer.appendChild(songDiv);
        });
    }

    
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();
        const filteredSongs = allSongs.filter(song =>
            song.title.toLowerCase().includes(searchValue) ||
            song.artist.toLowerCase().includes(searchValue)
        );
        displaySongs(filteredSongs);
    });

    genreFilter.addEventListener("change", () => {
        const selectedGenre = genreFilter.value;
        const filteredSongs = selectedGenre === "All"
            ? allSongs
            : allSongs.filter(song => song.genre.includes(selectedGenre));
        displaySongs(filteredSongs);
    });
});







