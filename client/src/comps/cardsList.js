import React, { useEffect, useState } from 'react';
import { getUserData, removeUserFavCard, updateUserAddFavCards } from '../services/userSer';
import '../css/card.css'

function CardsList({ar}) {
    
  let [userData, setUserData] = useState({})
  let [update, setForceUpdate] = useState(1)

  useEffect(() => {
    setUserData(getUserData)
  }, [])

  const showBtnFav = (item) => {    
    // if by chance the bizz number is in card property of the user
    //  show emptry hart(button) for adding to favorite
    if (!userData.cards.includes(item.bizNumber)) {
      return (

<button className="icon-button" onClick={async () => {
          // update cards array in the user (fav cards)
          await updateUserAddFavCards(item.bizNumber);
          // updating comp state that will force it rerender again
          // and like that it will change the button status in display
          // forceupdate -> func that I made to force an update
          setForceUpdate(update + 1);

        }} className=" hoverScale">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="Heart">
            <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
          </svg>
        </button>
      )
    }
    else {
      return (<button onClick={async () => {
        await removeUserFavCard(item.bizNumber)
        setForceUpdate(update + 1);
      }} className="hoverScale"><i className="fa fa-heart fs-2 text-danger" aria-hidden="true"></i></button>)
    }
  }

  return (
    <div className="row justify-content-center" id="cardsLayout">
      {ar.map((item) => {
        let bg = item.bizImage?.length > 2 ? item.bizImage : '/images/defaultImg.jpg'
        return (
          <div className="card-list my-4">
    <article className="card" data-aos="zoom-in-down">
      <figure className="card-image">
        <div style={{ backgroundImage: `url(${bg})` }} alt={`${item.bizName} image`} className="bizImage" />
      </figure>
      <div className="card-header">
        <div className="d-flex flex-column">
          <strong>{item.bizName}</strong>
          <small className="text-secondary">{item.bizDescription}</small>
        </div>
        {userData._id ? showBtnFav(item) :
  <small className="text text-danger">* Login first  </small>}
        
      </div>
      <div className="card-body">
        <small>
          <i className="fa fa-phone-square me-2" aria-hidden="true"></i>
          {item.bizPhone.toString().substring(0, 3) + '-' +
            item.bizPhone.toString().substring(3, item.bizPhone.length)}<br />
          <i className="fa fa-address-book me-2" aria-hidden="true"></i>
          {item.bizAddress}<br />
          <i className="fa fa-briefcase me-2" aria-hidden="true"></i>
          {item.bizNumber}<br />
        </small>


      </div>
      <div className="card-footer">
        <div className="card-meta card-meta--views">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="EyeOpen">
            <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {item.bizNumber.toString().substring(2,5)}
        </div>
        <div className="card-meta card-meta--date">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="Calendar">
            <rect x="2" y="4" width="20" height="18" rx="4" />
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <path d="M2 10h20" />
          </svg>
          {item.createdAt.substring(0, 10)}
        </div>
      </div>
    </article>
  </div>
        )
      })}
    </div>
// {userData._id ? showBtnFav(item) :
//   <small className="text text-danger">* log in to add to favorite</small>}

  )
}

export default CardsList