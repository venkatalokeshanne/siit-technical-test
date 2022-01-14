const BASE_URL = window.location;

export default async function getData(endpoint) {
    const responseData = await fetch(BASE_URL + endpoint)
        .then(response => response.json())
        .then((data) => {
            return data;
        });
        console.log(responseData)
    return responseData;
}        