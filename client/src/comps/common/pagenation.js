import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet, PER_PAGE } from '../../services/apiSer';
import {Link} from 'react-router-dom';


function Pagenation(props){

  let [countPage,setCountPage] = useState(0)

  useEffect(() => {
doApi()
  },[])

const doApi = async() => { 
  let url = API_URL + props.urlOfItemNum
  let data = await doApiGet(url);
  setCountPage(Math.ceil(data.count / PER_PAGE))
  
}

  return(
    <div className="text-center my-4">
    {/* maap loop without a real array. Making ar with Array object */}
     {[...Array(countPage)].map((item,i) => {
       return(
       <Link key={i} to={props.linkTo+(i+1)} className="btn btn-purple me-1" >{i + 1}</Link>
       )
     }) }
  </div>
  )
}

export default Pagenation

