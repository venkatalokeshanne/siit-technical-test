const BASE_URL = window.location;

async function getData(endpoint) {
  const responseData = await fetch(BASE_URL + endpoint)
    .then((response) => response.json())
    .then((data) => { return data; })
    .catch((error) => alert(error));
  return responseData;
}

export function getUsers(){
    return getData('users.json')
}

export function getServices(){
    return getData('services.json')
}