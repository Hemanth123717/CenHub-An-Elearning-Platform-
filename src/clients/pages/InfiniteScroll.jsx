import React from 'react'
import './css/InfiniteScroll.css'
// import exampleImg from '../images/scrollBackground.jpg'
import exampleImg from '../../Images/palewhite.png'

const InfiniteScroll = () => {
  return (
    <div>
    <div className='blurLayer'></div>
    <div className='marquee-container'>
        <div className='marquee'>
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
        </div>
        <div className='marquee_right'>
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
        </div>
        <div className='marquee'>
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
        </div>
        <div className='marquee_right'>
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
            <img src={exampleImg} alt="" />
        </div>
    </div>
    </div>
  )
}

export default InfiniteScroll