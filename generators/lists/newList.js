import fetch from "node-fetch";

export default async function createNewList(session_id) {
  const newListURL = `https://api.themoviedb.org/3/list?session_id=${session_id}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      name: "moviekirk_watched_list",
      description: "List of movies watched by user",
    }),
  };

  try {
    const response = await fetch(newListURL, options);
    const data = await response.json();
    console.log("Watched Movies List:\n", data);

    return { data };
  } catch (error) {
    console.error("Error:", error);
    return { error: error.message };
  }
}
