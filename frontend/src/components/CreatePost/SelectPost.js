import React from 'react'
import ImgTag from '../ImgTag'

const SelectPost = ( {handleClick,handleFileSelect,fileInput}) => {
  return (
    <div className="createPostCont">
            <div className="createPostModalHeading">
              <h1> Create new Post </h1>
            </div>
            <div className="createPostModalContent">
              <div className="imgCont">
                <ImgTag src={"../images/birthDayCake.png"} width={250} />

                <span className="textDragPics">
                  Drag photos and videos here
                </span>
              </div>
              <div className="selectPostBtn">
                <button onClick={handleClick}>Select from computer </button>
                <input
                  type="file"
                  ref={fileInput}
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                ></input>
              </div>
            </div>
          </div>
  )
}

export default SelectPost