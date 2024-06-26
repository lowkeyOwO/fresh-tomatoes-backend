function filterData(searchDetails) {
  let movies = [];
  let persons = [];

  searchDetails.forEach((item) => {
    if (item.media_type === "movie") {
      movies.push({
        id: item.id,
        title: item.title,
        poster_path: item.poster_path,
        popularity: item.popularity,
        release_date: item.release_date,
        overview: item.overview
      });
    } else if (item.media_type === "person") {
      persons.push({
        id: item.id,
        name: item.name,
        profile_path: item.profile_path,
        popularity: item.popularity,
        department : item.known_for_department
      });
    }
  });
  movies.sort((a, b) => b.popularity - a.popularity);
  persons.sort((a, b) => b.popularity - a.popularity);
  return { movies: movies, people: persons };
}

export default async function searchForDatainTMDB(searchVal, session_id) {
  const searchURL = `https://api.themoviedb.org/3/search/multi?query=${searchVal}&include_adult=false&language=en-US&page=1?session_id=${session_id}`;
  const searchOPT = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + `${process.env.API_KEY}`,
    },
  };
  try {
    const searchData = await fetch(searchURL, searchOPT);
    let searchDetails = await searchData.json();
    searchDetails = filterData(searchDetails["results"]);
    if (searchData.ok) {
      return searchDetails;
    } else {
      return { error: searchDetails };
    }
  } catch (err) {
    throw new Error({ error: err });
  }
}
