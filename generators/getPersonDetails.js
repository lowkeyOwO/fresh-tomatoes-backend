import fetch from "node-fetch";

function filterPersonDetails(personCreditDetails, department) {
  let castData;
  if (department == "Acting") {
    castData = personCreditDetails
      .filter((movie) => movie.popularity >= 25.0)
      .sort((a, b) => b.vote_count - a.vote_count);
  } else {
    castData = personCreditDetails
      .filter(
        (movie) => movie.popularity >= 25.0 && movie.department == department
      )
      .sort((a, b) => b.vote_count - a.vote_count);
  }
  let backdropPaths = [];

  castData = castData.map((movie) => {
    if (movie["backdrop_path"] !== null) {
      backdropPaths.push(movie["backdrop_path"]);
    }
    return {
      title: movie["title"],
      poster_path: movie["poster_path"],
      character: movie["character"],
      id: movie["id"],
    };
  });
  return { backdropPaths, castData };
}

export default async function getPersonDetails(person_id, session_id) {
  const personURL = `https://api.themoviedb.org/3/person/${person_id}?session_id=${session_id}`;
  const personCreditURL = `https://api.themoviedb.org/3/person/${person_id}/movie_credits?session_id=${session_id}`;
  const personOPT = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${process.env.API_KEY}`,
    },
  };
  try {
    const personData = await fetch(personURL, personOPT);
    const personCreditData = await fetch(personCreditURL, personOPT);
    const personDetails = await personData.json();
    let personCreditDetails = await personCreditData.json();
    if (personDetails["known_for_department"] == "Acting") {
      personCreditDetails = filterPersonDetails(
        personCreditDetails["cast"],
        personDetails["known_for_department"]
      );
    } else {
      personCreditDetails = filterPersonDetails(
        personCreditDetails["crew"],
        personDetails["known_for_department"]
      );
    }
    return { personDetails, personCreditDetails };
  } catch (err) {
    console.error(err);
    return { error: err };
  }
}
