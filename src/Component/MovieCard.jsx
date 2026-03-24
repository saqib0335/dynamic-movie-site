import { useNavigate } from "react-router-dom";

const MovieCard = ({movie : 
    {
        title,
        poster_path,
        vote_average,
        release_date,
        original_language
        }
}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        // Navigate to the movie details page with the movie ID as a parameter actors name related to the movie and movie name
        navigate(`/movie/${title}`, { state: { title, poster_path, vote_average, release_date, original_language } });
    }

  return (

    <div className='movie-card content-center justify-center hover:cursor-pointer'
         onClick={handleCardClick}>
        <img 
        src={poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : '/no-movie.png'}
        alt={title}
        />
        <div className='mt-4'>
            <h3>{title}</h3>
            <div className='content'>
                <div className='rating'>
                    <img src="./star.png" alt='star Icon'/>
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>•</span>
                <p className='lang'>{original_language}</p>
                <span>•</span>
                <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            </div>
        </div>
    </div>
  )
}



export default MovieCard