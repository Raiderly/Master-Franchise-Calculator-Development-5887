import React from 'react';
import { motion } from 'framer-motion';
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
  FiToggleRight
} = FiIcons;

const AdvancedInputPanel = ({ inputs, setInputs }) => {
  const handleChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field) => {
    const newValue = !inputs[field];
    setInputs(prev => ({ ...prev, [field]: newValue }));
  };

  const AccordionTrigger = ({ children, icon: Icon }) => (
    <div className="flex">
      <button 
        className="flex flex-1 items-center justify-between py-4 px-6 bg-gradient-to-r from-primary to-primary/90 text-white font-montserrat font-semibold text-lg hover:bg-primary/95 transition-colors group"
        onClick={() => {}}
      >
        <div className="flex items-center space-x-3">
          <SafeIcon icon={Icon} className="w-6 h-6" />
          <span>{children}</span>
        </div>
        <SafeIcon 
          icon={FiChevronDown} 
          className="w-5 h-5 transform transition-transform" 
        />
      </button>
    </div>
  );

  const AccordionContent = ({ children }) => (
    <div className="overflow-hidden">
      <div className="p-6 bg-white border-x border-b border-gray-200">
        {children}
      </div>
    </div>
  );

  const ToggleSwitch = ({ field, label, tooltip }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        <span className="font-medium text-gray-700 font-open-sans">{label}</span>
        {tooltip && (
          <div className="group relative">
            <SafeIcon icon={FiSettings} className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
          className={`w-8 h-8 ${inputs[field] ? 'text-secondary' : 'text-gray-400'}`}
        />
        <span className={`font-medium ${inputs[field] ? 'text-secondary' : 'text-gray-500'}`}>
          {inputs[field] ? 'On' : 'Off'}
        </span>
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="space-y-4">
        {/* Franchise & Network Development */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <AccordionTrigger icon={FiUsers}>
            Franchise & Network Development
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Planned Development Schedule" tooltip="Years 1-10 targets (comma separated)">
                <input
                  type="text"
                  value={inputs.devSchedule || ''}
                  onChange={(e) => handleChange('devSchedule', e.target.value)}
                  placeholder="e.g., 5,10,15,20,25..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                />
              </InputGroup>
              
              <InputGroup label="Franchise Sales Override" tooltip="Manual override for actual sales">
                <NumberInput
                  value={inputs.franchiseSales || 0}
                  onChange={(value) => handleChange('franchiseSales', value)}
                  min={0}
                />
              </InputGroup>
              
              <InputGroup label="Pilot Corporate Stores" tooltip="Initial company-owned locations">
                <NumberInput
                  value={inputs.pilotStores || 0}
                  onChange={(value) => handleChange('pilotStores', value)}
                  min={0}
                />
              </InputGroup>
              
              <InputGroup label="Company Stores per Year" tooltip="Annual corporate store expansion">
                <NumberInput
                  value={inputs.companyStores || 0}
                  onChange={(value) => handleChange('companyStores', value)}
                  min={0}
                />
              </InputGroup>
              
              <InputGroup label="Average Revenue per Company Store" tooltip="Expected annual revenue">
                <NumberInput
                  value={inputs.companyRev || 0}
                  onChange={(value) => handleChange('companyRev', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Average Expenses per Company Store" tooltip="Expected annual expenses">
                <NumberInput
                  value={inputs.companyExp || 0}
                  onChange={(value) => handleChange('companyExp', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Annual Churn Rate" tooltip="Percentage of franchisees leaving annually">
                <NumberInput
                  value={inputs.churnRate || 0}
                  onChange={(value) => handleChange('churnRate', value)}
                  min={0}
                  max={100}
                  suffix="%"
                />
              </InputGroup>
              
              <InputGroup label="Territory-Based Growth" tooltip="Enable territorial expansion tracking">
                <ToggleSwitch 
                  field="territoryGrowth"
                  label="Territory Tracking"
                  tooltip="Track growth by geographic regions"
                />
              </InputGroup>
            </div>
          </AccordionContent>
        </div>

        {/* Franchisee Economics */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <AccordionTrigger icon={FiDollarSign}>
            Franchisee Economics
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Initial Franchise Fee" tooltip="Standard franchise fee">
                <NumberInput
                  value={inputs.initFranchiseFee || 0}
                  onChange={(value) => handleChange('initFranchiseFee', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Promotional Franchise Fee" tooltip="Discounted fee for promotions">
                <NumberInput
                  value={inputs.feePromo || 0}
                  onChange={(value) => handleChange('feePromo', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Transfer/Resale Fee" tooltip="Fee for franchise transfers">
                <NumberInput
                  value={inputs.transferFee || 0}
                  onChange={(value) => handleChange('transferFee', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Equipment/Fit-Out Revenue" tooltip="Revenue from equipment sales">
                <NumberInput
                  value={inputs.equipmentRevenue || 0}
                  onChange={(value) => handleChange('equipmentRevenue', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Initial Training Fees" tooltip="One-time training fee">
                <NumberInput
                  value={inputs.trainingInitial || 0}
                  onChange={(value) => handleChange('trainingInitial', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Ongoing Training Fees" tooltip="Recurring training fees">
                <NumberInput
                  value={inputs.trainingOngoing || 0}
                  onChange={(value) => handleChange('trainingOngoing', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Multi-Unit Discounts" tooltip="Enable volume discounts">
                <ToggleSwitch 
                  field="multiUnitDiscount"
                  label="Volume Discounts"
                  tooltip="Apply discounts for multiple unit purchases"
                />
              </InputGroup>
              
              <InputGroup label="Early Bird Incentives" tooltip="Enable early adopter bonuses">
                <ToggleSwitch 
                  field="earlyBirdIncentive"
                  label="Early Bird Bonuses"
                  tooltip="Special pricing for early franchise adopters"
                />
              </InputGroup>
            </div>
          </AccordionContent>
        </div>

        {/* Royalties & Recurring Revenue */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <AccordionTrigger icon={FiTrendingUp}>
            Royalties & Recurring Revenue
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Standard Royalty Rate" tooltip="Base royalty percentage">
                <NumberInput
                  value={inputs.royaltyRate || 0}
                  onChange={(value) => handleChange('royaltyRate', value)}
                  min={0}
                  max={100}
                  suffix="%"
                />
              </InputGroup>
              
              <InputGroup label="Minimum Royalty Amount" tooltip="Minimum monthly royalty">
                <NumberInput
                  value={inputs.minRoyaltyAmount || 0}
                  onChange={(value) => handleChange('minRoyaltyAmount', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Marketing Levy Rate" tooltip="Marketing fund contribution">
                <NumberInput
                  value={inputs.marketingLevy || 0}
                  onChange={(value) => handleChange('marketingLevy', value)}
                  min={0}
                  max={100}
                  suffix="%"
                />
              </InputGroup>
              
              <InputGroup label="Technology/Software Fee" tooltip="Monthly tech fee">
                <NumberInput
                  value={inputs.techFee || 0}
                  onChange={(value) => handleChange('techFee', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Support/Advisory Fee" tooltip="Monthly support fee">
                <NumberInput
                  value={inputs.supportFee || 0}
                  onChange={(value) => handleChange('supportFee', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Supply Chain Revenue" tooltip="Revenue from supply chain">
                <NumberInput
                  value={inputs.supplyChainRevenue || 0}
                  onChange={(value) => handleChange('supplyChainRevenue', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Minimum Royalty Enforcement" tooltip="Enforce minimum royalty payments">
                <ToggleSwitch 
                  field="minRoyalty"
                  label="Minimum Royalty"
                  tooltip="Enforce minimum monthly royalty payments"
                />
              </InputGroup>
              
              <InputGroup label="Tiered Royalty Structure" tooltip="Enable performance-based royalties">
                <ToggleSwitch 
                  field="tieredRoyalty"
                  label="Tiered Royalties"
                  tooltip="Apply different rates based on performance tiers"
                />
              </InputGroup>
            </div>
          </AccordionContent>
        </div>

        {/* Operational Costs & Overheads */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <AccordionTrigger icon={FiSettings}>
            Operational Costs & Overheads
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Corporate Marketing Spend" tooltip="Annual marketing budget">
                <NumberInput
                  value={inputs.corpMarketing || 0}
                  onChange={(value) => handleChange('corpMarketing', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Support Staff Payroll" tooltip="Total staff costs">
                <NumberInput
                  value={inputs.staffPayroll || 0}
                  onChange={(value) => handleChange('staffPayroll', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Legal & Compliance Costs" tooltip="Legal and regulatory expenses">
                <NumberInput
                  value={inputs.legalCompliance || 0}
                  onChange={(value) => handleChange('legalCompliance', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Technology Infrastructure" tooltip="IT and system costs">
                <NumberInput
                  value={inputs.techInfrastructure || 0}
                  onChange={(value) => handleChange('techInfrastructure', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Training & Development" tooltip="Staff training costs">
                <NumberInput
                  value={inputs.trainingDevelopment || 0}
                  onChange={(value) => handleChange('trainingDevelopment', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Other Central Costs" tooltip="Miscellaneous overhead">
                <NumberInput
                  value={inputs.otherCosts || 0}
                  onChange={(value) => handleChange('otherCosts', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Local Area Marketing" tooltip="Regional marketing programs">
                <NumberInput
                  value={inputs.localAreaMarketing || 0}
                  onChange={(value) => handleChange('localAreaMarketing', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Event & Conference Revenue" tooltip="Revenue from events">
                <NumberInput
                  value={inputs.eventRevenue || 0}
                  onChange={(value) => handleChange('eventRevenue', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
            </div>
          </AccordionContent>
        </div>

        {/* Advanced Modeling & Scenario Controls */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <AccordionTrigger icon={FiBarChart2}>
            Advanced Modeling & Scenario Controls
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Inflation Rate (CPI)" tooltip="Annual inflation adjustment">
                <NumberInput
                  value={inputs.inflationRate || 0}
                  onChange={(value) => handleChange('inflationRate', value)}
                  min={0}
                  max={20}
                  suffix="%"
                />
              </InputGroup>
              
              <InputGroup label="Lead Conversion Rate" tooltip="Percentage of leads converting to sales">
                <NumberInput
                  value={inputs.leadConversion || 0}
                  onChange={(value) => handleChange('leadConversion', value)}
                  min={0}
                  max={100}
                  suffix="%"
                />
              </InputGroup>
              
              <InputGroup label="Master Expansion CapEx" tooltip="Capital expenditure for expansion">
                <NumberInput
                  value={inputs.masterCapex || 0}
                  onChange={(value) => handleChange('masterCapex', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Working Capital Requirements" tooltip="Required working capital">
                <NumberInput
                  value={inputs.workingCapital || 0}
                  onChange={(value) => handleChange('workingCapital', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Vendor Rebate Rate" tooltip="Rebates from suppliers">
                <NumberInput
                  value={inputs.vendorRebateRate || 0}
                  onChange={(value) => handleChange('vendorRebateRate', value)}
                  min={0}
                  max={100}
                  suffix="%"
                />
              </InputGroup>
              
              <InputGroup label="Territory Development Fee" tooltip="Fee for territory development">
                <NumberInput
                  value={inputs.territoryDevFee || 0}
                  onChange={(value) => handleChange('territoryDevFee', value)}
                  min={0}
                  prefix="$"
                />
              </InputGroup>
              
              <InputGroup label="Tiered Royalty Structure" tooltip="JSON structure for tiered royalties">
                <textarea
                  value={inputs.tieredRoyaltyStructure || ''}
                  onChange={(e) => handleChange('tieredRoyaltyStructure', e.target.value)}
                  placeholder='{"tier1": {"threshold": 100000, "rate": 5}, "tier2": {"threshold": 200000, "rate": 4}}'
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                  rows="3"
                />
              </InputGroup>
              
              <InputGroup label="Custom Revenue Streams" tooltip="Additional revenue sources">
                <textarea
                  value={inputs.customRevenue || ''}
                  onChange={(e) => handleChange('customRevenue', e.target.value)}
                  placeholder="Describe additional revenue streams..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                  rows="3"
                />
              </InputGroup>
            </div>
          </AccordionContent>
        </div>
      </div>
    </div>
  );
};

export default AdvancedInputPanel;