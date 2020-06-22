import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import LoadingBar from '../../design/images/loadingBar.gif'
import Modal from '../../components/modal/Modal'
import './Home.css'

export const Home = () => {
    const [starWarsMovies, setStarWarsMovies] = useState([])
    const [loading, setLoading] = useState(true)

    const getMoviesAndStopLoading = (dataResponse) => {
        console.log(dataResponse)
        setStarWarsMovies(dataResponse)
        setLoading(false)
    }

    const getStarWarsMovies = () => {
        Axios.get('https://swapi.dev/api/films')
            .then(function (response) { getMoviesAndStopLoading(response.data.results) })
            .catch(function (error) { console.log(error) })
    }

    useEffect(() => {
        getStarWarsMovies()
    }, [])

    return (
        <div className="homeContainer">
            <div className="movieContainer">
                {
                    loading
                        ? <img className="spinner" src={LoadingBar} alt="" />
                        : starWarsMovies?.map((movies) => (
                            <Modal choosenMovie={movies}>
                                <ul className="movieList" key={movies.title}>
                                    <li>{movies.title}</li>
                                    <li>{movies.release_date}</li>
                                </ul>
                            </Modal>
                        ))
                }
            </div>
        </div >
    )
}
