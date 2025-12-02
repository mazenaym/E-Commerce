import { useState } from 'react';

const SignUp = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Login Form State
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup Form State
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);
    // هنا تضيف الـ API call
  };

  // Handle Signup Submit
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!acceptTerms) {
      alert('Please accept terms and conditions');
      return;
    }
    
    console.log('Signup Data:', signupData);
    // هنا تضيف الـ API call
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h2 className="register">Sign in to your account</h2>
      
      <div className={`container ${isSignUpMode ? 'active' : ''}`}>
        <div className="forms">
          {/* Login Form */}
          <div className="form login">
            <span className="title">Login</span>

            <form onSubmit={handleLoginSubmit}>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                />
                <i className="uil uil-envelope icon"></i>
              </div>

              <div className="input-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="password"
                  placeholder="Enter your password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                />
                <i className="uil uil-lock icon"></i>
                <i 
                  className={`uil ${showPassword ? 'uil-eye' : 'uil-eye-slash'} showHidePw`}
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>

              <div className="checkbox-text">
                <div className="checkbox-content">
                  <input
                    type="checkbox"
                    id="logCheck"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="logCheck" className="text">Remember me</label>
                </div>
                <a href="#" className="text">Forgot password?</a>
              </div>

              <div className="input-field button">
                <button type="submit">Login</button>
              </div>
            </form>

            <div className="login-signup">
              <span className="text">Not a member?
                <a 
                  href="#" 
                  className="text signup-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignUpMode(true);
                    setShowPassword(false);
                  }}
                >
                  Signup Now
                </a>
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <div className="form signup">
            <span className="title">Registration</span>

            <form onSubmit={handleSignupSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                />
                <i className="uil uil-user"></i>
              </div>

              <div className="input-field">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                />
                <i className="uil uil-envelope icon"></i>
              </div>

              <div className="input-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="password"
                  placeholder="Create a password"
                  required
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                />
                <i className="uil uil-lock icon"></i>
              </div>

              <div className="input-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="password"
                  placeholder="Confirm a password"
                  required
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                />
                <i className="uil uil-lock icon"></i>
                <i 
                  className={`uil ${showPassword ? 'uil-eye' : 'uil-eye-slash'} showHidePw`}
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>

              <div className="checkbox-text">
                <div className="checkbox-content">
                  <input
                    type="checkbox"
                    id="termCon"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <label htmlFor="termCon" className="text">
                    I accepted all terms and conditions
                  </label>
                </div>
              </div>

              <div className="input-field button">
                <button type="submit">Signup</button>
              </div>
            </form>

            <div className="login-signup">
              <span className="text">Already a member?
                <a 
                  href="#" 
                  className="text login-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignUpMode(false);
                    setShowPassword(false);
                  }}
                >
                  Login Now
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;