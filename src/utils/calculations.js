export const calculateProjections = (inputs) => {
  const results = [];
  
  for (let year = 1; year <= 5; year++) {
    // Calculate active franchisees (accounting for churn)
    const churnRate = inputs.churnRate / 100;
    const retentionRate = 1 - churnRate;
    let activeFranchisees;
    
    if (year === 1) {
      activeFranchisees = inputs.initialFranchisees + inputs.newFranchiseesPerYear;
    } else {
      const prevActiveFranchisees = results[year - 2].activeFranchisees;
      activeFranchisees = Math.round(prevActiveFranchisees * retentionRate + inputs.newFranchiseesPerYear);
    }
    
    // Calculate revenue streams
    const masterFranchiseFees = inputs.newFranchiseesPerYear * inputs.masterFranchiseFee;
    const royaltyIncome = activeFranchisees * inputs.avgUnitRevenue * (inputs.royaltyRate / 100);
    const trainingFees = inputs.newFranchiseesPerYear * inputs.trainingFee;
    const marketingLevies = activeFranchisees * inputs.avgUnitRevenue * (inputs.marketingLevyRate / 100);
    const techFees = activeFranchisees * inputs.techFeePerUnit * 12; // Annual tech fees
    
    const totalRevenue = masterFranchiseFees + royaltyIncome + trainingFees + marketingLevies + techFees;
    
    // Calculate costs (simplified)
    const operatingCosts = totalRevenue * (inputs.operatingCostRate / 100);
    const netProfit = totalRevenue - operatingCosts;
    
    // Calculate metrics
    const perUnitRevenue = activeFranchisees > 0 ? totalRevenue / activeFranchisees : 0;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    
    results.push({
      year,
      activeFranchisees,
      masterFranchiseFees,
      royaltyIncome,
      trainingFees,
      marketingLevies,
      techFees,
      totalRevenue,
      operatingCosts,
      netProfit,
      perUnitRevenue,
      profitMargin,
    });
  }
  
  return results;
};

export const getRevenueBreakdown = (yearData) => {
  return [
    { name: 'Master Franchise Fees', value: yearData.masterFranchiseFees },
    { name: 'Royalty Income', value: yearData.royaltyIncome },
    { name: 'Training Fees', value: yearData.trainingFees },
    { name: 'Marketing Levies', value: yearData.marketingLevies },
    { name: 'Tech Fees', value: yearData.techFees },
  ].filter(item => item.value > 0);
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatPercentage = (value) => {
  return `${value.toFixed(1)}%`;
};