import React, { useState  } from "react";
const Counter = ({ time }) => {


     
  const [t, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  var countDownDate = new Date(time).getTime();

  // Update the count down every 1 second


  setTimeout(()=>{

    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimer({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });
  },1000)


   
  const { days, hours, minutes, seconds } = t;
  return (
    
    
    <p>
      {days}  {"d  "} {hours + " h " + minutes + " m " + seconds + " s"}
    </p>
  );
};

export default Counter;
