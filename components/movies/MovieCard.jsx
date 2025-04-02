// components/movies/MovieCard.js
const MovieCard = ({ movie, onDeleteSuccess }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{movie.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">
        <strong>Release Year:</strong> {movie.releaseYear}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        <strong>Actors:</strong> {movie.actors.join(", ")}
      </p>
      {onDeleteSuccess && (
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-200"
          onClick={() => onDeleteSuccess(movie.id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default MovieCard;
