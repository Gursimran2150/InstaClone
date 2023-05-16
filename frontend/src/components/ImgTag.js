import React from 'react'

const ImgTag = ({ src, id, width,height, handleClick ,className}) => {
	return (
		<img src={src} id={id} width={width} height={height} 
			alt="icon"
			onClick={handleClick}
			className={className}
		/>
	)
}

export default ImgTag