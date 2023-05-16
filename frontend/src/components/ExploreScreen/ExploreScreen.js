import React from 'react'
import './ExploreScreen.css'
import ImgTag from '../ImgTag'
import img1 from './images/1.jpeg'
import img2 from './images/2.jpeg'
import img3 from './images/3.jpeg'
import img4 from './images/4.jpeg'

const ExploreScreen = () => {

  const images = [
    {
      src: img1
    },
    {
      src: img2
    }, {
      src: img3
    }, {
      src: img4
    }, {
      src: "../images/inputIcons/wedding.jpeg"
    }, {
      src: "../images/inputIcons/wedding.jpeg"
    }, {
      src: "../images/inputIcons/wedding.jpeg"
    }, {
      src: img2
    }, {
      src: img3
    }, {
      src: img4
    }, {
      src: "../images/inputIcons/wedding.jpeg"
    }, {
      src: "../images/inputIcons/wedding.jpeg"
    },
  ]


  return (
    <div className='exploreContainer'>

      <div className='exploreViewRow'>

        {
          images.map((item, ind) => {
            return (
              // <div className='exploreViewColumn' key={ind}>
              <>
                <ImgTag src={item.src} />
                {/* </div> */}

              </>)
          })
        }




      </div>


    </div>
  )
}

export default ExploreScreen