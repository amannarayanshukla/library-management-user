const BASE_URL = `http://localhost:3001`;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const issuedRaised = (uuid,accessToken,bookID,userID,type,time_of_issue_request,time_of_returned_request) => {

    const raw = JSON.stringify({
        "uuid":uuid,
        "accessToken":accessToken,
        "bookID":bookID,
        "userID":userID,
        "type":type,
        "time_of_issue_request":time_of_issue_request,
        "time_of_returned_request":time_of_returned_request
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    return fetch(`${BASE_URL}/api/user/issued-request-raised`,requestOptions)
        .then(data =>{
            console.log(data, "DATA JSON");
            return data.json()
        })
        .then((data) => {
            console.log(data,"DATA issued Raised api");
            // return data
        })
        .catch(err => err);
};

module.exports = {
    issuedRaised
};

