import { auth } from "../Config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthErrorCodes } from "firebase/auth";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from 'react';
import React, { useState } from "react";
const Auth = () => {

    
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
        

    const createAccount = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential);
            setIsCreated(true);
          })
          .catch((error) => {
            console.log(error);
            if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
              setErrorMessage("Email already exists!");
            } else {
              setErrorMessage(error.message);
            }
          });
      };
      



    const signIn = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          window.location.href = "/#"; //successfully log unoth redirect wenna oona page eka.
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/wrong-password") {
            setErrorMessage("Incorrect email or password!!");
          } else {
            setErrorMessage(error.message);
          }
        });
      };



    useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");
    
    
        sign_up_btn.addEventListener("click", () => {
          container.classList.add("sign-up-mode");
          //createUserFromUID(formData.username,formData.email,formData.password);
        });
    
    
        sign_in_btn.addEventListener("click", () => {
         container.classList.remove("sign-up-mode");
        });
    
        const htmlEl = document.getElementsByTagName("html")[0];
        const currentTheme = localStorage.getItem("theme")
          ? localStorage.getItem("theme")
          : null;
        if (currentTheme) {
          htmlEl.dataset.theme = currentTheme;
        }
        const toggleTheme = (theme) => {
          htmlEl.dataset.theme = theme;
          localStorage.setItem("theme", theme);
        };
    
        /*const togglePassword = document.querySelector("#togglePassword");
        const password = document.querySelector("#id_password");
    
        togglePassword.addEventListener("click", function (e) {
          const type =
            password.getAttribute("type") === "password" ? "text" : "password";
          password.setAttribute("type", type);
          this.classList.toggle("fa-eye-slash");
        });
    
        const toggleReg = document.querySelector("#toggleReg");
        const pass = document.querySelector("#id_reg");
    
        toggleReg.addEventListener("click", function (e) {
          const type = pass.getAttribute("type") === "password" ? "text" : "password";
          pass.setAttribute("type", type);
          this.classList.toggle("fa-eye-slash");
          
        });*/
      }, []);




  return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
          <div className="container">
            <div className="forms-container">
              <div className="signin-signup">
                
                
                <form onSubmit={signIn} className="sign-in-form">
                  <h2 className="title">Login</h2>
                  <div className="input-field">
                    <i className="fas fa-user" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-lock" />
                    <input 
                    type="password"  
                    placeholder="Password"  
                    required="yes" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     /> 
                  <i className="far fa-eye" id="togglePassword" style={{cursor: 'pointer'}} />
                  </div>
                  <a className="pass" href="#">Forgot your password?</a>
                  <label className="check">
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark">Keep Me Logged</span>
                  </label>
                  <input type="submit" defaultValue="Sign in" className="btn solid" />

                  {errorMessage && (//msg eke color ek chnge krnn use karapu css eka.
                                  <p
                                    style={{
                                      color: "red",
                                      animation: "flash linear 3s infinite",
                                    }}
                                  >
                                    <i className="fas fa-exclamation-triangle"></i> {errorMessage}
                                  </p>
                                )}
                                <style>{`
                                  @keyframes flash {
                                    0% {
                                      opacity: 1;
                                    }
                                    50% {
                                      opacity: 0;
                                    }
                                    100% {
                                      opacity: 1;
                                    }
                                  }
                                `}</style>
                  

                  <p className="social-text">You can login with:</p>
                  <div className="social-media">
                    <a href="#" className="social-icon" aria-label="Register with Google">
                      <i className="fab fa-google" />
                    </a>
                    <a href="#" className="social-icon" aria-label="Register with Discord">
                      <i className="fab fa-discord" />
                    </a>
                    <a href="#" className="social-icon" aria-label="Register with Twitter">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="#" className="social-icon">
                      <i className="fab fa-facebook-f" aria-label="Register with Facebook" />
                    </a>
                  </div>
                  <div className="social-media">
                    <a className="icon-mode" onclick="toggleTheme('dark');"><i className="fas fa-moon" /></a>
                    <a className="icon-mode" onclick="toggleTheme('light');"><i className="fas fa-sun" /></a>
                  </div>
                  <p className="text-mode">Change theme</p>
                </form>








                <form onSubmit={createAccount} className="sign-up-form">
                  <h2 className="title">Register</h2>
                  
                  <div className="input-field">
                    <i className="fas fa-envelope" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-lock" />
                    <input 
                    type="password"  
                    placeholder="Password"  
                    required="yes" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     /> 
                    <i className="far fa-eye" id="toggleReg" style={{cursor: 'pointer'}} />
                  </div>
                  <button type="submit"  className="btn solid" >Submit</button>

                  {isCreated && <p>Account created successfully!</p>}
                  {errorMessage && (//msg eke color ek chnge krnn use karapu css eka.
                                  <p
                                    style={{
                                      color: "red",
                                      animation: "flash linear 3s infinite",
                                    }}
                                  >
                                    <i className="fas fa-exclamation-triangle"></i> {errorMessage}
                                  </p>
                                )}
                                <style>{`
                                  @keyframes flash {
                                    0% {
                                      opacity: 1;
                                    }
                                    50% {
                                      opacity: 0;
                                    }
                                    100% {
                                      opacity: 1;
                                    }
                                  }
                                `}</style>
                  <p className="social-text">You can register with:</p>
                  <div className="social-media">
                    <a href="#" className="social-icon" aria-label="Register with Google">
                      <i className="fab fa-google" />
                    </a>
                    <a href="#" className="social-icon" aria-label="Register with Discord">
                      <i className="fab fa-discord" />
                    </a>
                    <a href="#" className="social-icon" aria-label="Register with Twitter">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="#" className="social-icon">
                      <i className="fab fa-facebook-f" aria-label="Register with Facebook" />
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <div className="panels-container">
              <div className="panel left-panel">
                <div className="content">
                  <p>
                    <font size={300} face="arial">
                      CLASSIFIE
                    </font>
                  </p>
                  <h3>Are You Tired of Struggling with Your Education work? Let Us Help Make it Easy for You! </h3>
                  <p> Simply Create an Account And Get Started Today!</p>
                  <button className="btn transparent" id="sign-up-btn">Register</button>
                  <div className="created">
                    <p>Powered by&nbsp;<a> I O T A</a></p>
                  </div>
                </div>
                <img src="img/log.svg" className="image" alt="" />
              </div>
              <div className="panel right-panel">
                <div className="content">
                  <h3>Already have an account?</h3>
                  <p>Great to see you again! Please log in to your Account to get started</p>
                  <button className="btn transparent" id="sign-in-btn">Sign in</button>
                </div>
                <img src="img/register.svg" className="image" alt="" />
              </div>
            </div>
          </div>
          <script>
            
          </script>
        
        </div>
      );
};

export default Auth;