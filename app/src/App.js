
import './App.css';
import axios from 'axios';
import react, {useState} from 'react';
function App() {

  const [currentMovie, setMovie] = useState('Your movie suggest will appear here');
  const [movieImgUrl, setMovieImgUrl] = useState('');
  const [movieDirector, setMovieDirector] = useState('');
  const [movieRating, setMovieRating] = useState('');

  const randomNum = Math.floor(Math.random() * 249) + 1;

  const handleClick = () => {
    axios.get('/movie').then(response => {
      setMovie(response.data.items[randomNum].fullTitle);
      setMovieImgUrl(response.data.items[randomNum].image);
      setMovieDirector(response.data.items[randomNum].crew);
      setMovieRating(response.data.items[randomNum].imDbRating);
    })
  }

  return (
    <div class="container">
      <div class="head">
          <h1>
             Click below to generate a movie suggestion
          </h1>
      </div>
      <div class="movie">
          <button onClick={handleClick}>click me</button>
          <p class="api-title">{currentMovie}</p>
          <img width="200px" class="api-image" src={movieImgUrl}/>
          <p class="api-director">{movieDirector}</p>
          <p class="api-rating">Rating: {movieRating}</p>
      </div>
  </div>
  );
}

export default App;
