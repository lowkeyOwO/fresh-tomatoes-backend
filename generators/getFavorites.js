


export default async function getFavorites(account_id) {
    const getFavoritesURL = `https://api.themoviedb.org/3/account/${account_id}/favorite/movies`;
      const getFavOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      };
      const getFavorites = await fetch(getFavoritesURL, getFavOptions);
      let favList = await getFavorites.json();
      return favList;
};
