import React from 'react';
import { motion } from 'framer-motion';
import Tooltip from './Tooltip';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiInfo } = FiIcons;

const InputGroup = ({
  label,
  tooltip,
  error,
  className = "",
  children,
  required = false
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center space-x-2">
        <label className="block text-sm font-semibold text-gray-700 font-open-sans">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {tooltip && (
          <Tooltip content={tooltip}>
            <SafeIcon 
              icon={FiInfo} 
              className="w-4 h-4 text-gray-400 cursor-help"
            />
          </Tooltip>
        )}
      </div>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 font-open-sans"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default InputGroup;