import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import React, {useState } from "react";

const mobileNum = () => {
  const [value, setValue] = useState();
  var country = document.getElementById('country').value;
  if (country == "ZZ"){
    country = "IN"
  }
  var mobile_no = document.getElementsByClassName("PhoneInputInput");
  if (mobile_no.length >= 1 ){
    mobile_no[0].setAttribute("id", "mobile_no");
    mobile_no[0].setAttribute("name", "kyc_detail[mobile_no]");
  }
  return (
    <PhoneInput 
      defaultCountry={country}
      placeholder="Enter your mobile number"
      value={value}
      onChange={setValue}/>
  )
}

export default mobileNum;