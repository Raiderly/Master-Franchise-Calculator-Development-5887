import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiChevronDown, FiChevronRight } = FiIcons;

const Section = ({ 
  title, 
  description, 
  icon, 
  children, 
  defaultExpanded = true,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-primary to-primary/90 text-white"
        whileHover={{ backgroundColor: "rgba(10,52,102,0.95)" }}
      >
        <div className="flex items-center space-x-3">
          <SafeIcon icon={icon} className="w-6 h-6" />
          <div className="text-left">
            <h3 className="text-lg font-montserrat font-semibold">{title}</h3>
            {description && (
              <p className="text-sm text-white/80 font-open-sans mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        <SafeIcon 
          icon={isExpanded ? FiChevronDown : FiChevronRight} 
          className="w-5 h-5 transition-transform duration-200"
        />
      </motion.button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Section;