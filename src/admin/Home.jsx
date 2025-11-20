import React, { useEffect, useState } from 'react'
import "./css/Home.css"

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect (() => {
    const timer = setTimeout(()=>{
      setIsVisible(true)
    }, 500);
    return () => clearTimeout(timer)
  }, []);

  return (
    <div className='adminHome'>
          <div className='shapes'>
            <div className="leftTopCir circle"></div>
            <div className="leftBottomCir circle"></div>
            <div className="rightCir circle"></div>
          </div>
      <div className={`head ${isVisible ? "visible" : "hidden"}`}>
        Making of our Cen
        <div>Coders...</div>
        <p className='subTitle'>Shaping Lives of our Cen Coders</p>
      </div>
    </div>
  )
}

export default Home
