const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing`;
const popularURL = `https://api.themoviedb.org/3/movie/popular`;
const topRatedURL = `https://api.themoviedb.org/3/movie/top_rated`;
const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming`;

export async function getHomePage(session_id) {
  try {
    const getHomePageOPTS = {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    };
    const nowPlayingData = await fetch(
      nowPlayingURL + `?session_id=${session_id}`,
      getHomePageOPTS
    );
    const nowPlayingDetails = await nowPlayingData.json();
    const popularData = await fetch(
      popularURL + `?session_id=${session_id}`,
      getHomePageOPTS
    );
    const popularDetails = await popularData.json();

    const topRatedData = await fetch(
      topRatedURL + `?session_id=${session_id}`,
      getHomePageOPTS
    );
    const topRatedDetails = await topRatedData.json();

    const upcomingData = await fetch(
      upcomingURL + `?session_id=${session_id}`,
      getHomePageOPTS
    );
    const upcomingDetails = await upcomingData.json();

    if (
      nowPlayingData.ok &&
      popularData.ok &&
      topRatedData.ok &&
      upcomingData.ok
    ) {
      return {
        now_playing: { ...nowPlayingDetails },
        popular_movies: { ...popularDetails },
        top_rated: { ...topRatedDetails },
        upcoming: { ...upcomingDetails },
      };
    }
  } catch (err) {
    throw new Error(err);
  }
}
