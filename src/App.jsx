import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
import './App.css'
import Search from './Component/Search'
import Spinner from './Component/Spinner'
import MovieCard from './Component/MovieCard'
import { updateSearch, trandingMovie } from './appwrite.js'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTION = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
function App() {
  const [searchParam, setSearchParam] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState([])
  const [loading, setLoading] = useState(false);
  const [debounceSearch, setDebounceSearch] = useState('')

  useDebounce(() => {
    setDebounceSearch(searchParam);
  }, 500, [searchParam]);

  const fetchMovie = async (query = "") =>{
    setLoading(true);
    setErrorMessage('')
    
    try{
      const endPoint = query ? 
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endPoint, API_OPTION);
      
      if(!response.ok){
        throw new Error('Failed to fetch movies')
      }
      const data = await response.json()
      if(data.Response === 'false'){
        setErrorMessage(data.Error || 'No movies found')
        setMovieList([])
        return;
      }
      setMovieList(data.results || [])
      if(query && data.results.length > 0){
       await updateSearch(query, data.results[0])
      }
    }catch(error){
      console.error(error)
      setErrorMessage('Error message displaying use something else')
    }finally{
      setLoading(false);
      
    }
  }

  const loadTrendingMovie = async() =>{
       try{
           const movies = await trandingMovie();
           setTrendingMovie(movies)
       }catch(error){
        console.log('Error fetching trending movies:', error);
       }   
       }
      
  useEffect(() => {
    loadTrendingMovie();
  },[])
  useEffect(() => {
    fetchMovie(debounceSearch)
  },[debounceSearch])

  return (
   <main>
    <div>
      <div>
        <header>
          <img src='./hero-img.png'  alt='Hero Banner'/>
          <h1>Find <span className='text-gradient'>Movies</span> With Out The Hassle</h1>
          <Search searchParam={searchParam} setSearchParam={setSearchParam}/>
        </header>
        {loadTrendingMovie.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovie.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                  <h3>{movie.title}</h3>

                </li>
                ))}
            </ul>
          </section>
        )}
          <section className='all-movies'>
            <h2 className='all-movies'>All Movies</h2>
            {loading ? (
              <Spinner />): errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
              ) : (
                <ul>
                  {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
              )
            }
          </section>
      </div>
    </div>
   </main>
  )
}

export default App
