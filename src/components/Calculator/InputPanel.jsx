import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import NumberInput from '../UI/NumberInput';
import InputGroup from '../UI/InputGroup';

const { 
  FiChevronDown, 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp, 
  FiSettings, 
  FiBarChart2, 
  FiToggleLeft, 
  FiToggleRight,
  FiShoppingCart,
  FiTruck,
  FiCalendar
} = FiIcons;

export default function InputPanel({ inputs, setInputs }) {
  const [openSections, setOpenSections] = useState({
    network: true,
    economics: true,
    recurring: true,
    supply: false,
    marketing: false,
    operations: false,
    advanced: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field) => {
    setInputs(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const AccordionSection = ({ id, title, icon, children }) => {
    const isOpen = openSections[id];
    
    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-white mb-4">
        <button 
          onClick={() => toggleSection(id)}
          className="flex w-full items-center justify-between py-4 px-6 bg-gradient-to-r from-primary to-primary/90 text-white font-montserrat font-semibold text-lg hover:bg-primary/95 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <SafeIcon icon={icon} className="w-6 h-6" />
            <span>{title}</span>
          </div>
          <SafeIcon 
            icon={FiChevronDown} 
            className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const InputField = ({ label, type = "number", field, placeholder, min = 0, max, prefix, suffix, tooltip }) => (
    <InputGroup label={label} tooltip={tooltip}>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-open-sans z-10">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={inputs[field] || ''}
          onChange={e => handleChange(field, type === 'number' ? +e.target.value || 0 : e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          className={`w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans transition-all ${prefix ? 'pl-10' : ''} ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-open-sans">
            {suffix}
          </span>
        )}
      </div>
    </InputGroup>
  );

  const ToggleField = ({ label, field, tooltip }) => (
    <div className="mb-4 flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center space-x-2">
        <span className="font-medium text-gray-700 font-open-sans">{label}</span>
        {tooltip && (
          <div className="group relative">
            <SafeIcon icon={FiSettings} className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => handleToggle(field)}
        className="flex items-center space-x-2 text-sm"
      >
        <SafeIcon 
          icon={inputs[field] ? FiToggleRight : FiToggleLeft} 
          className={`w-8 h-8 transition-colors ${inputs[field] ? 'text-secondary' : 'text-gray-400'}`}
        />
        <span className={`font-medium ${inputs[field] ? 'text-secondary' : 'text-gray-500'}`}>
          {inputs[field] ? 'Enabled' : 'Disabled'}
        </span>
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="space-y-4">
        {/* Franchise & Network Development */}
        <AccordionSection id="network" title="Franchise & Network Development" icon={FiUsers}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Planned Development Schedule"
              type="text"
              field="devSchedule"
              placeholder="e.g., 5,10,15,20,25..."
              tooltip="Comma-separated targets for Years 1-10"
            />
            <InputField
              label="Franchise Sales Override"
              field="franchiseSales"
              placeholder="0"
              tooltip="Manual override for actual sales numbers"
            />
            <InputField
              label="Pilot Corporate Stores"
              field="pilotStores"
              placeholder="0"
              tooltip="Number of company-owned stores at launch"
            />
            <InputField
              label="Company Stores per Year"
              field="companyStores"
              placeholder="0"
              tooltip="New corporate stores added each year"
            />
            <InputField
              label="Average Revenue per Company Store"
              field="companyRev"
              prefix="$"
              placeholder="0"
              tooltip="Expected annual revenue per corporate store"
            />
            <InputField
              label="Average Expenses per Company Store"
              field="companyExp"
              prefix="$"
              placeholder="0"
              tooltip="Expected annual expenses per corporate store"
            />
            <InputField
              label="Annual Churn Rate"
              field="churnRate"
              suffix="%"
              max={100}
              placeholder="0"
              tooltip="Percentage of franchisees exiting annually"
            />
            <ToggleField
              label="Territory-Based Growth"
              field="territoryGrowth"
              tooltip="Enable territorial expansion tracking"
            />
          </div>
        </AccordionSection>

        {/* Franchisee Economics */}
        <AccordionSection id="economics" title="Franchisee Economics" icon={FiDollarSign}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Initial Franchise Fee"
              field="initFranchiseFee"
              prefix="$"
              placeholder="50000"
              tooltip="Standard fee for new franchisees"
            />
            <InputField
              label="Promotional Override"
              field="feePromo"
              prefix="$"
              placeholder="0"
              tooltip="Special promotional franchise fee"
            />
            <InputField
              label="Transfer/Resale Fee"
              field="transferFee"
              prefix="$"
              placeholder="0"
              tooltip="Fee when franchise is sold/transferred"
            />
            <InputField
              label="Equipment/Fit-Out Revenue"
              field="equipmentRevenue"
              prefix="$"
              placeholder="0"
              tooltip="Revenue from equipment sales to franchisees"
            />
            <InputField
              label="Initial Training Fees"
              field="trainingInitial"
              prefix="$"
              placeholder="15000"
              tooltip="One-time training fee per franchisee"
            />
            <InputField
              label="Ongoing Training Fees"
              field="trainingOngoing"
              prefix="$"
              placeholder="5000"
              tooltip="Annual ongoing training fee per franchisee"
            />
            <ToggleField
              label="Multi-Unit Discounts"
              field="multiUnitDiscount"
              tooltip="Apply discounts for multiple unit purchases"
            />
            <ToggleField
              label="Early Bird Incentives"
              field="earlyBirdIncentive"
              tooltip="Special pricing for early adopters"
            />
          </div>
        </AccordionSection>

        {/* Royalties & Recurring Revenue */}
        <AccordionSection id="recurring" title="Royalties & Recurring Revenue" icon={FiTrendingUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Standard Royalty Rate"
              field="royaltyRate"
              suffix="%"
              max={100}
              placeholder="6"
              tooltip="Percentage of franchisee revenue paid as royalties"
            />
            <InputField
              label="Minimum Royalty Amount"
              field="minRoyaltyAmount"
              prefix="$"
              placeholder="0"
              tooltip="Minimum monthly royalty payment"
            />
            <InputField
              label="Marketing Levy Rate"
              field="marketingLevy"
              suffix="%"
              max={100}
              placeholder="2"
              tooltip="Percentage for marketing fund contribution"
            />
            <InputField
              label="Technology/Software Fee"
              field="techFee"
              prefix="$"
              placeholder="200"
              tooltip="Monthly technology fee per franchisee"
            />
            <InputField
              label="Support/Advisory Fee"
              field="supportFee"
              prefix="$"
              placeholder="100"
              tooltip="Monthly support fee per franchisee"
            />
            <InputField
              label="Supply Chain Revenue"
              field="supplyChainRevenue"
              prefix="$"
              placeholder="0"
              tooltip="Annual revenue from supply chain operations"
            />
            <ToggleField
              label="Minimum Royalty Enforcement"
              field="minRoyalty"
              tooltip="Enforce minimum monthly royalty payments"
            />
            <ToggleField
              label="Tiered Royalty Structure"
              field="tieredRoyalty"
              tooltip="Apply different rates based on performance"
            />
          </div>
        </AccordionSection>

        {/* Supply Chain & Vendor Management */}
        <AccordionSection id="supply" title="Supply Chain & Vendor Management" icon={FiTruck}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ToggleField
              label="Supply Chain Program"
              field="supplyChainEnabled"
              tooltip="Enable centralized supply chain management"
            />
            <InputField
              label="Vendor Rebate Rate"
              field="vendorRebateRate"
              suffix="%"
              max={100}
              placeholder="0"
              tooltip="Percentage rebate from vendor sales"
            />
            <InputField
              label="Franchisee Share"
              field="franchiseeShare"
              suffix="%"
              max={100}
              placeholder="50"
              tooltip="Percentage of rebates shared with franchisees"
            />
            <InputField
              label="Annual Supply Revenue"
              field="annualSupplyRevenue"
              prefix="$"
              placeholder="0"
              tooltip="Expected annual supply chain revenue"
            />
          </div>
        </AccordionSection>

        {/* Marketing & Events */}
        <AccordionSection id="marketing" title="Marketing & Events" icon={FiCalendar}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Corporate Marketing Spend"
              field="corpMarketing"
              prefix="$"
              placeholder="150000"
              tooltip="Annual corporate marketing budget"
            />
            <InputField
              label="Local Area Marketing (LAM)"
              field="localAreaMarketing"
              prefix="$"
              placeholder="30000"
              tooltip="Budget for local/regional marketing programs"
            />
            <ToggleField
              label="LAM Program Active"
              field="lamEnabled"
              tooltip="Enable Local Area Marketing programs"
            />
            <InputField
              label="Event & Conference Revenue"
              field="eventRevenue"
              prefix="$"
              placeholder="20000"
              tooltip="Annual revenue from events and conferences"
            />
            <ToggleField
              label="Events Program"
              field="eventsEnabled"
              tooltip="Enable events and conference programs"
            />
            <InputField
              label="Annual Events Budget"
              field="eventsBudget"
              prefix="$"
              placeholder="50000"
              tooltip="Annual budget for events and conferences"
            />
          </div>
        </AccordionSection>

        {/* Operational Costs & Overheads */}
        <AccordionSection id="operations" title="Operational Costs & Overheads" icon={FiSettings}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Support Staff Payroll"
              field="staffPayroll"
              prefix="$"
              placeholder="300000"
              tooltip="Annual payroll costs for support staff"
            />
            <InputField
              label="Legal & Compliance Costs"
              field="legalCompliance"
              prefix="$"
              placeholder="75000"
              tooltip="Annual legal and compliance expenses"
            />
            <InputField
              label="Technology Infrastructure"
              field="techInfrastructure"
              prefix="$"
              placeholder="100000"
              tooltip="Annual IT infrastructure costs"
            />
            <InputField
              label="Training & Development"
              field="trainingDevelopment"
              prefix="$"
              placeholder="50000"
              tooltip="Annual training and development costs"
            />
            <InputField
              label="Other Central Costs"
              field="otherCosts"
              prefix="$"
              placeholder="25000"
              tooltip="Other miscellaneous overhead costs"
            />
            <InputField
              label="Office & Administration"
              field="officeAdmin"
              prefix="$"
              placeholder="40000"
              tooltip="Annual office and administrative expenses"
            />
          </div>
        </AccordionSection>

        {/* Advanced Modeling & Scenario Controls */}
        <AccordionSection id="advanced" title="Advanced Modeling & Scenario Controls" icon={FiBarChart2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Inflation Rate (CPI)"
              field="inflationRate"
              suffix="%"
              max={20}
              placeholder="3"
              tooltip="Annual inflation rate for expense projections"
            />
            <InputField
              label="Lead Conversion Rate"
              field="leadConversion"
              suffix="%"
              max={100}
              placeholder="15"
              tooltip="Percentage of leads converting to franchisees"
            />
            <InputField
              label="Master Expansion CapEx"
              field="masterCapex"
              prefix="$"
              placeholder="500000"
              tooltip="Capital expenditure for expansion"
            />
            <InputField
              label="Working Capital Requirements"
              field="workingCapital"
              prefix="$"
              placeholder="150000"
              tooltip="Working capital required for operations"
            />
            <InputField
              label="Territory Development Fee"
              field="territoryDevFee"
              prefix="$"
              placeholder="25000"
              tooltip="Fee for territory development rights"
            />
            <ToggleField
              label="Advanced Controls"
              field="advancedControlsEnabled"
              tooltip="Enable advanced modeling features"
            />
            <div className="md:col-span-2">
              <InputGroup label="Tiered Royalty Structure (JSON)" tooltip="JSON structure for tiered royalty rates">
                <textarea
                  value={inputs.tieredRoyaltyStructure || ''}
                  onChange={e => handleChange('tieredRoyaltyStructure', e.target.value)}
                  placeholder='{"tier1": {"threshold": 100000, "rate": 5}, "tier2": {"threshold": 200000, "rate": 4}}'
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                  rows="4"
                />
              </InputGroup>
            </div>
          </div>
        </AccordionSection>
      </div>
    </div>
  );
}