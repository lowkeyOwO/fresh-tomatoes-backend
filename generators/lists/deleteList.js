import fetch from "node-fetch";

export default async function deleteList(session_id,list_id) {
  const newListURL1 = `https://api.themoviedb.org/3/list/${list_id}?session_id=${session_id}`;
  const options1 = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  try {
    const response1 = await fetch(newListURL1, options1);
    const data1 = await response1.json();
    console.log("Deleted List 1:\n", data1);

    return { response1 };
  } catch (error) {
    console.error("Error:", error);
    return { error: error.message };
  }
}
