
import './App.css';
import axios from 'axios';
import react, {useState, useEffect} from 'react';

//populates nuMArray with 1-250, every time handleClick() random number in the array becomes randomNum and is removed from numArray
let randomNum;
let numArray = [];
let usedArray = [];
for (let i = 1; i <= 250; i++) {
  numArray.push(i)
}

function App() {

  const [movieObj, setMovieObj] = useState([]);
  const [currentMovie, setMovie] = useState('Your movie suggest will appear here');
  const [movieImgUrl, setMovieImgUrl] = useState('');
  const [movieDirector, setMovieDirector] = useState('');
  const [movieRating, setMovieRating] = useState('');
  const [resStatus, setResStatus] = useState(false);

  const handleClick = () => {

    if (numArray.length) {
      function pickNum() {
        randomNum = (numArray[Math.floor(Math.random() * numArray.length) + 1]);
        let remover = numArray.splice(numArray.indexOf(randomNum), 1);
        usedArray.push(remover)
      }
      pickNum()
    } 
    if (!resStatus){
    axios.get('/movie').then(response => {
      setMovieObj(response.data.items);
      setMovie(response.data.items[randomNum].fullTitle);
      setMovieImgUrl(response.data.items[randomNum].image);
      setMovieDirector(response.data.items[randomNum].crew);
      setMovieRating(`Rating: ${response.data.items[randomNum].imDbRating}`);
      setResStatus(true);
    })
   } else {
    setMovie(movieObj[randomNum].fullTitle);
    setMovieImgUrl(movieObj[randomNum].image);
    setMovieDirector(movieObj[randomNum].crew);
    setMovieRating(`Rating: ${movieObj[randomNum].imDbRating}`);
   }
  }

  return (
    <div className="container">
      <div className="head">
          <h1>
             Click below to generate a movie suggestion
          </h1>
      </div>
      <div className="movie">
          <button onClick={handleClick}>click me</button>
          <p className="api-title">{currentMovie}</p>
          <img className="api-image" width="200px" src={movieImgUrl}/>
          <p className="api-director">{movieDirector}</p>
          <p className="api-rating">{movieRating}</p>
      </div>
  </div>
  );
}

export default App;
