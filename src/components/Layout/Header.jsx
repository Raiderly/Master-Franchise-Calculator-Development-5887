import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLogOut, FiUser, FiMenu } = FiIcons;

const Header = () => {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-lg border-b-2 border-primary sticky top-0 z-30"
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
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">
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

          {/* Mobile menu button */}
          {user && (
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg bg-gray-100"
              >
                <SafeIcon icon={FiMenu} className="w-5 h-5 text-primary" />
              </motion.button>
              
              {/* Mobile dropdown menu */}
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200"
                >
                  <div className="px-4 py-2 border-b border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <SafeIcon icon={FiUser} className="w-4 h-4" />
                      <span className="font-open-sans text-sm truncate">{user.email}</span>
                    </div>
                  </div>
                  <div className="px-2 py-2">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left rounded-md"
                    >
                      <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                      <span className="font-open-sans">Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;