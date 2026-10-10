import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState('info');
  const [cameraOpen, setCameraOpen] = React.useState(false);
  const videoRef = React.useRef(null);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraOpen(false);
  };

  const requestFaceLogin = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus('error');
      setMessage('Face login is not supported on this device. Please use your password or PIN.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOpen(true);
      setStatus('success');
      setMessage('Camera access granted. Face verification is ready.');
    } catch (error) {
      stopCamera();
      setStatus('error');
      setMessage('Camera permission denied. You can continue with your password or PIN.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setStatus('error');
      setMessage('Please enter both your email and password.');
      return;
    }

    setStatus('success');
    setMessage('Secure login successful. Welcome back.');
    stopCamera();
  };

  return (
    <div className="bank-app">
      <div className="bank-card">
        <div className="brand-row">
          <div className="brand-badge">B</div>
          <span className="brand-name">BankSecure</span>
        </div>

        <h1>Welcome back</h1>
        <p className="subtitle">Secure access to your mobile banking account.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@banksecure.com"
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="row">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button className="primary-btn" type="submit">Sign in</button>
        </form>

        <button className="secondary-btn" type="button" onClick={requestFaceLogin}>
          Use face login
        </button>

        <button className="fallback-btn" type="button" onClick={stopCamera}>
          Use PIN / password instead
        </button>

        {cameraOpen && (
          <div className="camera-panel">
            <video ref={videoRef} autoPlay playsInline muted />
          </div>
        )}

        {message && (
          <div className={`status-box ${status}`}>
            {message}
          </div>
        )}

        <div className="security-note">
          Camera permission is optional. If you deny it, the app remains secure and continues with your password or PIN.
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
