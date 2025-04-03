/**
 * Validation Utilities
 *
 * This module exports validation functions for movie-related data.
 * It provides functions to validate movie titles, actors, and release years.
 */

// Validate movie title
export const validateTitle = (title) => {
  if (!title || typeof title !== "string") {
    return "Title is required";
  }

  if (title.trim().length < 1) {
    return "Title cannot be empty";
  }

  if (title.trim().length > 100) {
    return "Title cannot exceed 100 characters";
  }

  return null;
};

// Validate movie actors
export const validateActors = (actors) => {
  if (!actors || !Array.isArray(actors)) {
    return "Actors must be an array";
  }

  if (actors.length === 0) {
    return "At least one actor is required";
  }

  for (const actor of actors) {
    if (typeof actor !== "string" || actor.trim().length === 0) {
      return "Actor names must be non-empty strings";
    }

    if (actor.trim().length > 100) {
      return "Actor names cannot exceed 100 characters";
    }
  }

  return null;
};

// Validate movie release year
export const validateReleaseYear = (year) => {
  if (!year || typeof year !== "number") {
    return "Release year must be a number";
  }

  const currentYear = new Date().getFullYear();

  if (year < 1900 || year > currentYear + 5) {
    return `Release year must be between 1900 and ${currentYear + 5}`;
  }

  return null;
};

// Validate entire movie object
export const validateMovie = (movie) => {
  const titleError = validateTitle(movie.title);
  if (titleError) return titleError;

  const actorsError = validateActors(movie.actors);
  if (actorsError) return actorsError;

  const yearError = validateReleaseYear(movie.releaseYear);
  if (yearError) return yearError;

  return null;
};
