const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN"


const setAccessToken = (accessToken) => ({
    type: SET_ACCESS_TOKEN,
    accessToken
})

export const getAccessToken = () => {
    const response = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${process.env.CLIENT_ID}` + `:` + `${process.env.CLIENT_SECRET}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    })
}
