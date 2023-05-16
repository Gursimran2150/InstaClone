import React from "react";
import "./Footer.css";

const Footer = () => {

  const footerLinks = [
    {
      "url": "https://about.meta.com/",
      "name": "Meta"
    },
    {
      "url": "https://about.instagram.com/",
      "name": "About"
    }, {
      "url": "https://about.instagram.com/en_US/blog",
      "name": "Blog"
    }, {
      "url": "https://about.instagram.com/about-us/careers",
      "name": "Jobs"
    }, {
      "url": "https://help.instagram.com/",
      "name": "Help"
    }, {
      "url": "https://about.meta.com/",
      "name": "Api"
    }, {
      "url": "https://about.meta.com/",
      "name": "Privacy"
    }, {
      "url": "https://about.meta.com/",
      "name": "Terms"
    }, {
      "url": "https://about.meta.com/",
      "name": "Top Accounts"
    }, {
      "url": "https://about.meta.com/",
      "name": "Locations"
    }, {
      "url": "https://about.meta.com/",
      "name": "Instagram Lite"
    }, {
      "url": "https://about.meta.com/",
      "name": "Contact Uploading & Non-Users"
    }, {
      "url": "https://about.meta.com/",
      "name": "Meta Verified"
    }
  ]



  return (
    <footer className="mainFooter">
      <div className="footerLinks">
        {
          footerLinks.map((item, idx) => {
            return (
              <a href={item.url} key={idx}>
                {item.name}
              </a>
            )
          })
        }

      </div>
      <div className="links">
        <select id="" className="laguageSelection" defaultValue={"english"}>
          <option value="english">
            English
          </option>
          <option value="hindi">Hindi</option>
          <option value="punjabi">Punjabi</option>
          <option value="englishUk">English(UK)</option>
        </select>
        <span>© 2023 Instagram from Meta </span>
      </div>
    </footer>
  );
};

export default Footer;
