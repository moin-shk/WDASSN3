// components/movies/MovieList.js
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onDeleteMovie }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">No movies found</h2>
        <p className="text-gray-600 dark:text-gray-300">Try adjusting your search criteria.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onDeleteSuccess={onDeleteMovie} 
        />
      ))}
    </div>
  );
};

export default MovieList;
