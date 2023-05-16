import React from 'react'

const AnchorTag = ( {href,className,id,text, fontIcon,target}) => {
  return (
   <>
   <a  href={href} className={className} id={id} target={target}>{fontIcon} {text}</a>
   </>
  )
}

export default AnchorTag