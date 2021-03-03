import React, { useState, useEffect } from 'react'
import { fetchGenre, fetchMovies, fetchMovieByGenre, fetchPersons, fetchTopratedMovies } from '../service'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { ImPlay3, ImFacebook, ImYoutube, ImTwitter, ImInstagram, ImMap, ImMail, ImPhone } from "react-icons/im";
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'


export default function Home() {
    const [nowPlaying, setNowPlaying] = useState([])
    const [genres, setGenres] = useState([])
    const [movieByGenre, setMovieByGenre] = useState([])
    const [person, setPerson] = useState([])
    const [topRated, setTopRated] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            setNowPlaying(await fetchMovies())
            setGenres(await fetchGenre())
            setMovieByGenre(await fetchMovieByGenre(28))
            setPerson(await fetchPersons())
            setTopRated(await fetchTopratedMovies())
        }
        fetchApi()
    }, [])

    const movies = nowPlaying.slice(0, 5).map((item, index) => {
        return <div style={{ height: 'auto', width: 'auto' }} key={index}>
            <div >
                <img src={item.backPoster} alt={item.title} style={{ width: '60vw' }} />
            </div>

            <div className="caption" style={{ textAlign: 'center', fontSize: 35 }}>
                {item.title}
            </div>
        </div>
    })

    const genreList = genres.map((item, index) => {
        return <li className="list-inline-item" key={index}>
            <button type='button' className='btn btn-outline-info' onClick={() => {
                handleGenreClick(item.id)
            }}>
                {item.name}
            </button>
        </li>
    })

    const movieList = movieByGenre.slice(0, 4).map((item, index) => {
        return (
            <div className="col-md-3 col-sm-6" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img src={item.poster} alt={item.title} className='img-fluid' />

                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{ fontWeight: 'bolder' }}>{item.title}</p>
                    <p>Rated: {item.rating}</p>
                    <ReactStars count={item.rating} size={20} color={'#f4c10f'}></ReactStars>
                </div>
            </div>
        )
    })

    const trendingPerson = person.slice(0, 4).map((p, i) => {
        return (
            <div className='col-md-3 text-center' key={i}>
                <img className='img-fluid rounded-circle' src={p.profileImg} alt={p.name} />
                <p className="font-weight-bold text-center">{p.name}</p>
                <p className="font-weight-light text-center" style={{ color: '#5a606b' }}>Trending for {p.known}</p>
            </div>
        )
    })

    const topRatedMovies = topRated.slice(0, 4).map((item, index) => {
        return <div className='col-md-3' key={index}>
            <div className="card">
                <Link to={`/movie/${item.id}`}>
                    <img className='img-fluid' src={item.poster} alt={item.name} />
                </Link>
            </div>
            <div className="mt-3">
                <p style={{ fontWeight: 'bolder' }}>{item.title}</p>
                <p>Reated: {item.rating}</p>
                <ReactStars count={item.rating} size={20} color={'#f4c10f'}></ReactStars>
            </div>
        </div>
    })

    const handleGenreClick = async (genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id))
    }

    return (
        <div className="container">
            <div className="row mt-2">
                <div className="col">
                    <Carousel
                        autoPlay={true}
                        infiniteLoop
                        onClickItem={true}
                        interval={5000}
                        transitionTime={350}
                        showIndicators={false}
                        showArrows={false}
                        showStatus={false}
                    >

                        {movies}
                    </Carousel>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="row mt-3">
                {movieList}
            </div>
            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{ color: '#5a606b' }}>Trending person this week</p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="row">
                {trendingPerson}
            </div>
            <div className="row mt-3" style={{ display: 'flex', justifyContent: 'space-between' }} >
                <div className="col" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ color: '#5a606b' }} className="font-weight-bold">Top rated</p>

                </div>
                <div className="row mt-3">{topRatedMovies}</div>
            </div>
            <hr className='mt-5' style={{ borderTop: '1px solid #5a606b' }}></hr>
            <div className="row mt-3 mb-5">
                <div className="col-md-8 col-sm-6" style={{ color: '#5a606b' }}>
                    <h3>About me</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio, cupiditate.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="/" style={{ color: '#f4c10f' }}>
                                <ImFacebook />
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{ color: '#f4c10f' }}>
                                <ImYoutube />
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{ color: '#f4c10f' }}>
                                <ImTwitter />
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{ color: '#f4c10f' }}>
                                <ImInstagram />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4 col-sm-6" style={{ color: '#5a606b' }}>
                    <h3>Keep in touch</h3>
                    <ul className="list-unstyled">
                        <li>
                            <p>
                                <strong>
                                    <ImMap />  Address:
                                </strong>
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <ImPhone />  Phone:0909876
                                </strong>
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <ImMail />  Email:info@info.com
                                </strong>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
