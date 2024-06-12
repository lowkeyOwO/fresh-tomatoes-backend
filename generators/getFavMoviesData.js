import fetch from 'node-fetch';

export default async function getFavMoviesData(favorite_movies) {
  const movieDataPromises = favorite_movies.map(async (movieId) => {
    const movieDataURL = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${process.env.API_KEY}`,
      },
    };
    try {
      const result = await fetch(movieDataURL, options);
      const response = await result.json();
      return response;
    } catch (err) {
      console.error("Error:\t", err);
      return { error: err };
    }
  });

  // Wait for all promises to resolve
  const results = await Promise.all(movieDataPromises);

  return { results }; 
}
