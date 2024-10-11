import { useState } from 'react';
import '../login/loginstyle.css';
import ForgotPasswordModal from '../components/forgotPassword';

const LoginForm = ({
  handleSignup,
  handleLogin,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  responseMessage,
  name,
  setName, 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={`login-container ${isFlipped ? 'flip-active' : ''}`}>
    <div className="container">
      {!isFlipped ? (
        <>
          <h1>Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col text-black">
            <div className="form-group">
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {responseMessage && <p className="response-message">{responseMessage}</p>}

          <p className="signup-link">
            Didn’t have an account?{' '}
            <button onClick={handleFlip} className="flip-button"><h5>Signup</h5></button>
          </p>
          <p className="forgot-password" onClick={showModal} style={{ cursor: 'pointer', color: 'blue' }}>
            Forgot Password?
          </p>

         {/* Forgot Password Modal */}
         <ForgotPasswordModal open={isModalVisible} onClose={handleCloseModal} />
          </>
      ) : (
        <div className="signup">
          <div className="box text-black">
            <h1 className='sign'>Signup</h1><br />
            <form onSubmit={handleSignup}>
              <div className="form-group flex flex-col">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="form-group ">
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Signing up...' : 'Signup'}
              </button>
            </form>
            <p className="login-link">
              Already have an account?{' '}
              <button onClick={handleFlip} className="flip-button">
                <h5>Back to Login</h5>
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default LoginForm;
