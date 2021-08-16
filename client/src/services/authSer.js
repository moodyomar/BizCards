import { API_URL, doApiMethod } from "./apiSer"

// check if regular user and have token
export const checkIfUser = async() => {
  // check if there localstorage
  if(!localStorage["tok"]){
    return {err:"No token in localstorage"};
  }
  try{
    // check if token valid in nodejs
    let url = API_URL+"/users/authUser";
    let data = await doApiMethod(url,"GET");
    return data;
  }
  catch(err){
    console.log(err);
    return err;
  }
}