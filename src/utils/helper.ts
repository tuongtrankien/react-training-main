import { User } from "../models/user";
import { UserKYCFormData } from "../pages/user/kyc/kyc";

export const mapKycToUserPatch = (form: UserKYCFormData, currentUser: User): Partial<User> => {
  const { basicInfo, contactInfo, financeStatus } = form;

  return {
    id: currentUser.id,
    firstName: basicInfo.firstName,
    lastName: basicInfo.lastName,
    middleName: basicInfo.middleName ?? currentUser.middleName,
    birthDate: basicInfo.dob,
    age: basicInfo.age ?? currentUser.age,
    email: currentUser.email,
    username: currentUser.username,
    gender: currentUser.gender,
    image: currentUser.image,
    role: currentUser.role,

    // Contact info - array fields
    addresses: contactInfo.addresses as any,
    emails: contactInfo.emails as any,
    phones: contactInfo.phones as any,
    identifications: contactInfo.identification as any,
    occupations: contactInfo.occupation as any,

    // Finance - complete data
    incomes: financeStatus.incomes as any,
    assets: financeStatus.assets as any,
    liabilities: financeStatus.liabilities as any,
    totalLiabilities: financeStatus.totalLiabilities,
    sourceOfWealth: financeStatus.sourceOfWealth as any,
    totalSourceOfWealth: financeStatus.totalSourceOfWealth,
    totalNetWorth: financeStatus.totalNetWorth,
    investmentExperience: financeStatus.investmentExperience as any,
    riskTolerance: financeStatus.riskTolerance as any,
  };
};
