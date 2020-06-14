import React,{ useState, useEffect} from 'react';
import Ad from './Ad';
import {connect} from 'react-redux'
import { getAds,getAdsofLoginUser } from '../../actions/adactions';
 import setAuthToken from '../../utils/setAuthToken'
import Spinner from '../Layout/Spinner';
const CustomAds=({ad,getAds,getAdsofLoginUser,getAllCatagories})=>{
  
     
    const {ads} = ad;

      useEffect(()=>{
         //  getAds()
        setAuthToken(localStorage.token);
        getAdsofLoginUser()
       
          

      },[])


    if (ads === null && ads.length === 0) {
        
        return <h4>Please add a Ad</h4>;
    
    }
    

      

  
    return <React.Fragment>
        { ads.length === 0 ? (
           
           <div className="alert alert-danger" style={{ 'marginTop':'30px', 'fontSize':'30px','color':'red','marginLeft':'150px' }}>
                    No Ads available so far 
           </div>
          
             
        ):
            
            ads.map((ad)=>(
            <Ad ad={ad} key={ad.id}/>
         ))}
       
    </React.Fragment>
}

const mapper=state=>({
    'ad':state.ad,
    
})
export default 
connect(mapper,{getAds,getAdsofLoginUser})
(CustomAds);


/*

[
    {
        id:1, name:atif
    },
    {
        id:2, name:talha
    }
]

*/