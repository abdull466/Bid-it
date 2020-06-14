import React from 'react';
import shaperight2 from '../../images/all-img/shape-right-2.png';
const FAQ = (props) => {
  return (
    <React.Fragment>
      <div class='rt-spacer-100  rt-spacer-xs-50'></div>
      {/* /.rt-spacer-244 */}
      <section class='faq-area bg-elements-parent'>
        <div
          class='rt-bg-elemtnts shape-right-2 rtbgprefix-contain'
          style={{ backgroundImage: `url(${shaperight2})` }}
        ></div>
        {/* /.rt-bg-elemtnts */}
        <div class='container'>
          <div class='row'>
            <div class='col-lg-9'>
              <h2 class='rt-section-title'>Frequently Asked Questions</h2>
              <p class='rt-light3 line-height-34 rt-mb-0 section-p-content'>
                Find answers to the most frequently asked questions here
              </p>
              <div class='rt-spacer-30'></div>
              {/* /.rt-spacer-60 */}
              <div id='accordion'>
                <div class='card wow fadeInUp'>
                  <div class='card-header card-primary' id='headingOne'>
                    <h5 class='mb-0'>
                      <button
                        class='btn btn-link'
                        data-toggle='collapse'
                        data-target='#collapseOne'
                        aria-expanded='true'
                        aria-controls='collapseOne'
                      >
                        What is Bid-It?
                      </button>
                    </h5>
                  </div>

                  <div
                    id='collapseOne'
                    class='collapse show'
                    aria-labelledby='headingOne'
                    data-parent='#accordion'
                  >
                    <div class='card-body section-p-content'>
                      Bid-It is the world’s free marketplace, listing more than
                      7 million products available for sale and purchase more
                      than 5 million successful sales.Whether you are a product
                      buyer or a product seller.
                    </div>
                  </div>
                </div>
                {/* end single accrodain */}
                <div class='card wow fadeInUp' data-wow-duration='1.0s'>
                  <div class='card-header card-primary' id='headingTwo'>
                    <h5 class='mb-0'>
                      <button
                        class='btn btn-link collapsed'
                        data-toggle='collapse'
                        data-target='#collapseTwo'
                        aria-expanded='false'
                        aria-controls='collapseTwo'
                      >
                        How do I join Bid-It?
                      </button>
                    </h5>
                  </div>
                  <div
                    id='collapseTwo'
                    class='collapse'
                    aria-labelledby='headingTwo'
                    data-parent='#accordion'
                  >
                    <div class='card-body'>
                      If you are a product buyer or a product seller, Bid-It is
                      the most trusted name in Online Auction.
                    </div>
                  </div>
                </div>
                {/* end single accrodain */}
                <div class='card wow fadeInUp' data-wow-duration='1.5s'>
                  <div class='card-header card-primary' id='headingThree'>
                    <h5 class='mb-0'>
                      <button
                        class='btn btn-link collapsed'
                        data-toggle='collapse'
                        data-target='#collapseThree'
                        aria-expanded='false'
                        aria-controls='collapseThree'
                      >
                        What is auction?
                      </button>
                    </h5>
                  </div>
                  <div
                    id='collapseThree'
                    class='collapse'
                    aria-labelledby='headingThree'
                    data-parent='#accordion'
                  >
                    <div class='card-body'>
                      An auction is usually a process of buying and selling
                      goods or services by offering them up for bid, taking
                      bids, and then selling the item to the highest bidder or
                      buying the item from the lowest bidder.
                    </div>
                  </div>
                </div>
                {/* end single accrodian */}
                <div class='card wow fadeInUp' data-wow-duration='2s'>
                  <div class='card-header card-primary' id='qcollapsefour'>
                    <h5 class='mb-0'>
                      <button
                        class='btn btn-link collapsed'
                        data-toggle='collapse'
                        data-target='#collapsefour'
                        aria-expanded='false'
                        aria-controls='collapsefour'
                      >
                        How can I get car in front of more buyers?
                      </button>
                    </h5>
                  </div>
                  <div
                    id='collapsefour'
                    class='collapse'
                    aria-labelledby='qcollapsefour'
                    data-parent='#accordion'
                  >
                    <div class='card-body'>By bidding higher as you can.</div>
                  </div>
                </div>
                {/* end single accrodian */}
                <div class='card wow fadeInUp' data-wow-duration='2s'>
                  <div class='card-header card-primary' id='qcollapsefouree'>
                    <h5 class='mb-0'>
                      <button
                        class='btn btn-link collapsed'
                        data-toggle='collapse'
                        data-target='#collapsefouree'
                        aria-expanded='false'
                        aria-controls='collapsefouree'
                      >
                        How do I get paid for my house sales?
                      </button>
                    </h5>
                  </div>
                  <div
                    id='collapsefouree'
                    class='collapse'
                    aria-labelledby='qcollapsefouree'
                    data-parent='#accordion'
                  >
                    <div class='card-body'>
                      By collaborating with the buyer of the product.
                    </div>
                  </div>
                </div>
                {/* end single accrodian */}
              </div>
              {/* end accrodian group */}
            </div>
            {/* /.col-lg-9 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </section>
    </React.Fragment>
  );
};

export default FAQ;
