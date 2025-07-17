import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLogOut, FiUser } = FiIcons;

const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-lg border-b-2 border-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <img 
              src="https://app1.sharemyimage.com/2025/07/17/ufg-centered-stacked-logo-full-color-rgb-900px-w-72ppi.webp" 
              alt="UFG Logo" 
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-2xl font-montserrat font-bold text-primary">
                Master Franchise Calculator
              </h1>
              <p className="text-sm text-gray-600 font-open-sans">
                Financial projections for franchise growth
              </p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <SafeIcon icon={FiUser} className="w-4 h-4" />
                <span className="font-open-sans text-sm">{user.email}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-open-sans"
              >
                <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                <span>Sign Out</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;