import React, { useState } from 'react'
import mainCSS from './main.module.css';
import Header from '../header/header';
import { Navigate } from 'react-router-dom';
export default function Main({ data }) {
  const [veri, setveri] = useState(false);
  if (veri) {
    return <Navigate to="/verify" />
  }
  return (
    <div className={mainCSS.main}>
      <div>
        <Header />
      </div>
      <div className={mainCSS.allDivs}>
        <div className={mainCSS.mainDiv}>
          <a className={mainCSS.link} href="/email">Start</a>
        </div>
        <div className={mainCSS.mainBtn}>
          <a className={mainCSS.link}>
           
            Verify
          </a>
        </div>
      </div>
      <div className={mainCSS.map}>
        <div className={mainCSS.static}>
          <span className={mainCSS.span}>
            Title
          </span>
          <span className={mainCSS.span}>
            Category
          </span>
          <span className={mainCSS.span}>
            Price
          </span>
          <span className={mainCSS.span}>
            Description
          </span>

        </div>
        {
          data.map((Data) => {
            const { id, title, category, price, desc } = Data;
            return (
              <div className={mainCSS.mapDiv} key={id}>
                <span className={mainCSS.spans}>{title}</span>
                <span className={mainCSS.spans}>{category}</span>
                <span className={mainCSS.spans}>{price}</span>
                <span className={mainCSS.spans}>{desc}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
