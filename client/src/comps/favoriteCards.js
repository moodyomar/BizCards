import React, { useEffect, useState } from 'react';
import { API_URL, doApiMethod } from '../services/apiSer';
import PageHeader from './common/pageHeader';
import CardsList  from './cardsList';
import Hero, { heroImg } from './common/hero';

function FavoriteCards(props){
  let [cards_ar,setCardsAr] = useState([]);

  useEffect(() => {
    let url = API_URL + "/users/userCardsFav";
    doApi(url)
  },[])

  const doApi = async(_url) => {
    try{
    let data = await doApiMethod(_url,"GET");
    console.log(data);
    setCardsAr(data);
    }
    catch(err){
      console.log(err.response)
    }
  }

  return(
    <>
      <Hero imgPath={heroImg} heroTitle={'Your Favorites'} />
      <PageHeader title="Favorite Business Cards" />
      <CardsList ar={cards_ar}/>
    </> 
  )
}

export default FavoriteCards