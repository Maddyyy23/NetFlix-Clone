import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../axios';
import requests from '../request';

function Banner() {

    const [movie , setMovie] = useState([]);
    
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals); /* first line of images in row*/
            //random movie function 
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length-1)]
            );
            return request;
        }fetchData();
    }, [])

        function truncate(str , n){
            var st=" "+str;
            return st.length > n ? st.substr(0, n-1)+ "..." :st;
        };

    return (
      
            <header className="banner"
            style={{
                backgroundSize:"cover", /* cover image*/
                backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")` ,
                backgroundPosition: "center-center"
            }}
            >{/*image needed in backgr.. so write in header*/ }
            {/* 1.header(name)*/  }
            
            { /* 2.banner content */} 
            <div className="banner__contents">

    <h1 className="banner__title">
        {movie.title || movie.name || movie.original_name}
    </h1>
    <div className="banner__buttons">

        <button className="banner__button">
        Play
        </button>
        <button className="banner__button">
        My List 
        </button>

    </div>

                <h1 className="banner__description">{truncate(movie.overview, 150)}</h1>
            
               

            </div>

            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner;