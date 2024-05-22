import fetch from "node-fetch";

function selectRandomBD(backdropLinks) {
  const result = [];

  if (backdropLinks.length <= 4) {
    for (let backdrop of backdropLinks) {
      result.push(backdrop["file_path"]);
    }
  } else {
    const copyArray = backdropLinks.slice();
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * copyArray.length);
      result.push(copyArray.splice(randomIndex, 1)[0]["file_path"]);
    }
  }
  return result;
}

export default async function getImageData(session_id, movieIDs) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + `${process.env.API_KEY}`,
    },
  };
  let movieImages = [];
  for (let movieID of movieIDs) {
    const url = `https://api.themoviedb.org/3/movie/${movieID}/images?session_id=${session_id}`;
    try {
      const imageRawData = await fetch(url, options);
      const imageJson = await imageRawData.json();
      const backDrop = imageJson["backdrops"];
      const randomImages = selectRandomBD(backDrop);
      movieImages.push(...randomImages);
    } catch (err) {
      console.error("error:" + err);
    }
  }
  return movieImages;
}
