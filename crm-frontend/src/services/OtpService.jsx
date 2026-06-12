import {
    signInWithPhoneNumber
  } from "firebase/auth";
  
  import {
    auth,
    RecaptchaVerifier
  } from "../firebase";
  
  class OtpService {
  
    setupRecaptcha() {
  
      window.recaptchaVerifier =
        new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "normal"
          }
        );
    }
  
    sendOtp(phoneNumber) {
  
      return signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
    }
  }
  
  export default new OtpService();