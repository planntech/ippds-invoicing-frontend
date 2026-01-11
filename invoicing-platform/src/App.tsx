import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/main-phase1/DashboardPage';

// External Payment Pages (No auth required)
import CustomerPaymentPage from './pages/main-phase3/PaymentGateway/CustomerPaymentPage';
import PaymentExpiredPage from './pages/main-phase3/PaymentGateway/PaymentExpiredPage';
import PaymentAlreadyPaidPage from './pages/main-phase3/PaymentGateway/PaymentAlreadyPaidPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Dashboard route (protected - requires auth) */}
        <Route path="/dashboard" element={<DashboardPage children={undefined} />} />
        
        {/* External Payment Links (public - no auth required) */}
        <Route path="/pay/xyz789ghi012" element={<CustomerPaymentPage />} />
        <Route path="/pay/expired" element={<PaymentExpiredPage />} />
        <Route path="/pay/completed" element={<PaymentAlreadyPaidPage />} />
        
        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;