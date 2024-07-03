import fetch from "node-fetch";

export default async function getList(account_id) {
  const getListURL = `
    https://api.themoviedb.org/3/account/${account_id}/lists`;
  const getListOpt = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };
  const getListRes = await fetch(getListURL, getListOpt);
  const getListVal = await getListRes.json();
  console.log("List values:\t",getListVal);
  return getListVal;
}
