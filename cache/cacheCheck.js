export default async function cacheCheck(username, client) {
  // Check if data is available in Redis cache
  // Instead of generating session ID over and over again, it only generates if it doesn't exist in cache.
 const data = await client.get(username, (error, cachedData) => {
    if (error) {
        console.log("Error:\t",error);
    } else {
        if (cachedData) {
            console.log("Data exists in cache:\t",cachedData)
            return cachedData;
        } else {
            console.log("Data doesn't exist in cache!");
            return null;
        }
    }
  });
  return data;
}
