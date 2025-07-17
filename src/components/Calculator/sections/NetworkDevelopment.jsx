import React from 'react';
import { motion } from 'framer-motion';
import Section from '../../UI/Section';
import InputGroup from '../../UI/InputGroup';
import NumberInput from '../../UI/NumberInput';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiTrendingUp, FiAlertCircle } = FiIcons;

const NetworkDevelopment = ({ inputs, onChange }) => {
  const handleYearlyPlanChange = (year, field, value) => {
    onChange({
      yearlyDevelopment: {
        ...inputs.yearlyDevelopment,
        [year]: {
          ...inputs.yearlyDevelopment[year],
          [field]: value
        }
      }
    });
  };

  const handleChurnRateChange = (year, type, value) => {
    onChange({
      churnRate: {
        ...inputs.churnRate,
        [year]: {
          ...inputs.churnRate[year],
          [type]: value
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <Section 
        title="Initial Network Setup" 
        icon={FiUsers}
        description="Define your starting network configuration"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup
            label="Initial Franchisees"
            tooltip="Number of franchisees at launch"
            required
          >
            <NumberInput
              value={inputs.initialFranchisees}
              onChange={(value) => onChange({ initialFranchisees: value })}
              min={0}
            />
          </InputGroup>

          <InputGroup
            label="Pilot Corporate Stores"
            tooltip="Company-owned stores at launch"
          >
            <NumberInput
              value={inputs.corporateStores.pilotStores}
              onChange={(value) => 
                onChange({
                  corporateStores: {
                    ...inputs.corporateStores,
                    pilotStores: value
                  }
                })
              }
              min={0}
            />
          </InputGroup>
        </div>
      </Section>

      <Section 
        title="Growth Planning" 
        icon={FiTrendingUp}
        description="Project your network expansion"
      >
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((year) => (
            <div 
              key={year}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg"
            >
              <h4 className="md:col-span-3 font-montserrat font-semibold text-primary">
                Year {year}
              </h4>
              
              <InputGroup
                label="Planned New Franchises"
                tooltip={`Target franchise growth for Year ${year}`}
              >
                <NumberInput
                  value={inputs.yearlyDevelopment[year]?.planned || 0}
                  onChange={(value) => 
                    handleYearlyPlanChange(year, 'planned', value)
                  }
                  min={0}
                />
              </InputGroup>

              <InputGroup
                label="Voluntary Churn Rate"
                tooltip="Expected voluntary exits (%)"
              >
                <NumberInput
                  value={inputs.churnRate[year]?.voluntary || 0}
                  onChange={(value) => 
                    handleChurnRateChange(year, 'voluntary', value)
                  }
                  min={0}
                  max={100}
                  suffix="%"
                />
              </InputGroup>

              <InputGroup
                label="Involuntary Churn Rate"
                tooltip="Expected terminations (%)"
              >
                <NumberInput
                  value={inputs.churnRate[year]?.involuntary || 0}
                  onChange={(value) => 
                    handleChurnRateChange(year, 'involuntary', value)
                  }
                  min={0}
                  max={100}
                  suffix="%"
                />
              </InputGroup>
            </div>
          ))}
        </div>
      </Section>

      <Section 
        title="Corporate Store Strategy" 
        icon={FiAlertCircle}
        description="Plan your company-owned locations"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="Average Store Revenue"
              tooltip="Expected annual revenue per corporate store"
            >
              <NumberInput
                value={inputs.corporateStores.avgRevenue}
                onChange={(value) => 
                  onChange({
                    corporateStores: {
                      ...inputs.corporateStores,
                      avgRevenue: value
                    }
                  })
                }
                min={0}
                prefix="$"
              />
            </InputGroup>

            <InputGroup
              label="Average Store Expenses"
              tooltip="Expected annual expenses per corporate store"
            >
              <NumberInput
                value={inputs.corporateStores.avgExpenses}
                onChange={(value) => 
                  onChange({
                    corporateStores: {
                      ...inputs.corporateStores,
                      avgExpenses: value
                    }
                  })
                }
                min={0}
                prefix="$"
              />
            </InputGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputGroup
              label="Initial Capex"
              tooltip="Capital expenditure per new store"
            >
              <NumberInput
                value={inputs.corporateStores.capex}
                onChange={(value) => 
                  onChange({
                    corporateStores: {
                      ...inputs.corporateStores,
                      capex: value
                    }
                  })
                }
                min={0}
                prefix="$"
              />
            </InputGroup>

            <InputGroup
              label="Upgrade Reserves"
              tooltip="Annual reserve for store upgrades"
            >
              <NumberInput
                value={inputs.corporateStores.upgradeReserves}
                onChange={(value) => 
                  onChange({
                    corporateStores: {
                      ...inputs.corporateStores,
                      upgradeReserves: value
                    }
                  })
                }
                min={0}
                prefix="$"
              />
            </InputGroup>

            <InputGroup
              label="Working Capital"
              tooltip="Required working capital per store"
            >
              <NumberInput
                value={inputs.corporateStores.workingCapital}
                onChange={(value) => 
                  onChange({
                    corporateStores: {
                      ...inputs.corporateStores,
                      workingCapital: value
                    }
                  })
                }
                min={0}
                prefix="$"
              />
            </InputGroup>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default NetworkDevelopment;