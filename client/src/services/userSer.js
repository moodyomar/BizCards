import { toast } from "react-toastify";
import { API_URL, doApiMethod } from "./apiSer";

let user = {};

export const getUserDataFromApi = async () => {
  try {
    let url = API_URL + "/users/userInfo"
    let data = await doApiMethod(url, "GET")
    console.log(data);
    user = data;
  }
  catch (err) {
    console.log(err);

  }
}

export const updateUserData = async () => {
  if (localStorage["tok"]) {
    // if there is token we pull the user data,
    // if not / token invalid we send him to login pg
    let url = API_URL + "/users/userInfo";
    try {
      let data = await doApiMethod(url, "GET");
      // data = resp.data which returned from doApiMethod func
      if (data._id) {
        // if there is an id which mean data recived
        // we assinged it to user object
        user = data
      }
      else {
        // otherwise we remove the token and return emptey user
        localStorage.removeItem("tok");
        user = {}
      }
      return user
    }
    catch (err) {
      localStorage.removeItem("tok");
      user = {};
      return user
    }
  }
  else {
    user = {}
    return user;
  }
}


export const getUserData = () => {
  return user;
}


// function the will update the cards array of user when the user make a card favorite
export const updateUserAddFavCards = async (_bizCardNumber) => {
  //  making sure that there is no duplicates in array

  let temp_ar = [...user.cards, _bizCardNumber];
  // Set -> making an object the maing sure there is no duplicates
  temp_ar = new Set([...temp_ar]);
  user.cards.splice(0, user.cards.length, ...temp_ar);

  let url = API_URL + "/users/cards"
  try {

    let data = await doApiMethod(url, "PATCH", { cards: user.cards });
    // if there is a success ill recive n=1 just like in postman
    if (data.n == 1) {
      toast.success("Card is added to favorite")
    }
    return data;
  }
  catch (err) {
    console.log(err)
    toast.error("an error accured , try again later !")
    throw err
  }
}

// removing a card from favorite
export const removeUserFavCard = async (_bizCardNumber) => {
  // return to temp_ar all the cards beside the one i want to remove
  let temp_ar = user.cards.filter(item => item != _bizCardNumber)
  user.cards.splice(0, user.cards.length, ...temp_ar);

  let url = API_URL + "/users/cards"
  try {

    let data = await doApiMethod(url, "PATCH", { cards: user.cards });
    // if there is a success ill recive n=1 just like in postman
    if (data.n == 1) {
      toast.warning("Card removed from favorite")
    }
    return data;
  }
  catch (err) {
    console.log(err)
    toast.error("There problem , try again later !")
    throw err
  }
}