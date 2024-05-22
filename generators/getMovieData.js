export default async function getMovieData(movieId) {
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
};
