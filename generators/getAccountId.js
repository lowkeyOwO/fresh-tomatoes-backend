import fetch from "node-fetch"

export default async function getAccountId(session_id) {
    const accountId = await fetch(`https://api.themoviedb.org/3/account?api_key=${process.env.API_KEY2}&session_id=${session_id}`);
    const accountDetails = await accountId.json();
    return accountDetails.id;    
};
