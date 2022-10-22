import React, {useEffect, useState} from 'react';
import "./Home.scss";
import axios from 'axios';
import {Link} from 'react-router-dom'
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"
 
const apiKey = "0a82f3c2427dc21028d6b6e146d7f176";
const url = "https://api.themoviedb.org/3";
const upcoming = "upcoming";
const imgUrl = "https://image.tmdb.org/t/p/original"
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({img}) => (
    <img className="card" src={img} alt="cover" />
)


const Row = ({title, arr=[]}) => (
    <div className="row">
        <h2>{title}</h2>
        <div>
            {
                arr.map((item, index) => (
                    <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
                ))
            }
            
        </div>
    </div>
)




const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [genre, setGenre] = useState([])

    useEffect (() => {
        const fetchUpcoming = async() => {
            const {data: {results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
            setUpcomingMovies(results);
        };
        const fetchNowPlaying = async() => {
            const {data: {results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
            setNowPlayingMovies(results);
        };
        const fetchPopular = async() => {
            const {data: {results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
            setPopularMovies(results);
        };
        const fetchTopRated = async() => {
            const {data: {results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
            setTopRatedMovies(results);
        };
        const getAllGenre = async() => {
            const {data: {genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
            setGenre(genres);
        };

        fetchUpcoming();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
        getAllGenre();
    }, [])
  return (
    <section className="home">
        <div className="banner" style={{
            backgroundImage : upcomingMovies[2]? `url(${`${imgUrl}/${upcomingMovies[2].poster_path}`})` : "rgb(16,16,16)"
        }}>
            {upcomingMovies[2] && (<h1>{upcomingMovies[2].original_title}</h1>) }
            {upcomingMovies[2] && (<p>{upcomingMovies[2].overview}</p>)}
            <div>
                <button><BiPlay /> Play </button>
                <button>My List <AiOutlinePlus /></button>
            </div>
        </div>


        <Row title={"Upcoming"} arr={upcomingMovies} />
        <Row title={"Now Playing"} arr={nowPlayingMovies} />
        <Row title={"Popular On Netflix"} arr={popularMovies} />
        <Row title={"Top Rated"} arr={topRatedMovies} />
        <div className="genreBox">
            {genre.map((item, index) => (
                <Link key={index} to={`/genre/${item.id}`}>{item.name}</Link>
            ))}
        </div>
        
    </section>
  )
}

export default Home