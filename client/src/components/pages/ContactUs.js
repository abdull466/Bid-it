import React from 'react';
import breadcump from "../../images/banner/breadcump-img.png";
const ContactUs = (props) => {
  
    return(
        <React.Fragment>
        <div class="rt-breadcump rt-breadcump-height breaducump-style-2">
    <div class="rt-page-bg rtbgprefix-full" style={{ backgroundImage:`url(${breadcump})` }} >
    </div>
    {/* /.rt-page-bg */}
    <div class="container">
        <div class="row rt-breadcump-height align-items-center">
            <div class="col-lg-12 mx-auto text-center text-white">
                <h4 class="f-size-70 f-size-lg-50 f-size-md-40 f-size-xs-24 rt-strong">Contact Us</h4>
                <h4 class="f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3"> We're ready and waiting for your questions</h4>
                
            </div>{/* /.col-12 */}
        </div>{/* /.row */}
    </div>{/* /.container */}
</div>{/* /.rt-bredcump */}



<div class="page-content">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <h2 class="rt-section-title">
                    Get in touch
                </h2>
                <p class="rt-light3 f-size-18 line-height-34 rt-mb-0">
                   Please complete the form below and one of our
                   team members will get in touch with you as soon
                   as possible.

                </p>
                <div class="rt-spacer-60"></div>{/* /.rt-spacer-60 */}
                <form action="#" class="rt-form rt-line-form">
                    <div class="single-in">
                        <label for="s" class="f-size-14 text-878  text-capitalize">name:</label>
                        <input type="text"  id="s" class="form-control rt-mb-15"/>
                    </div>{/* /.single-in */}
                    <div class="single-in">
                        <label for="ss" class="f-size-14 text-878  text-capitalize">email:</label>
                        <input type="email"  id="ss" class="form-control rt-mb-15"/>
                    </div>{/* /.single-in */}
                    <div class="single-in">
                        <label for="sss" class="f-size-14 text-878  text-capitalize">subject:</label>
                        <input type="text" id="sss" class="form-control rt-mb-15"/>
                    </div>{/* /.single-in */}
                    <div class="single-in">
                        <label for="t" class="f-size-14 text-878  text-capitalize">phone:</label>
                        <input type="tel" id="t" class="form-control rt-mb-15"/>
                    </div>{/* /.single-in */}
                    <div class="single-in bg-elements-parent">
                        <label for="t" class="f-size-14 text-878  text-capitalize">Message:</label>
                        <textarea class="form-control rt-mb-30"></textarea>{/* /# */}
                        <div class="submit-circle">
                            <button class="rt-icon rt-hw-66 rt-circle f-size-40 icon-dark" type="submit">
                                <i class="icofont-paper-plane"></i>
                            </button>
                        </div>{/* /.submit-circle */}
                    </div>{/* /.single-in */}
                </form>
            </div>{/* /.col-lg-6 */}
            <div class="col-lg-6 text-center d-none d-lg-block">
                <img src="assets/images/all-img/conn.png" alt="contact image" draggable="false"/>
            </div>{/* /.col-lg-6 */}
        </div>{/* /.row */}
    </div>{/* /.container */}
</div>{/* /.page-content */}
</React.Fragment>
    )
}

export default ContactUs;
