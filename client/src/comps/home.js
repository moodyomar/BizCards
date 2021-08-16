import React, { useEffect, useState } from 'react';
import PageHeader from './common/pageHeader';
import Hero, { heroImg } from './common/hero';
import CardsList  from './cardsList';
import { API_URL, doApiGet } from '../services/apiSer';
import Pagenation from './common/pagenation';
import AOS from 'aos';
import 'aos/dist/aos.css'; 


function Home(props){
  AOS.init({
    offset: 200, // offset (in px) from the original trigger point
    duration: 400, // values from 0 to 3000, with step 50ms
  });

let [cards_ar,setCards_ar] = useState([])


useEffect(() => {
// query string option for the number of the page we are at
const quries = new URLSearchParams(window.location.search);
let page = quries.get("page") ? quries.get("page")-1 : 0;
let url = API_URL+"/cards?reverse=yes&page="+page;
doApi(url);
},[props.location])

const doApi = async(url) => { 
  let data = await doApiGet(url);
  setCards_ar(data);
}

  return(
    <div>
      <Hero imgPath={heroImg} heroTitle={'Business Meetup'} />
      <PageHeader title="Level Up Your Business" />
   {/*  urlOfItemNum-> url that will return the amout of quiries
      linkTo -> url in client side that will send him each button
      */}
      <CardsList ar={cards_ar} />
      <Pagenation urlOfItemNum="/cards/totalCards" linkTo="/?page="   />
    </div> 
  )
}

export default Home