import * as Yup from "yup";

// Related to KYC schema validation
const addressSchema = Yup.object().shape({
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    postalCode: Yup.string().notRequired().nullable(),
    type: Yup.mixed()
        .oneOf(["mailing", "work"], "Type must be either mailing or work")
        .required("Type is required"),
});

const emailsSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    type: Yup.mixed()
        .oneOf(["personal", "work"], "Type must be either personal or work")
        .required("Type is required"),
    preferred: Yup.boolean().required("Preferred is required"),
});

const phonesSchema = Yup.object().shape({
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
    type: Yup.mixed()
        .oneOf(["personal", "work"], "Type must be either personal or work")
        .required("Type is required"),
    preferred: Yup.boolean().required("Preferred is required"),
});

const identificationSchema = Yup.object().shape({
    idType: Yup.mixed()
        .oneOf(["national-id", "driver-license"], "Invalid ID type")
        .required("ID type is required"),
    expirationDate: Yup.string()
        .required("Expiration date is required")
        .test("expiration-valid", "Expiration date must be in the future", function(value) {
            if (!value) return false;
            const date = new Date(value);
            return date > new Date();
        }),
    documentFile: Yup.mixed().notRequired().nullable(),
});

const occupationSchema = Yup.object().shape({
    occupation: Yup.mixed()
        .oneOf(["unemployed", "engineer", "teacher", "doctor", "others"], "Invalid occupation")
        .required("Occupation is required"),
    fromDate: Yup.string().required("From date is required"),
    toDate: Yup.string()
        .required("To date is required")
        .test("to-date-valid", "To date cannot be before from date", function(value) {
            const { fromDate } = this.parent;
            if (!value || !fromDate) return true;
            return new Date(value) >= new Date(fromDate);
        }),
});

const basicInfoSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    middleName: Yup.string().notRequired().nullable(),
    dob: Yup.string()
        .required("Date of birth is required")
        .test("dob-valid", "Date of birth cannot be in the future", function(value) {
            if (!value) return false;
            const dob = new Date(value);
            return dob <= new Date();
        }),
    age: Yup.number()
});

const contactInfoSchema = Yup.object().shape({
    addresses: Yup.array()
        .of(addressSchema)
        .min(1, "At least one address is required"),
    emails: Yup.array()
        .of(emailsSchema)
        .min(1, "At least one email is required"),
    phones: Yup.array()
        .of(phonesSchema)
        .min(1, "At least one phone number is required"),
    identification: Yup.array()
        .of(identificationSchema)
        .min(1, "At least one identification is required"),
    occupation: Yup.array()
        .of(occupationSchema)
        .min(1, "At least one occupation is required"),
});

const incomeSourceSchema = Yup.object().shape({
    type: Yup.mixed()
        .oneOf(["Salary", "Investment", "Others"], "Invalid income type"),
    amount: Yup.number().required("Amount is required"),
});

const assetSchema = Yup.object().shape({
    type: Yup.mixed()
        .oneOf(["bond", "liquidity", "real-estate", "others"], "Invalid asset type"),
    amount: Yup.number().required("Amount is required"),
});

const liabilitiesSchema = Yup.object().shape({
    type: Yup.mixed()
        .oneOf(["personal-loan", "real-estate-loan", "others"], "Invalid liability type"),
    amount: Yup.number().required("Amount is required"),
});

const sourceOfWealthSchema = Yup.object().shape({
    type: Yup.mixed()
        .oneOf(["inheritance", "donation"], "Invalid source of wealth type"),
    amount: Yup.number().required("Amount is required"),
});

const financeStatusSchema = Yup.object().shape({
    incomes: Yup.array()
        .of(incomeSourceSchema)
        .min(1, "At least one income source is required"),
    assets: Yup.array()
        .of(assetSchema)
        .min(1, "At least one asset is required"),
    liabilities: Yup.array()
        .of(liabilitiesSchema)
        .min(1, "At least one liability is required"),
    totalLiabilities: Yup.number(),
    sourceOfWealth: Yup.array()
        .of(sourceOfWealthSchema)
        .min(1, "At least one source of wealth is required"),
    totalSourceOfWealth: Yup.number(),
    totalNetWorth: Yup.number(),
    investmentExperience: Yup.mixed()
        .oneOf(["<5-years", "5-10-years", ">10-years"], "Invalid experience level"),
    riskTolerance: Yup.mixed()
        .oneOf(["10%", "30%", "All-in"], "Invalid risk tolerance level"),
});

export const personalInformationSchema = Yup.object().shape({
    basicInfo: basicInfoSchema,
    contactInfo: contactInfoSchema,
    financeStatus: financeStatusSchema,
});

// Related to Edit profile schema validation
export const editProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
});