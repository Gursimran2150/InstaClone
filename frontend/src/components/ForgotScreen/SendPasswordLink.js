import React from 'react'
import AnchorTag from '../AnchorTag'
import ImgTag from '../ImgTag'
import Button from '../Button'
import '../../pages/forgetPassword/ForgetPassword.css'
import { useNavigate } from 'react-router-dom'


const SendPasswordLink = ({user}) => {
const navigate =useNavigate();

const handleClick=()=>{
navigate("/accounts/password/reset/");
}

  return (

<div className="robotCaptchaContainer">
<div className='smsSendHeadingCont'>
<h4>SMS Sent</h4>
</div>
<div className='smsSendContentCont'>
<p>
We sent an SMS to <span>{user}</span> with a link to get back into your account.
</p>
</div>
<div className='smsSendButtonCont'>
<Button text={"OK"} onclick={handleClick}/>
</div>
  </div>


     
  )
}

export default SendPasswordLink