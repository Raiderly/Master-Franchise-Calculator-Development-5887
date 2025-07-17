export const calculateAdvancedKPIs = (inputs) => {
  const {
    // Network Development
    devSchedule = '5,10,15,20,25',
    franchiseSales = 0,
    pilotStores = 0,
    companyStores = 0,
    companyRev = 0,
    companyExp = 0,
    churnRate = 5,
    
    // Franchisee Economics
    initFranchiseFee = 50000,
    feePromo = 0,
    transferFee = 0,
    equipmentRevenue = 0,
    trainingInitial = 15000,
    trainingOngoing = 5000,
    
    // Royalties & Recurring Revenue
    royaltyRate = 6,
    minRoyaltyAmount = 0,
    marketingLevy = 2,
    techFee = 200,
    supportFee = 100,
    supplyChainRevenue = 0,
    minRoyalty = false,
    tieredRoyalty = false,
    
    // Operational Costs
    corpMarketing = 100000,
    staffPayroll = 200000,
    legalCompliance = 50000,
    techInfrastructure = 75000,
    trainingDevelopment = 25000,
    otherCosts = 30000,
    localAreaMarketing = 20000,
    eventRevenue = 15000,
    
    // Advanced Controls
    inflationRate = 3,
    leadConversion = 15,
    masterCapex = 500000,
    workingCapital = 100000,
    vendorRebateRate = 2,
    territoryDevFee = 25000,
    
    // Base calculations
    avgUnitRevenue = 500000,
    newFranchiseesPerYear = 10,
    initialFranchisees = 5
  } = inputs;

  // Parse development schedule
  const devTargets = devSchedule.split(',').map(n => parseInt(n.trim()) || 0);
  
  const results = [];
  let cumulativeCapex = 0;
  let cumulativeFranchisees = initialFranchisees;

  for (let year = 1; year <= 10; year++) {
    // Network Growth
    const targetGrowth = devTargets[year - 1] || newFranchiseesPerYear;
    const actualGrowth = franchiseSales > 0 ? franchiseSales : targetGrowth;
    const churnLoss = Math.floor(cumulativeFranchisees * (churnRate / 100));
    const netGrowth = actualGrowth - churnLoss;
    cumulativeFranchisees = Math.max(0, cumulativeFranchisees + netGrowth);
    
    // Company Store Growth
    const totalCompanyStores = pilotStores + (companyStores * year);
    const companyStoreProfit = totalCompanyStores * (companyRev - companyExp);
    
    // Revenue Streams
    const franchiseFeeRevenue = actualGrowth * (feePromo > 0 ? feePromo : initFranchiseFee);
    const transferRevenue = Math.floor(cumulativeFranchisees * 0.05) * transferFee; // 5% transfer rate
    const equipmentRevenue_total = actualGrowth * equipmentRevenue;
    const trainingRevenue = (actualGrowth * trainingInitial) + (cumulativeFranchisees * trainingOngoing);
    
    // Recurring Revenue
    const grossRoyaltyIncome = cumulativeFranchisees * avgUnitRevenue * (royaltyRate / 100);
    const royaltyIncome = minRoyalty ? Math.max(grossRoyaltyIncome, cumulativeFranchisees * minRoyaltyAmount * 12) : grossRoyaltyIncome;
    const marketingFund = cumulativeFranchisees * avgUnitRevenue * (marketingLevy / 100);
    const techFeeRevenue = cumulativeFranchisees * techFee * 12;
    const supportFeeRevenue = cumulativeFranchisees * supportFee * 12;
    const vendorRebates = supplyChainRevenue * (vendorRebateRate / 100);
    const territoryRevenue = Math.floor(actualGrowth / 5) * territoryDevFee; // Territory fee per 5 franchisees
    
    // Total Revenue
    const totalRevenue = franchiseFeeRevenue + 
                        transferRevenue + 
                        equipmentRevenue_total + 
                        trainingRevenue + 
                        royaltyIncome + 
                        marketingFund + 
                        techFeeRevenue + 
                        supportFeeRevenue + 
                        vendorRebates + 
                        territoryRevenue + 
                        eventRevenue + 
                        companyStoreProfit;
    
    // Operating Costs (with inflation)
    const inflationMultiplier = Math.pow(1 + (inflationRate / 100), year - 1);
    const totalOperatingCosts = (corpMarketing + 
                                staffPayroll + 
                                legalCompliance + 
                                techInfrastructure + 
                                trainingDevelopment + 
                                otherCosts + 
                                localAreaMarketing) * inflationMultiplier;
    
    // Capital Expenditure
    const yearlyCapex = year === 1 ? masterCapex : masterCapex * 0.1; // 10% of initial capex annually
    cumulativeCapex += yearlyCapex;
    
    // Profitability
    const grossProfit = totalRevenue - totalOperatingCosts;
    const netProfit = grossProfit - yearlyCapex;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    
    // Per Unit Metrics
    const perUnitRevenue = cumulativeFranchisees > 0 ? totalRevenue / cumulativeFranchisees : 0;
    const perUnitProfit = cumulativeFranchisees > 0 ? netProfit / cumulativeFranchisees : 0;
    
    // Cash Flow
    const cashInflows = totalRevenue;
    const cashOutflows = totalOperatingCosts + yearlyCapex;
    const netCashFlow = cashInflows - cashOutflows;
    
    results.push({
      year,
      // Network Metrics
      activeFranchisees: cumulativeFranchisees,
      newFranchisees: actualGrowth,
      churnLoss,
      netGrowth,
      companyStores: totalCompanyStores,
      
      // Revenue Breakdown
      franchiseFeeRevenue,
      transferRevenue,
      equipmentRevenue: equipmentRevenue_total,
      trainingRevenue,
      royaltyIncome,
      marketingFund,
      techFeeRevenue,
      supportFeeRevenue,
      vendorRebates,
      territoryRevenue,
      eventRevenue,
      companyProfit: companyStoreProfit,
      totalRevenue,
      
      // Costs & Profitability
      operatingCosts: totalOperatingCosts,
      yearlyCapex,
      cumulativeCapex,
      grossProfit,
      netProfit,
      profitMargin,
      
      // Per Unit Metrics
      perUnitRevenue,
      perUnitProfit,
      
      // Cash Flow
      cashInflows,
      cashOutflows,
      netCashFlow,
      
      // Additional KPIs
      leadConversionRate: leadConversion,
      workingCapitalReq: workingCapital * inflationMultiplier,
      roiPercentage: cumulativeCapex > 0 ? (netProfit / cumulativeCapex) * 100 : 0
    });
  }
  
  return results;
};

export const buildChartData = (calculations) => {
  const stackedBarData = calculations.map(calc => ({
    year: `Year ${calc.year}`,
    royalty: calc.royaltyIncome,
    fees: calc.franchiseFeeRevenue + calc.transferRevenue + calc.trainingRevenue,
    company: calc.companyProfit,
    other: calc.techFeeRevenue + calc.supportFeeRevenue + calc.vendorRebates + calc.territoryRevenue + calc.eventRevenue
  }));

  const donutData = calculations.length > 0 ? [
    { type: 'Royalty Income', value: calculations[0].royaltyIncome },
    { type: 'Franchise Fees', value: calculations[0].franchiseFeeRevenue },
    { type: 'Company Stores', value: calculations[0].companyProfit },
    { type: 'Tech & Support', value: calculations[0].techFeeRevenue + calculations[0].supportFeeRevenue },
    { type: 'Other Revenue', value: calculations[0].vendorRebates + calculations[0].territoryRevenue + calculations[0].eventRevenue }
  ].filter(item => item.value > 0) : [];

  const lineData = calculations.map(calc => ({
    year: `Year ${calc.year}`,
    totalRevenue: calc.totalRevenue,
    netProfit: calc.netProfit,
    operatingCosts: calc.operatingCosts
  }));

  const breakevenData = calculations.map(calc => ({
    year: `Year ${calc.year}`,
    revenue: calc.totalRevenue,
    costs: calc.operatingCosts + calc.yearlyCapex,
    breakeven: calc.totalRevenue === (calc.operatingCosts + calc.yearlyCapex) ? calc.totalRevenue : null
  }));

  const sensitivityData = [
    { variable: 'Royalty Rate', impact: 25 },
    { variable: 'Franchise Fee', impact: 15 },
    { variable: 'Churn Rate', impact: -20 },
    { variable: 'Unit Revenue', impact: 30 },
    { variable: 'Operating Costs', impact: -18 },
    { variable: 'Growth Rate', impact: 22 }
  ].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

  const cashFlowData = calculations.map(calc => ({
    year: `Year ${calc.year}`,
    inflows: calc.cashInflows,
    outflows: calc.cashOutflows,
    net: calc.netCashFlow
  }));

  return {
    stackedBar: stackedBarData,
    donut: donutData,
    line: lineData,
    breakeven: breakevenData,
    sensitivity: sensitivityData,
    cashFlow: cashFlowData
  };
};

export const calculateKPIs = (inputs) => {
  const calculations = calculateAdvancedKPIs(inputs);
  const currentYear = calculations[0] || {};
  
  return {
    totalRevenue: currentYear.totalRevenue || 0,
    royaltyIncome: currentYear.royaltyIncome || 0,
    franchiseFeeRevenue: currentYear.franchiseFeeRevenue || 0,
    netProfit: currentYear.netProfit || 0,
    companyProfit: currentYear.companyProfit || 0,
    activeFranchisees: currentYear.activeFranchisees || 0,
    profitMargin: currentYear.profitMargin || 0,
    perUnitRevenue: currentYear.perUnitRevenue || 0,
    marketingFund: currentYear.marketingFund || 0,
    techFeeRevenue: currentYear.techFeeRevenue || 0
  };
};