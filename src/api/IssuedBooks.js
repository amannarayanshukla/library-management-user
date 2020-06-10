const BASE_URL = `http://localhost:3001`;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const issuedBooks = (uuid,accessToken) => {

    const raw = JSON.stringify({
        "uuid":uuid,
        "accessToken":accessToken,
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    return fetch(`${BASE_URL}/api/user/get-all-books`,requestOptions)
        .then(data =>{
            return data.json()
        })
        .then((data) => {
            return data
        })
        .catch(err => err);
};

module.exports = {
    issuedBooks
};

