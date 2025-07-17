export interface FranchiseInputs {
  // Network Development
  initialFranchisees: number;
  yearlyDevelopment: {
    [key: number]: {
      planned: number;
      actual: number;
    };
  };
  corporateStores: {
    pilotStores: number;
    yearlyStores: { [key: number]: number };
    avgRevenue: number;
    avgExpenses: number;
    capex: number;
    upgradeReserves: number;
    workingCapital: number;
  };
  churnRate: {
    [key: number]: {
      voluntary: number;
      involuntary: number;
      byRegion: { [region: string]: number };
    };
  };

  // Franchisee Economics
  franchiseFee: {
    standard: number;
    promotional: number;
    transferFee: number;
    transferFeeType: 'flat' | 'percentage';
  };
  equipmentSales: {
    initial: number;
    recurring: number;
  };
  trainingFees: {
    initial: number;
    ongoing: number;
  };

  // Recurring Revenue
  royalties: {
    type: 'flat' | 'tiered';
    baseRate: number;
    tiers?: {
      [threshold: number]: number;
    };
    minimumMonthly?: number;
  };
  marketingFund: {
    type: 'percentage' | 'fixed';
    amount: number;
    yearlyAdjustment: { [key: number]: number };
  };
  techFees: {
    frequency: 'monthly' | 'annual';
    amount: number;
  };
  supportFees: {
    annual: number;
  };

  // Supply Chain & Vendor
  supplyChain: {
    enabled: boolean;
    revenueType: 'percentage' | 'fixed';
    amount: number;
    franchiseeShare: number;
    byVendor: {
      [vendor: string]: {
        revenue: number;
        rebate: number;
      };
    };
  };

  // Marketing & Events
  localAreaMarketing: {
    type: 'direct' | 'fund';
    amount: number;
    corporateMatch: number;
  };
  events: {
    frequency: number;
    revenue: {
      tickets: number;
      sponsorships: number;
    };
    costs: number;
  };

  // Operations & Overhead
  corporateMarketing: {
    annual: number;
    inflationAdjustment: number;
  };
  staffing: {
    [role: string]: {
      count: number;
      salary: number;
      benefits: number;
      training: number;
    };
  };
  legal: {
    annual: number;
    perTransaction: number;
  };
  customCosts: {
    [name: string]: {
      amount: number;
      frequency: 'once' | 'monthly' | 'annual';
      startYear: number;
      endYear?: number;
    };
  };

  // Financial Parameters
  inflation: number;
  leadConversion: number;
  capitalRequirements: {
    [year: number]: {
      amount: number;
      purpose: string;
    };
  };
}

export interface CalculatorOutputs {
  networkMetrics: {
    totalUnits: number;
    franchiseUnits: number;
    corporateUnits: number;
    byRegion: { [region: string]: number };
  };
  revenue: {
    total: number;
    byStream: {
      franchiseFees: number;
      royalties: number;
      corporateStores: number;
      equipment: number;
      marketing: number;
      technology: number;
      support: number;
      supplyChain: number;
      events: number;
      other: number;
    };
    perUnit: number;
  };
  profitability: {
    grossProfit: number;
    netProfit: number;
    margins: {
      gross: number;
      net: number;
      byStream: { [stream: string]: number };
    };
    breakevenPoint: {
      time: number;
      units: number;
    };
  };
  cashFlow: {
    inflows: { [category: string]: number };
    outflows: { [category: string]: number };
    net: number;
    cumulative: number;
  };
  sensitivity: {
    [variable: string]: {
      impact: number;
      threshold: number;
    };
  };
}