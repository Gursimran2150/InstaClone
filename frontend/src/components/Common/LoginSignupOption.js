import React from 'react'
import AnchorTag from '../AnchorTag'

export default function LoginSignupOption({
    label, linkText, linkUrl
}) {
    return (
        <div className="loginOption">
            <span className='loginOptionPara'>
            {label} 
            <AnchorTag href={linkUrl} text={linkText} />
            </span>
        </div>
    )
}
