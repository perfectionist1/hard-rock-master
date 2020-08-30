const myForm = document.getElementById('form');
const mySearch = document.getElementById('search');
const result = document.getElementById('result');


const apiURL = 'https://api.lyrics.ovh';

//Search Songs/artist
async function searchSongs(term){
    // fetch(`${apiURL}/suggest/${term}`)
    // .then(res => res.json())
    // .then(data => {
    //     console.log(data);
    // });
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
    //console.log(data);
    showData(data);
}

//Show song and it's details in DOM
function showData(data){
    let outPut = '';

    data = data.data.slice(0, 10);
    data.forEach(song => {
        outPut += `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" data-songTitle="${song.title}" data-artist="${song.artist.name}">Get Lyrics</button>
            
            </div>
        </div>
        `;
    });

    result.innerHTML = `
    <div class="search-result col-md-8 mx-auto py-4">
        ${outPut}
    </div>
    `;

}

//get Lyrics for song
async function getLyrics(artist, songTitle){
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    //console.log(data);
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `
        
                    <h2> <strong> ${artist} </strong>  - ${songTitle} </h2>
                    <span> ${lyrics} </span>               
    `;
}

//Event Listener
myForm.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = mySearch.value.trim();
    //console.log(searchTerm);
    
    if(!searchTerm){
        alert('Please type search term!');
    }else{
        searchSongs(searchTerm);
    }
});

//lyrics button clicked
result.addEventListener('click', e =>{
    //console.log(e.target);
    const clickedElement = e.target;
    if(clickedElement.tagName === 'BUTTON'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songTitle');

        getLyrics(artist, songTitle);
    }
});