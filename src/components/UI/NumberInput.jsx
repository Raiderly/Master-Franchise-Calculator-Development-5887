import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMinus, FiPlus } = FiIcons;

const NumberInput = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  className = "",
  allowNegative = false,
  showControls = true
}) => {
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) return;
    if (min !== undefined && newValue < min) return;
    if (max !== undefined && newValue > max) return;
    onChange(newValue);
  };

  const increment = () => {
    const newValue = value + step;
    if (max !== undefined && newValue > max) return;
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = value - step;
    if (min !== undefined && newValue < min) return;
    onChange(newValue);
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-open-sans">
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className={`w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans transition-shadow
          ${prefix ? 'pl-8' : ''}
          ${suffix ? 'pr-8' : ''}
          ${showControls ? 'pr-20' : ''}
        `}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-open-sans">
          {suffix}
        </span>
      )}
      {showControls && (
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex space-x-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={decrement}
            className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <SafeIcon icon={FiMinus} className="w-4 h-4 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={increment}
            className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default NumberInput;