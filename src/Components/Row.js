 import React, { useEffect , useState } from 'react';
 import './Row.css';
 import axios from '../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
 

 const base_url="https://image.tmdb.org/t/p/original/"

 function Row({title , fetchUrl , isLargeRow}) //calling props
  {
      const [movies , setMovies] = useState([]);

      const [trailerUrl, setTrailerUrl] = useState("");
     
      useEffect(() => {
      async function fetchData() {
        const request= await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
      }  fetchData();
      }, [fetchUrl]) //if new movie found use effect call that many times

      /* movie?backdrop_path --> ? is if movie not there error not shown
       */ 


      /*if using utube then we need to give video id */
      const opts ={
          height:"390",
          widht:"100%",
          playerVars:{
              autoplay:1,
          },
      }

      const handleClick = (movie) => {
          if(trailerUrl){
              setTrailerUrl("");
          }
          else{
              movieTrailer(movie.name || "")
              .then(url => {
                  const urlParams =new URLSearchParams(new URL(url).search)
                  setTrailerUrl(urlParams.get('v'));
              }).catch(error => console.log(error))
          }
      };

     return (
         <div className="row">
             
             <h2>
                 {title}
             </h2>

            <div className="row__posters">
                
                {movies.map(movie => (
                    <img 
                    
                    key={movie.id}
                   onClick={()=> handleClick(movie)} /*calling movie */ 
                    className={`row__poster && ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}
                    /> 
                ))
                }

            </div>
          {trailerUrl &&  <YouTube 
            videoId={trailerUrl}
            opts={opts} 
            />}
         </div>
     )
 }
 
 export default Row;