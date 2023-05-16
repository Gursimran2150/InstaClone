import React from 'react'
import Button from '../Button'

const RobotCaptcha = ({handleChange, handleClick} ) => {
  return (
    <div className="robotCaptchaContainer">
    <div className="robotCaptchaContainerContent">
      <div className="robotCaptchaContent1">
        <h2 className="robotCaptchaContentHeading">
          Confirm it's You to Login
        </h2>

        <div className="robotCaptchaContentDes1">
          We noticed unusual activity from your account so we've logged
          you out.
        </div>

        <div className="robotCaptchaContentDes2">
          Follow the next steps within 1 day so we can try to get you back
          into your account before it's disabled.
        </div>
      </div>
      <div className="robotCaptchaContent1">
        <div className="robotCaptchaContentInputCont">
          <input
            type="checkbox"
            value=""
            onChange={(e) => handleChange(e)}
          />{" "}
          I'm not a robot
        </div>
        <div className="robotCaptchaContentDes3">
          <p>
            This helps us to combat harmful conduct, detect and prevent
            spam and maintain the integrity of our Products.
          </p>
          <p>
            We’ve used Google's reCAPTCHA Enterprise product to provide
            this security check. Your use of reCAPTCHA Enterprise is
            subject to Google’s Privacy Policy and Terms of Use.
          </p>
          <p>
            reCAPTCHA Enterprise collects hardware and software
            information, such as device and application data, and sends it
            to Google to provide, maintain, and improve reCAPTCHA
            Enterprise and for general security purposes. This information
            is not used by Google for personalized advertising.
          </p>
        </div>
      </div>
    </div>
    <div className="robotCaptchaNextBtnCont">
      <div className="BTTTT2222">
        <Button
          text={"Next"}
          className="BTTTT"
          onclick={handleClick}
        />
      </div>
    </div>
  </div>
  )
}

export default RobotCaptcha