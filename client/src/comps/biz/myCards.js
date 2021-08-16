import React, { useEffect, useState } from 'react';
import PageHeader from '../common/pageHeader';
import { Link } from 'react-router-dom';
import {FaTrashAlt,FaEdit} from 'react-icons/fa'
import { API_URL, doApiMethod } from '../../services/apiSer';
import { toast } from 'react-toastify';
import Hero, { heroImg } from '../common/hero';
import '../../css/myCards.css'

function MyCards(props) {

  let [ar, setAr] = useState([])
  useEffect(() => {
    doApi()
  }, [props.location])

  const doApi = async () => {
    let url = API_URL + "/cards/userCardsAdded?perPage=999"
    let data = await doApiMethod(url, "GET")
    setAr(data)

  }

  const delCard = async(_id) => {
    if(window.confirm("Are you sure you want to del?")){
      let url = API_URL+ "/cards/"+_id;
      let data = await doApiMethod(url,"DELETE");
      if(data.n == 1){
        doApi();
        toast.info("Card deleted");
      }
    }
  }

  return (
    <div className="mb-5">
      <Hero imgPath={heroImg} heroTitle={'Your Cards'} />
      <PageHeader title="Cards you've added" />
      <div className="p-5">
      <Link to="addCard" className="btn btn-purple mb-3">Add new Biz Card</Link>
    <div className="tableResponsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Phone</th>
            <th>edit/del</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return (
              <tr  key={i}>
                <td className="numsTd">{i + 1}</td>
                <td>{item.bizName}</td>
                <td>{item.bizDescription.substr(0, 40)}...</td>
                <td>{item.bizAddress}</td>
                <td>{item.bizPhone}</td>
                <td>
                <Link to={"/editCard/"+item._id}>
                    <button className="btn hoverScale  "><FaEdit className="fs-5 my-auto" /></button>
                    </Link>
                  <button className="btn hoverScale text-danger  ms-2" onClick={() => {
                      delCard(item._id);
                    }}><FaTrashAlt className="fs-5" /></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  )
}

export default MyCards