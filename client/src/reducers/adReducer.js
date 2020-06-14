import {
  GET_ADS,
  AD_ERROR,
  DELETE_AD,
  ADD_AD,
  GET_AD,
  ADD_BID,
  REMOVE_BID, GET_AUCTIONS, GET_COMPLETED_ADS,
  UPDATE_AD, CLEAR_AD, GET_CURRENT_AD, APPROVE_BID, GET_APPROVED_BIDS, SUBMIT_FEEDBACK, GET_ALL_ADS_TODAY,
  GET_CATAGORIES,
  ADD_CATEGORY,
  CATEGORY_ERROR,
  SUBMIT_PAYMENT,
  DELETE_CATEGORY_ADMIN,
  DELETE_AD_ADMIN
} from "../actions/types";

const initialState = {
  ads: [],
  auctions: [],

  ad: null,
  current_ad: null,
  approved_bids: [],
  loading: true,
  error: {},
  feedback: [],
  completed: [],
  todayads: [],
  catagories: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ADS:
      return {
        ...state,
        ads: payload,
        loading: false
      };

    case GET_AUCTIONS:
      return {
        ...state,
        auctions: payload,
        loading: false
      };

    case GET_CATAGORIES:
      return {
        ...state,
        catagories: payload,
        loading: false
      }

    case ADD_CATEGORY:
      return {
        ...state,
        catagories: [...state.catagories, payload],
        loading: false
      }

    case CATEGORY_ERROR:
      return {
        ...state,
        loading: false
      }


    case GET_ALL_ADS_TODAY:
      return {
        ...state,
        todayads: payload,
        loading: false
      }
    case GET_AD:
      return {
        ...state,
        ad: payload,
        loading: false
      };

    case GET_CURRENT_AD:
      return {
        ...state,
        current_ad: payload,
        loading: false
      };
    case SUBMIT_PAYMENT:
    case GET_APPROVED_BIDS:
      return {
        ...state,
        approved_bids: payload,
        loading: false
      };

    case GET_COMPLETED_ADS:
      return {
        ...state,
        completed: payload,
        loading: false
      };



    case ADD_AD:
      return {
        ...state,
        ads: [payload, ...state.ads],
        loading: false
      };
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter(ad => ad._id !== payload),
        loading: false
      };

    case UPDATE_AD:
    case APPROVE_BID:
      return {
        ...state,
        ads: state.ads.map((ad) => ad = ad._id === action.payload._id ? action.payload : ad),
        loading: false
      };





    case CLEAR_AD:
      return {
        ...state,
        ad: null,
        loading: false
      }
    case AD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };


    case SUBMIT_FEEDBACK:
      return {
        ...state,
        feedback: payload,
        loading: false
      };

    case ADD_BID:
      return {
        ...state,

        loading: false
      };

    case REMOVE_BID:
      return {
        ...state,
        ad: {
          ...state.ad,
          comments: state.ad.bids.filter(bid => bid._id !== payload)
        },
        loading: false
      };

    case DELETE_CATEGORY_ADMIN: {
      return {
        ...state,
        catagories: [...state.catagories.filter(catagory => catagory._id !== payload)],
        loading: false
      }
    }

    case DELETE_AD_ADMIN: {
      return {
        ...state,
        auctions: [...state.auctions.filter(auction => auction._id !== payload)],
        loading: false
      }
    }

    default:
      return state;
  }
}
