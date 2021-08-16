import axios from "axios"

export const API_URL = "https://macard.herokuapp.com";
export const PER_PAGE = 6;

export const doApiGet = async (_url) => {
  try {
    let resp = await axios.get(_url);
    return resp.data;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

export const doApiMethod = async (_url, _method, _bodyData) => {
  try {
    let resp = await axios({
      method: _method,
      url: _url,
      data: _bodyData,
      headers: {
        'content-type': "application/json",
        "x-auth-token": localStorage["tok"]
      }
    })
    return resp.data;
  }
  catch (err) {
    console.log(err );
// if there is an err also the promise that listening will throw it
    throw err;
  }
}
