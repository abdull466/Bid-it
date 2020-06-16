import React from 'react';
import cover from '../../images/banner/breadcump-img.png';

var a = localStorage.getItem('chatID')
var url = "https://webbiding-chatapp.firebaseapp.com/login/" + a
const CHAT = (props) => {
    return (
        <React.Fragment>
            <div className='rt-breadcump rt-breadcump-height breaducump-style-2'>
                <div
                    className='rt-page-bg rtbgprefix-full'
                    style={{ backgroundImage: `url(${cover})` }}
                ></div>
                {/* /.rt-page-bg */}
                <div className='container'>
                    <div className='row rt-breadcump-height align-items-center'>
                        <div className='col-lg-12 mx-auto text-center text-white'>
                            <h4 className='f-size-70 f-size-lg-50 f-size-md-40 f-size-xs-24 rt-strong'>
                                CHAT
              </h4>
                            <h4 className='f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3'>
                                Bid-It also provide the P-2-P chat between buyers and sellers...
              </h4>

                        </div>
                        {/* /.col-12 */}
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container */}
            </div>

            <section className='page-content-area bg-elements-parent'>
                {/* <div
          className='rt-bg-elemtnts shape-right-4 rtbgprefix-contain'
          style={{ backgroundImage: `url(https://peerbits-wpengine.netdna-ssl.com/wp-content/uploads/2019/11/digital-wallet-payment-be-the-leaders.png)` }}
        ></div> */}
                {/* /.rt-bg-elemtnts */}
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-8 col-lg-10'>
                            <h2 className='rt-section-title'>Chat</h2>
                            <p className='rt-light3 f-size-18 line-height-34'>
                                Bid-It also provide the P-2-P chat between buyers and sellers...
                          </p>


                        </div>
                        {/* /.col-lg-7 */}
                    </div>
                    {/* /.row */}
                    <div >
                        <br></br><br></br>
                        < iframe
                            width="100%"
                            height="500px"
                            src={url}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen="false"
                            className="video__iframe"
                        />  </div>
                    {/* /.rt-spacer-60 */}
                    {/* /.row */}
                </div>
                {/* /.container */}
            </section>
        </React.Fragment>
    );
};

export default CHAT
