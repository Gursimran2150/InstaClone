import React from "react";
import "./appstore.css";

import ImgTag from "../../ImgTag";
import AnchorTag from "../../AnchorTag";

export default function AppStoreIcons() {
  return (
    <div className="appStoreIcons">
      <div className="getAppHeading">
        <span> Get the app.</span>
      </div>
      <div className="getAppIcons">
        <AnchorTag
          href={"https://apps.apple.com/app/instagram/id389801252?vt=lo"}
          text={<ImgTag src={"/images/Yfc020c87j0.png"} width={134} />}
          target={"_blank"}
        />
        <AnchorTag
          href={
            "https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3D9BB715F0-D999-4FCB-A157-42C77039C899%26utm_content%3Dlo%26utm_medium%3Dbadge"
          }
          text={<ImgTag src={"/images/c5Rp7Ym-Klz.png"} width={134} />}
          target={"_blank"}

        />
      </div>
    </div>
  );
}
