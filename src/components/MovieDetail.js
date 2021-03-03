import React,{useState,useEffect} from 'react'
import { fetchCasts, fetchMovieDetail, fetchMovieVideos, fetchSimilarMovie } from '../service';
import { ImPlay3, ImFacebook, ImYoutube, ImTwitter, ImInstagram, ImMap, ImMail, ImPhone } from "react-icons/im";
import {Modal} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import ReactStars from 'react-rating-stars-component'

export default function MovieDetail({match}) {
    let params=match.params;
    let genres=[]
    const [detail,setDetails]=useState([])
    const [isOpen,setIsOpen]=useState(false)
    const [video,setVideo]=useState([])
    const [cast,setCast]=useState([])
    const [similarMovies,setSimilarMovies]=useState([])

    useEffect(() => {
       const fetchApi =async()=>{
           setDetails(await fetchMovieDetail(params.id))
           setVideo(await fetchMovieVideos(params.id))
           setCast(await fetchCasts(params.id))
           setSimilarMovies(await fetchSimilarMovie(params.id))
       }
       
       fetchApi()
    }, [params.id])
    genres=detail.genres
    

    const MoviePlayerModal=(props)=>{
        const youtubeUrl='https://www.youtube.com/watch?v='
        return(
            <Modal 
            {...props}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter' style={{color:'#000000', fontWeight:'bolder'}}>
                        {detail.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#000000'}}>
                    <ReactPlayer
                    className='container-fluid'
                    url={youtubeUrl+video.key}
                    playing
                    width='100%'
                    volume='0.1'
                    ></ReactPlayer>
                </Modal.Body>
            </Modal>
        )
    }

    let genresList;
    if(genres){
        genresList = genres.map((g, i) => {
            return (
                <li className="list-inline-item">
                    <button type='button' className="btn btn-outline-info">
                        {g.name}
                    </button>
                </li>
            )
        })
    }
    
    const castList=cast.slice(0, 4).map((c,i)=>{
        return <div className="col-md-3 text-center">
            <img src={c.img} alt={c.name} className='img-fluid rounded-circle mx-auto d-block'/>
            <p className="font-weight-bold text-center">{c.name}</p>
            <p className="font-weight-light text-center" style={{color:'#5a606b'}}>{c.character}</p>
        </div>
    })
    const similarMoviesList = similarMovies.slice(0, 4).map((item, index) => {
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

    return (
        <div className="container">
            <div className="row mt-2">
                <MoviePlayerModal show={isOpen} onHide={()=>{setIsOpen(false)}}></MoviePlayerModal>
                <div className="col text-center detail" style={{widht:'100%'}}>
                    <img className='img-fluid' src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`} alt={detail.title}/> 
                    <div className="carousel-center" onClick={() => setIsOpen(true)}>
                        <ImPlay3 style={{ fontSize: 95, color: '#f4c10f', }}/>
                    </div> 
                    <div className="carousel-caption" style={{textAlign:'center',fontSize:35}}>
                      {detail.title}
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <p style={{color:'#5a606b', fontWeight:'bolder'}}>Genre</p>

                </div>
            </div>
                <div className="row mt-3">
                    <div className="col">
                        <ul className="list-inline">
                            {genresList}
                        </ul>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="text-center">
                            <ReactStars
                            count={detail.vote_average}
                            size={20}
                            color={'#f4c10f'}>
                            </ReactStars>
                        </div>
                        <div className="mt-3" style={{color:'#5a606b', fontWeight:'bold'}}>
                            <p>Overwiev </p>
                        {detail.overview}
                        </div>
                        <div className="row mt-3" >
                            <div className="col-md-3">
                                <p style={{ color: '#5a606b', fontWeight: 'bold' }}>Release Date </p>
                                <p style={{ color: '#5a606b', fontWeight: 'bold' }}>{detail.release_date}</p>
                            </div>                        
                            <div className="col-md-3">
                                <p style={{ color: '#5a606b', fontWeight: 'bold' }}>Run Time </p>
                                <p style={{ color: '#5a606b', fontWeight: 'bold' }}>{detail.runtime} min</p>
                            </div>                        
                            <div className="col-md-3">
                                <p style={{ color: '#5a606b', fontWeight: 'bold' }}>Budget</p>
                                <p style={{ color: '#5a606b', fontWeight: 'bold' }}>{detail.budget}</p>
                            </div>                        
                            <div className="col-md-3">
                                <p style={{ color: '#5a606b', fontWeight: 'bold' }}>Homepage </p>
                                <p style={{ color: '#5a606b', fontWeight: 'bold' }}>{detail.homepage}</p>
                            </div>                        
                        </div>
                        <div className="row mt-3" >
                            <div className="col">
                            <p style={{ color: '#5a606b', fontWeight: 'bold' }}>Cast </p>
                            </div>
                            
                        </div>
                        <div className="row mt-3" >
                        {castList}
                        </div>
                        <div className="row mt-3" >
                            <div className="col">
                            <p style={{ color: '#5a606b', fontWeight: 'bold' }}>Similar Movies </p>
                            </div>                          
                        </div>
                       <div className="row mt-3">
                        {similarMoviesList}
                       </div>
                    </div>
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
