import { useLocation, useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center text-white gap-4">
        <p className="text-lg text-gray-400">Movie not found.</p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition text-sm"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  const { title, poster_path, vote_average, release_date, original_language } = state;
  const year = release_date ? release_date.split("-")[0] : "N/A";
  const rating = vote_average ? vote_average.toFixed(1) : "N/A";
  const ratingPercent = vote_average ? (vote_average / 10) * 100 : 0;

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6 overflow-hidden">

      
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-3xl brightness-[0.25] saturate-150"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})` }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-[#0a0a0f]/95" />

    
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-10 px-4 py-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-md text-white text-sm hover:bg-white/20 transition cursor-pointer"
      >
         Back
      </button>

      {/* Main card */}
      <div className="relative z-10 flex flex-col md:flex-row gap-10 max-w-4xl w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.6)]">

        {/* Poster */}
        <div className="relative flex-shrink-0 mx-auto md:mx-0">
          <img
            src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "/no-movie.png"}
            alt={title}
            className="w-52 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          />
          {/* Glow under poster */}
          <div className="absolute -bottom-3 left-[10%] right-[10%] h-8 bg-amber-400/30 blur-xl rounded-full" />
        </div>

        {/* Details */}
        <div className="flex flex-col text-white flex-1">

          {/* Eyebrow label */}
          <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">🎬 Now Viewing</p>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight mb-4">{title}</h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm text-gray-200">⭐ {rating}</span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm text-gray-200">📅 {year}</span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm text-gray-200">🌐 {original_language?.toUpperCase()}</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-6" />

          {/* Meta info */}
          <div className="flex flex-col gap-5">

            {/* Rating with bar */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-widest text-gray-500">Rating</span>
              <span className="text-base font-semibold">{rating} / 10</span>
              <div className="w-44 h-1 rounded-full bg-white/10 overflow-hidden mt-1">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700"
                  style={{ width: `${ratingPercent}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-widest text-gray-500">Release Year</span>
              <span className="text-base font-semibold">{year}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-widest text-gray-500">Language</span>
              <span className="text-base font-semibold">{original_language?.toUpperCase()}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;