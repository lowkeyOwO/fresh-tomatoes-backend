function getFilteredCrew(castCrew) {
  let cast = castCrew["cast"].filter((castMem) => castMem["popularity"] >= 10);
  let crew = castCrew["crew"].filter((crewMem) => crewMem["job"] === "Director");
  if (cast.length > 18) {
    cast = cast.sort((a, b) => b.popularity - a.popularity).slice(0, 18);
  } 
  return {cast,crew};
}


export default async function getMovieData(movieId) {
    const movieDataURL = `https://api.themoviedb.org/3/movie/${movieId}`;
    const movieCreditsURL  = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${process.env.API_KEY}`,
      },
    };
    try {
      const result = await fetch(movieDataURL, options);
      const movieCred = await fetch(movieCreditsURL,options);
      const response = await result.json();
      const movieResponse = await movieCred.json();
      const filteredCrew = getFilteredCrew(movieResponse); 
      return {...response,...filteredCrew};
    } catch (err) {
      console.error("Error:\t", err);
      return { error: err };
    }
};
