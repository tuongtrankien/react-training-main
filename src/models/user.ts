// ========== KYC sub types ==========

// From contactInfo.addresses[]
export interface KycAddress {
  country: string;
  city: string;
  street: string;
  postalCode?: string | null;
  type: "mailing" | "work";
}

// From contactInfo.emails[]
export interface KycEmail {
  email: string;
  type: "personal" | "work";
  preferred: boolean;
}

// From contactInfo.phones[]
export interface KycPhone {
  phone: string;
  type: "personal" | "work";
  preferred: boolean;
}

// From contactInfo.identification[]
export interface KycIdentification {
  idType: "national-id" | "driver-license";
  expirationDate: string;
  documentFile?: File | null;
}

// From contactInfo.occupation[]
export interface KycOccupation {
  occupation: "unemployed" | "engineer" | "teacher" | "doctor" | "others";
  fromDate: string;
  toDate: string;
}

// From financeStatus.incomes[]
export interface IncomeSource {
  type: "Salary" | "Investment" | "Others";
  amount: number;
}

// From financeStatus.assets[]
export interface AssetItem {
  type: "bond" | "liquidity" | "real-estate" | "others";
  amount: number;
}

// From financeStatus.liabilities[]
export interface LiabilityItem {
  type: "personal-loan" | "real-estate-loan" | "others";
  amount: number;
}

// From financeStatus.sourceOfWealth[]
export interface SourceOfWealthItem {
  type: "inheritance" | "donation";
  amount: number;
}

export interface User {
  id: number; 
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: string;

  middleName?: string | null;
  birthDate: string;
  age?: number;

  // ========== Optional KYC contact info ==========
  addresses?: KycAddress[];
  emails?: KycEmail[];
  phones?: KycPhone[];
  identifications?: KycIdentification[];
  occupations?: KycOccupation[];

  // ========== Optional KYC finance status ==========
  incomes?: IncomeSource[];
  assets?: AssetItem[];
  liabilities?: LiabilityItem[];
  totalLiabilities?: number;
  sourceOfWealth?: SourceOfWealthItem[];
  totalSourceOfWealth?: number;
  totalNetWorth?: number;
  investmentExperience?: "<5-years" | "5-10-years" | ">10-years";
  riskTolerance?: "10%" | "30%" | "All-in";
}
