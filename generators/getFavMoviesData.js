import fetch from 'node-fetch';



export default async function getFavMoviesData(favorite_movies) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${process.env.API_KEY}`,
    },
  };
  const movieDataPromises = favorite_movies.map(async (movieId) => {
    const movieDataURL = `https://api.themoviedb.org/3/movie/${movieId}`;
    try {
      const result = await fetch(movieDataURL, options);
      const response = await result.json();
      return response;
    } catch (err) {
      console.error("Error:\t", err);
      return { error: err };
    }
  });

  const results = await Promise.all(movieDataPromises);

  return { results }; 
}
