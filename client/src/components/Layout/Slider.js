import React from 'react';
import banner_01 from '../../images/banner/banner_01.png';
import slider_overlay from '../../images/banner/slider-overlay.png';
import pc from '../../images/banner/pc.png'
import sold_tag from '../../images/banner/sold_tag.png'
 import {Link} from 'react-router-dom'
const Slider = (props) => {
  return(
    <section className="rt-banner-area default-slider">
        <div className="rt-slider-active owl-carousel">
            <div className="single-rt-banner rt-banner-height rtbgprefix-full"
                style={{ 'backgroundImage': `url(${banner_01})` }}>
                <div className="rt-inner-overlay move-1"
                    style={{ 'backgroundImage':`url(${slider_overlay})` }}>
                </div> 
                <div className="container">
                    <div className="row  rt-banner-height align-items-center">
                        <div className="col-lg-6">
                            <div className="rt-banner-content text-white">

                                <h1>
                                    <span className="d-block f-size-36 f-size-xs-18 rt-light1 rt-mb-10"
                                        data-duration="1s" data-dealy="0.3s" data-animation="wow fadeInUp">I would like
                                        to</span>
                                    <span className="f-size-40 f-size-xs-24 rt-strong rt-mb-13 d-block "
                                        data-duration="1s" data-dealy="0.3s" data-animation="wow fadeInDown">Sell
                                        House</span>
                                </h1>
                                <h4 className="f-size-20 f-size-xs-16 rt-light1" data-duration="1.5s"
                                    data-dealy="0.6s" data-animation="wow fade-in-left">
                                    Now it’s even easier to buy and sell
                                    house.
                                </h4>
                                <Link to="#"
                                    className="rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 long rt-mt-30"
                                    data-duration="1.8s" data-dealy="0.9s" data-animation="wow fadeInUp">List Home
                                    <span><i className="icofont-simple-right"></i></span>
                                </Link>
                            </div> 
                        </div> 
                        <div className="col-lg-6 d-lg-block d-none">
                            <div className="banner-add-img">
                                <img src={pc} alt="pc image" draggable="false" className="front-img"
                                    data-duration="2s" data-dealy="1s" data-animation="fade-in-bottom"/>
                                <img src={sold_tag} alt="sold image" draggable="false"
                                    className="sold_img" data-duration="2.4s" data-dealy="1.4s" data-animation="zoomIn"/>
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
           
         

        {/* start from here  */}
        <div className="single-rt-banner rt-banner-height rtbgprefix-full"
        style={{'backgroundImage':`url(${banner_01})` }}>
            <div className="rt-inner-overlay move-1"
                style={{'backgroundImage':`url(${slider_overlay})` }}>
            </div> 
        <div className="container">
            <div className="row  rt-banner-height align-items-center">
                <div className="col-lg-6">
                    <div className="rt-banner-content text-white">

                        <h1>
                            <span className="d-block f-size-24 f-size-xs-18 rt-light1 rt-mb-10"
                                data-duration="1s" data-dealy="0.3s" data-animation="wow fadeInUp">I would like
                                to</span>
                            <span className="f-size-40 f-size-xs-24 rt-strong rt-mb-13 d-block"
                                data-duration="1s" data-dealy="0.3s" data-animation="wow fadeInDown">Buy
                                House</span>
                        </h1>
                        <h4 className="f-size-20 f-size-xs-16 rt-light1" data-duration="1.5s"
                            data-dealy="0.6s" data-animation="wow fade-in-left">
                            Now it’s even easier to buy and sell
                            house.
                        </h4>
                    </div>
                </div>
                 
            </div>
        </div>
    </div>

        {/* ends here */}


        <div className="rt-dot-list">
            <li className="active">Sell House</li>
            <li>Buy House</li>
        </div>
        </div>
        </section>
        
   

  )
}
export default Slider;
