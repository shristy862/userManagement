import '../login/loginstyle.css';

const LoginForm = ({ handleLogin, email, setEmail, password, setPassword, loading, responseMessage }) => {
  return (
    <div className="login-container bg-white">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col">
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
      
      {/* Display response message */}
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default LoginForm;
