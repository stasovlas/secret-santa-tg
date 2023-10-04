import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_HOST;

export async function fetchParties(participantId) {
    return axios.get('/party', {
        params: {
            participantId
        }
    })
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function createParty(participant, party) {
    return axios.post('/party', {
        data: {
            participant,
            party
        }
    })
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function updateParty(participantId, partyId, party) {
    return axios.put(`/party/${partyId}`, {
        data: {
            participantId,
            party
        }
    })
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function joinParty(participant, partyId, wishList) {
    return axios.post(`/party/${partyId}/join`, {
        data: {
            participant,
            wishList
        }
    })
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function startParty(participantId, partyId) {
    return axios.post(`/party/${partyId}/start`, {
        data: {
            participantId
        }
    })
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function createWishList(participantId, wishList) {
    return axios.post('/wish-list', {
        data: {
            participantId,
            wishList
        }
    })
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function updateWishList(participantId, wishListId, wishList) {
    return axios.put(`/wish-list/${wishListId}`, {
        data: {
            participantId,
            wishList
        }
    })
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function fetchInitData(participantId, joinPartyId) {
    return axios.get('/init-data', {
        params: {
            participantId,
            joinPartyId
        }
    })
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}