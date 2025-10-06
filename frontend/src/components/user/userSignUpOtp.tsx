import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resendOtp, verifySignUpOtp } from '../../service/userService';
import { toast } from 'react-toastify';

const UserSignUpOtp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const email = location?.state.email;
  const name = location?.state.name;
  const mobile = location?.state.mobile;
  const password = location?.state.password
  const navigate = useNavigate();


  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (error) setError('');

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    else if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, 4).split('');
        const newOtp = [...otp];
        digits.forEach((digit, i) => {
          if (i < 4) newOtp[i] = digit;
        });
        setOtp(newOtp);
        const nextIndex = Math.min(digits.length, 3);
        inputRefs.current[nextIndex]?.focus();
      });
    }
  };

  // const validateOTP = (): boolean => {
  //   const otpValue = otp.join('');
  //   if (otpValue.length !== 4) {
  //     setError('Please enter the complete 4-digit OTP');
  //     return false;
  //   }
  //   return true;
  // };

  const handleSubmit = async () => {
    // if (!validateOTP()) return;

    setIsLoading(true);

    try {
      const otpValue = otp.join('');
      console.log('OTP submitted:', otpValue);
      const response = await verifySignUpOtp(email, Number(otpValue));
      console.log(response.data.message, "MEssage")
      if (response.data.message === 'Otp Verified') {
        toast.success("Otp Verified")
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      const axiosError: any = error;
      console.error('OTP verification error:', axiosError.response.data);
      if (axiosError.response.data.errors.otp === 'OTP must be exactly 4 digits') {
        console.log('heyeee');
        setError('OTP must be exactly 4 digits');
      } else if (axiosError.response.data.message == 'Invalid Otp') {
        setError('Invalid Otp')
      } else if (axiosError.response.data.message == 'Otp Expired') {
        setError('Otp Expired')
      }
      // setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      const response = await resendOtp(email, name, mobile, password);
      console.log(response, 'Response')
      if (response.data.message == 'Otp Created') {
        toast.success('OTP resent successfully')
      }
      setTimer(60);
      setCanResend(false);
      setError('');
    } catch (error) {
      console.log(error);
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const navigateToLogin = () => {
    alert('Navigate to Login page');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Verify OTP
          </h2>
          <p className="text-gray-600 mb-2">
            We've sent a 4-digit verification code to
          </p>
          <p className="text-indigo-600 font-semibold">
            your registered email address
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
              Enter 4-digit OTP
            </label>

            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el: HTMLInputElement | null) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none transition-all duration-200 ${error
                      ? 'border-red-300 bg-red-50 text-red-700'
                      : digit
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 bg-gray-50 text-gray-900 hover:border-gray-400'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white`}
                  placeholder="0"
                />
              ))}
            </div>

            {error && (
              <div className="mt-3 text-center">
                <p className="text-sm text-red-600 flex items-center justify-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white ${isLoading || otp.join('').length !== 4
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
                } shadow-lg`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verify OTP
                </span>
              )}
            </button>
          </div>

          <div className="text-center mt-6">
            <div className="text-sm text-gray-600 mb-3">
              {!canResend ? (
                <span>Resend OTP in {timer}s</span>
              ) : (
                <span>Didn't receive the code?</span>
              )}
            </div>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={!canResend}
              className={`text-sm font-medium transition-colors ${canResend
                  ? 'text-indigo-600 hover:text-indigo-500 cursor-pointer'
                  : 'text-gray-400 cursor-not-allowed'
                }`}
            >
              Resend OTP
            </button>
          </div>

          <div className="text-center mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Having trouble?</span>
              </div>
            </div>

            <div className='mt-3'>
              <button
                type='button'
                onClick={navigateToLogin}
                className='font-semibold text-indigo-600 hover:text-indigo-500 transition-colors'
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUpOtp;