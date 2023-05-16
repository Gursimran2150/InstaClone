import React from 'react'
import AnchorTag from '../AnchorTag'

const SuggestionBoxFooter = () => {

const links=[
  {
    name:"About",
    url:"*"
  },{
    name:"Help",
    url:"*"
  },{
    name:"Press",
    url:"*"
  },{
    name:"API",
    url:"*"
  },{
    name:"Jobs",
    url:"*"
  },{
    name:"Privacy",
    url:"*"
  },{
    name:"Terms",
    url:"*"
  },{
    name:"Locations",
    url:"*"
  },{
    name:"Language",
    url:"*"
  },{
    name:"Meta Verified",
    url:"*"
  }
]


  return (
    <div className='suggestionBoxFooterLinks'>

<div className='suggestionBoxFooterLink' >
{
 links.map((link,ind)=>{
  return (
  <AnchorTag text={link.name} href={link.url} key={ind}/>
  )
 })
}
</div>
<div className='suggestionBoxFooterHeading'>
<span> @ 2023 INSTAGRAM FROM META</span>
</div>

    </div>
  )
}

export default SuggestionBoxFooter