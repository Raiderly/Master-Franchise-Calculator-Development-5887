import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiUserPlus, FiHelpCircle } = FiIcons;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const { signIn, signUp, resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        toast.error(error.message);
      } else if (!isLogin) {
        toast.success('Account created successfully!');
        setIsLogin(true); // Switch back to login view
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await resetPassword(resetEmail);
      
      if (error) {
        toast.error(error.message);
      } else {
        setResetSent(true);
        toast.success('Password reset instructions sent to your email!');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
      >
        <motion.div 
          variants={itemVariants}
          className="text-center mb-8"
        >
          <img 
            src="https://app1.sharemyimage.com/2025/07/17/ufg-centered-stacked-logo-full-color-rgb-900px-w-72ppi.webp" 
            alt="UFG Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h2 className="text-2xl font-montserrat font-bold text-primary mb-2">
            {showResetPassword 
              ? 'Reset Your Password' 
              : isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 font-open-sans">
            {showResetPassword 
              ? 'Enter your email to receive reset instructions' 
              : isLogin ? 'Sign in to access your calculator' : 'Join to start calculating'}
          </p>
        </motion.div>

        {showResetPassword ? (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-open-sans">
                Email Address
              </label>
              <div className="relative">
                <SafeIcon 
                  icon={FiMail} 
                  className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                />
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                  placeholder="Enter your email"
                  disabled={resetSent}
                />
              </div>
            </motion.div>

            {resetSent ? (
              <motion.div variants={itemVariants} className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <SafeIcon icon={FiHelpCircle} className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Reset instructions sent!</h3>
                    <div className="mt-1 text-sm text-green-700">
                      <p>Check your email for instructions to reset your password.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold font-open-sans hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiMail} className="w-5 h-5" />
                    <span>Send Reset Instructions</span>
                  </div>
                )}
              </motion.button>
            )}

            <motion.div variants={itemVariants} className="mt-6 text-center">
              <button
                onClick={() => {
                  setShowResetPassword(false);
                  setResetSent(false);
                }}
                className="text-secondary hover:text-primary font-medium font-open-sans"
              >
                Back to login
              </button>
            </motion.div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-open-sans">
                Email Address
              </label>
              <div className="relative">
                <SafeIcon 
                  icon={FiMail} 
                  className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-open-sans">
                Password
              </label>
              <div className="relative">
                <SafeIcon 
                  icon={FiLock} 
                  className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon 
                    icon={showPassword ? FiEyeOff : FiEye} 
                    className="w-5 h-5"
                  />
                </button>
              </div>
              
              {isLogin && (
                <div className="mt-1 text-right">
                  <button 
                    type="button"
                    onClick={() => setShowResetPassword(true)}
                    className="text-sm text-secondary hover:text-primary font-open-sans"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold font-open-sans hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={isLogin ? FiLogIn : FiUserPlus} className="w-5 h-5" />
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                </div>
              )}
            </motion.button>
          </form>
        )}

        {!showResetPassword && (
          <motion.div 
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-secondary hover:text-primary font-medium font-open-sans"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LoginForm;