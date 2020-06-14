import React, { useEffect, useState } from 'react';
import breadcump from '../../images/banner/breadcump-img.png';
import { getAllCatagories, submitCategory, deleteCategoryByAdmin } from '../../actions/adactions';
import setAuthToken from '../../utils/setAuthToken';
import { connect } from 'react-redux';
import Alert from '../Layout/Alert';
const Catagories = (props) => {
  const { getAllCatagories, catagories, submitCategory, deleteCategoryByAdmin } = props;

  useEffect(() => {
    setAuthToken(localStorage.token);

    getAllCatagories();

    //getAllusers();
  }, []);
  const [category, setCategory] = useState('');

  const onChange = (e) => {
    setCategory(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    submitCategory(category);
    setCategory('');
  };

  const handledeleteCategoryByAdmin = (e, id) => {
    e.preventDefault()
    deleteCategoryByAdmin(id)
  }

  return (
    <React.Fragment>
      <div className='rt-breadcump rt-breadcump-height breaducump-style-2'>
        <div
          className='rt-page-bg rtbgprefix-full'
          style={{ backgroundImage: `url(${breadcump})` }}
        ></div>
        {/* /.rt-page-bg */}
        <div className='container' style={{ height: '300px' }}>
          <div className='row rt-breadcump-height align-items-center'>
            <div className='col-lg-8 col-xl-7 mx-auto text-center text-white'>
              <h6 className='f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3'>
                {' '}
                Completed Bids Feedback
              </h6>
            </div>
            {/* /.col-12 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </div>

      <div className='container'>
        <h3 class='rt-section-title'> Add Category </h3>
        <div className='row'>
          <div className='col'>
            <Alert />
            <form onSubmit={onSubmit}>
              <input
                type='text'
                placeholder='Enter title'
                name='category'
                value={category}
                onChange={onChange}
              />

              <input type='submit' value='Add Catagery' />
            </form>
          </div>
          <div className='col'>
            {catagories && (
              <card className='card'>
                <div className='card-title'>Catagories </div>
                <div className='card-body'>
                  {catagories.map((catagory) => (
                    <div className="card-header d-flex just justify-content-between align-items-center">
                      <div className=''>{catagory.title}</div>
                      <button onClick={e => handledeleteCategoryByAdmin(e, catagory._id)}>Delete</button>
                    </div>
                  ))}
                </div>
              </card>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const mapper = (state) => ({
  catagories: state.ad.catagories,
});
export default connect(mapper, { getAllCatagories, submitCategory, deleteCategoryByAdmin })(
  Catagories
);
