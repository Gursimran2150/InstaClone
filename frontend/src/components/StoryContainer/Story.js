import React, { useState } from 'react'
import './Story.css'
import ImgTag from '../ImgTag'
const Story = () => {

  // const [storyList,setStoryList]=useState([])

  const storyList = [
    {
      "profilePic": "../images/inputIcons/redHeart.png",
      "username": "instagram"

    }, {
      "profilePic": "../images/birthdayCake.png",
      "username": "instagram"

    }, 
    // {
    //   "profilePic": "../images/inputTrue.png",
    //   "username": "instagram"

    // }, {
    //   "profilePic": "../images/x-mark-1.png",
    //   "username": "instagram"

    // }, {
    //   "profilePic": "../images/lightFacebookIcons.png",
    //   "username": "instagram"

    // }, {
    //   "profilePic": "../images/facebook.png",
    //   "username": "instagram"

    // }, {
    //   "profilePic": "../images/inputIcons/search.png",
    //   "username": "instagram"

    // }, {
    //   "profilePic": "../images/inputIcons/reels.png",
    //   "username": "instagram"

    // }, {
    //   "profilePic": "../images/inputIcons/instagram.png",
    //   "username": "instagram"

    // },
  ]







  return (
    <div className='storyList'>

      {
        storyList.map((item, index) => {

          return (

            <div className='userStory' key={index}>

              <div className='storyback'>
              <ImgTag src={item.profilePic} width={59} height={59} />
            </div>
              <span className='storyUserName'> {item.username} </span>
            </div>
          )


        })
      }



    </div>
  )
}

export default Story