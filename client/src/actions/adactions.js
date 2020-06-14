import axios from 'axios';
import swal from 'sweetalert';
import {
  GET_ADS,
  AD_ERROR,
  DELETE_AD,
  ADD_AD,
  GET_AD,
  GET_COMPLETED_ADS,
  ADD_CATEGORY,
  ADD_BID,
  GET_CURRENT_AD,
  GET_CATAGORIES,
  SUBMIT_PAYMENT,
  REMOVE_BID,
  UPDATE_AD,
  CLEAR_AD,
  GET_AUCTIONS,
  APPROVE_BID,
  GET_APPROVED_BIDS,
  SUBMIT_FEEDBACK,
  SUBMIT_ADITIONAL_FEEDBACK,
  GET_ALL_ADS_TODAY,
  CATEGORY_ERROR,
  DELETE_CATEGORY_ADMIN,
  DELETE_AD_ADMIN,
  BLOCK_AD_ADMIN
} from './types';
import { setAlert } from './alert';

export const getAdsofLoginUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/ads/fetch');

    dispatch({
      type: GET_ADS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const getApprovedAdsofLoginUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/ads/fetch/approved');

    dispatch({
      type: GET_APPROVED_BIDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const getCompletedAdsofLoginUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/ads/fetch/completed');

    dispatch({
      type: GET_COMPLETED_ADS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err },
    });
  }
};

// Get Ads

export const getAds = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/ads');

    dispatch({
      type: GET_AUCTIONS,
      payload: res.data

    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const getAllAds = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/ads/admin/fetch/all');

    dispatch({
      type: GET_AUCTIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const getAllCatagories = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/ads/fetch/catagories');

    dispatch({
      type: GET_CATAGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const getAllAdsOfCurrentDay = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/ads/admin/fetch/all/today');

    dispatch({
      type: GET_ALL_ADS_TODAY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

//submit catagory

export const submitCategory = (catagory) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const data = { title: catagory };
    const res = await axios.post(
      '/api/ads/admin/create/category',
      data,
      config
    );

    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    });

    dispatch(setAlert('Catagory added successfully', 'success'));
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
    });

    dispatch(setAlert('something goes wrong please try again', 'danger'));
  }
};

// Get Single Ad
export const getAd = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/ads/${id}`);

    dispatch({
      type: GET_AD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const getCurrentAd = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/ads/${id}`);

    dispatch({
      type: GET_CURRENT_AD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message },
    });
  }
};

// Delete Ad
export const deleteAd = (id) => async (dispatch) => {
  try {
    const willDelete = await swal({
      title: 'Are you sure?',
      text:
        'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (willDelete) {
      const res = await axios.delete(`/api/ads/${id}`);

      dispatch({
        type: DELETE_AD,
        payload: id,
      });

      dispatch(setAlert('Ad Removed', 'success'));
      swal('Poof! Your Ad has been delete!', {
        icon: 'success',
      });
    } else {
      swal('Ad delete cancelled!');
    }
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

// submit feedback

export const submitFeedback = (adId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/api/ads/feedback/${adId}`, formData, config);

    dispatch({
      type: SUBMIT_FEEDBACK,
      payload: res.data,
    });

    dispatch(setAlert('Feedback submitted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const submitAditionalFeedback = (adId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {

    const res = await axios.post(`/api/ads/AditionalFeedback/${adId}`, formData, config);

    dispatch({
      type: SUBMIT_ADITIONAL_FEEDBACK,
      payload: res.data,
    });

    dispatch(setAlert('Aditional Feedback submitted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

//issue payment
export const submitPayment = (adId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/api/ads/payment/${adId}`, formData, config);

    dispatch({
      type: SUBMIT_PAYMENT,
      payload: res.data,
    });

    dispatch(setAlert('Payment submitted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

//confirm delete
export const deleteconfirmAd = (id) => async (dispatch) => {
  try {
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

//update Ad

export const editAd = (ad, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.put(`/api/ads/${id}`, ad, config);
    dispatch({
      type: UPDATE_AD,
      payload: response.data,
    });
    dispatch({
      type: CLEAR_AD,
    });
  } catch (error) {
    dispatch({
      type: AD_ERROR,
      payload: error.message,
    });
  }
};

//close ad

export const closeAd = (id, closebid) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.put(
      `/api/ads/close/done/${id}`,
      { closebid: !closebid },
      config
    );
    dispatch({
      type: UPDATE_AD,
      payload: response.data,
    });
    dispatch({
      type: CLEAR_AD,
    });
  } catch (error) {
    dispatch({
      type: AD_ERROR,
      payload: error.message,
    });
  }
};

// Add Ad/Post
export const addAd = (formData) => async (dispatch) => {
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };

  console.log("FormData : " + JSON.stringify(formData))
  try {
    const res = await axios.post('/api/ads', formData);

    dispatch({
      type: ADD_AD,
      payload: res.data,
    });

    dispatch(setAlert('Ad Posted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

// Add comment

//approve bid to specific user

export const approveBid = (id, bidid, user, price) => async (dispatch) => {
  try {
    const response = await axios.put(
      `/api/ads/bid/approve/${id}/${bidid}/${user}/${price}`
    );

    dispatch({
      type: APPROVE_BID,
      payload: response.data,
    });

    dispatch(getAdsofLoginUser);
  } catch (error) {
    dispatch({
      type: AD_ERROR,
    });
  }
};

// revert bid

export const revertBid = (id, bidid, user, price) => async (dispatch) => {
  try {
    const response = await axios.put(
      `/api/ads/bid/revert/${id}//${bidid}/${user}/${price}`
    );

    dispatch({
      type: APPROVE_BID,
      payload: response.data,
    });

    dispatch(getAdsofLoginUser);
  } catch (error) {
    dispatch({
      type: AD_ERROR,
    });
  }
};

// Add bid
export const addBid = (adId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/api/ads/bid/${adId}`, formData, config);

    if (res.data.status === 201) {
      dispatch(setAlert("You can't bid on your ad", 'danger'));
    } else {
      dispatch({
        type: ADD_BID,
        payload: res.data,
      });

      dispatch(getCurrentAd(adId));

      dispatch(setAlert('Bid has been successfully done ', 'success'));
    }
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

// Delete comment
export const deleteBid = (adId, bidId) => async (dispatch) => {
  try {
    await axios.delete(`/api/ads/bid/${adId}/${bidId}`);

    dispatch({
      type: REMOVE_BID,
      payload: bidId,
    });

    dispatch(setAlert('BID Removed', 'success'));
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
};

export const deleteCategoryByAdmin = (id) => async dispatch => {
  try {
    await axios.delete(`/api/ads/admin/categories/${id}`);

    dispatch({
      type: DELETE_CATEGORY_ADMIN,
      payload: id,
    });

    dispatch(setAlert('Category Removed', 'success'));
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
}

export const deleteAdByAdmin = (id) => async dispatch => {
  try {
    console.log('ADMIN')
    await axios.delete(`/api/ads/admin/ads/${id}`);

    dispatch({
      type: DELETE_AD_ADMIN,
      payload: id,
    });

    dispatch(setAlert('Ads Removed', 'success'));
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: { msg: err.message }
    });
  }
}

export const blockAdByAdmin = (id, sts) => async dispatch => {
  if (window.confirm('Are you sure to ' + sts + ' the Add?')) {
    try {
      await axios.post(`/api/ads/admin/ads/block/${id}/${sts}`);

      dispatch({
        type: BLOCK_AD_ADMIN,
        payload: { id }
      });
      window.location.reload();
      // dispatch(setAlert('User Deleted'));
    } catch (err) {
      dispatch({
        type: AD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
