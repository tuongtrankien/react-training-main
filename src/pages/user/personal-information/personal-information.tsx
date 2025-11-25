import { useFormContext, useWatch } from "react-hook-form";
import { UserKYCFormData } from "../kyc/kyc";
import MultipleInputFieldSection from "../../../components/inputs/MultipleInputFieldSection";
import { EmailItem } from "../../../models/emailItem";

interface PersonalInformationProps {
  isReadOnly?: boolean;
}

const PersonalInformation = ({ isReadOnly = false }: PersonalInformationProps) => {
  const { control, register, formState: { errors } } = useFormContext<UserKYCFormData>();
  const dob = useWatch({ control, name: "basicInfo.dob" });
  const ageCalc = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  return (
    <>
      <div className="border panel rounded-md p-4">
        <h3
          className="text-lg font-medium mb-4"
          style={{ color: "var(--primary-color)" }}
        >
          Basic Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              placeholder="Enter your first name"
              disabled={isReadOnly}
              {...register("basicInfo.firstName")}
            />
            {errors.basicInfo?.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.basicInfo.firstName?.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              placeholder="Enter your last name"
              disabled={isReadOnly}
              {...register("basicInfo.lastName")}
            />
            {errors.basicInfo?.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.basicInfo.lastName?.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="middle-name" className="block text-sm font-medium">
              Middle Name
            </label>
            <input
              type="text"
              id="middle-name"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              placeholder="Enter your middle name"
              disabled={isReadOnly}
              {...register("basicInfo.middleName")}
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              disabled={isReadOnly}
              {...register("basicInfo.dob")}
            />
            {errors.basicInfo?.dob && (
              <p className="text-red-500 text-sm mt-1">
                {errors.basicInfo.dob?.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              placeholder="Enter your age"
              disabled={isReadOnly}
              value={dob ? ageCalc(dob) : ""}
            />
            {errors.basicInfo?.age && (
              <p className="text-red-500 text-sm mt-1">
                {errors.basicInfo.age?.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border panel rounded-md p-4">
        <h3
          className="text-lg font-medium mb-4"
          style={{ color: "var(--primary-color)" }}
        >
          Contact Information
        </h3>

        {/* {Addresses section} */}
        <MultipleInputFieldSection<UserKYCFormData, any>
          control={control}
          register={register}
          errors={errors}
          name="contactInfo.addresses"
          label="Addresses"
          defaultItem={{ country: "", city: "", street: "", postalCode: "", type: "mailing" }}
        >
          {(field, index, register, errors) => (
            <div key={field.id} className="mb-4 p-4 border rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`country-${index}`}
                    className="block text-sm font-medium"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id={`country-${index}`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Enter country"
                    disabled={isReadOnly}
                    {...register(`contactInfo.addresses.${index}.country`)}
                  />
                  {errors.contactInfo?.addresses?.[index]?.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.addresses?.[index]?.country?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`city-${index}`}
                    className="block text-sm font-medium"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id={`city-${index}`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Enter city"
                    disabled={isReadOnly}
                    {...register(`contactInfo.addresses.${index}.city`)}
                  />
                  {errors.contactInfo?.addresses?.[index]?.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.addresses?.[index]?.city?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`street-${index}`}
                    className="block text-sm font-medium"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    id={`street-${index}`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Enter street"
                    disabled={isReadOnly}
                    {...register(`contactInfo.addresses.${index}.street`)}
                  />
                  {errors.contactInfo?.addresses?.[index]?.street && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.addresses?.[index]?.street?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`postal-code-${index}`}
                    className="block text-sm font-medium"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id={`postal-code-${index}`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Enter postal code"
                    disabled={isReadOnly}
                    {...register(`contactInfo.addresses.${index}.postalCode`)}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`address-type-${index}`}
                    className="block text-sm font-medium"
                  >
                    Type
                  </label>
                  <select
                    id={`address-type-${index}`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    disabled={isReadOnly}
                    {...register(`contactInfo.addresses.${index}.type`)}
                  >
                    <option value="mailing">Mailing</option>
                    <option value="work">Work</option>
                  </select>
                  {errors.contactInfo?.addresses?.[index]?.type && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.addresses?.[index]?.type?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </MultipleInputFieldSection>

        {/* {Emails section} */}
        <MultipleInputFieldSection<UserKYCFormData, EmailItem>
          control={control}
          register={register}
          errors={errors}
          name="contactInfo.emails"
          label="Emails"
          defaultItem={{ email: "", type: "personal", preferred: false }}
        >
          {(field, index, register, errors) => (
            <div key={field.id} className="mb-4 p-4 border rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`email-address-${index}`}
                    className="block text-sm font-medium"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id={`email-address-${index}`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Enter email address"
                    disabled={isReadOnly}
                    {...register(`contactInfo.emails.${index}.email`)}
                  />
                  {errors.contactInfo?.emails?.[index]?.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.emails?.[index]?.email?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`email-type-${index}`}
                    className="block text-sm font-medium"
                  >
                    Type
                  </label>
                  <select
                    id={`email-type-${index}`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    disabled={isReadOnly}
                    {...register(`contactInfo.emails.${index}.type`)}
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                  </select>
                  {errors.contactInfo?.emails?.[index]?.type && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.emails?.[index]?.type?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`email-preferred-${index}`}
                    className="block text-sm font-medium"
                  >
                    Preferred
                  </label>
                  <select
                    id={`email-preferred-${index}`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    disabled={isReadOnly}
                    {...register(`contactInfo.emails.${index}.preferred`)}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </MultipleInputFieldSection>

        {/* {Phones section} */}
        <MultipleInputFieldSection<UserKYCFormData, any>
          control={control}
          register={register}
          errors={errors}
          name="contactInfo.phones"
          label="Phones"
          defaultItem={{ phone: "", type: "personal", preferred: false }}
        >
          {(field, index, register, errors) => (
            <div key={field.id} className="mb-4 p-4 border rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`phone-number-${index}`}
                    className="block text-sm font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id={`phone-number-${index}`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Enter phone number (10 digits)"
                    disabled={isReadOnly}
                    {...register(`contactInfo.phones.${index}.phone`)}
                  />
                  {errors.contactInfo?.phones?.[index]?.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.phones?.[index]?.phone?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`phone-type-${index}`}
                    className="block text-sm font-medium"
                  >
                    Type
                  </label>
                  <select
                    id={`phone-type-${index}`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    disabled={isReadOnly}
                    {...register(`contactInfo.phones.${index}.type`)}
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                  </select>
                  {errors.contactInfo?.phones?.[index]?.type && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.phones?.[index]?.type?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`phone-preferred-${index}`}
                    className="block text-sm font-medium"
                  >
                    Preferred
                  </label>
                  <select
                    id={`phone-preferred-${index}`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    disabled={isReadOnly}
                    {...register(`contactInfo.phones.${index}.preferred`)}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </MultipleInputFieldSection>        

        {/* Identification Documents Section */}
        <MultipleInputFieldSection<UserKYCFormData, any>
          control={control}
          register={register}
          errors={errors}
          name="contactInfo.identification"
          label="Identification Documents"
          defaultItem={{ idType: "national-id", expirationDate: "", documentFile: null }}
        >
          {(field, index, register, errors) => (
            <div key={field.id} className="mb-4 p-4 border rounded-md">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="id-type" className="block text-sm font-medium">
                    Type
                  </label>
                  <select
                    id="id-type"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    disabled={isReadOnly}
                    {...register(`contactInfo.identification.${index}.idType`)}
                  >
                    <option value="national-id">National ID Card</option>
                    <option value="driver-license">Driver License</option>
                  </select>
                  {errors.contactInfo?.identification?.[index]?.idType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.identification?.[index]?.idType?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="id-expired" className="block text-sm font-medium">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    id="id-expired"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    disabled={isReadOnly}
                    {...register(`contactInfo.identification.${index}.expirationDate`)}
                  />
                  {errors.contactInfo?.identification?.[index]?.expirationDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.identification?.[index]?.expirationDate?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="id-file" className="block text-sm font-medium">
                    Upload Document
                  </label>
                  <input
                    type="file"
                    id="id-file"
                    className="w-full px-4 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    disabled={isReadOnly}
                    {...register(`contactInfo.identification.${index}.documentFile`)}
                  />
                  {errors.contactInfo?.identification?.[index]?.documentFile && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.identification?.[index]?.documentFile?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </MultipleInputFieldSection>

        {/* Occupations Section */}
        <MultipleInputFieldSection<UserKYCFormData, any>
          control={control}
          register={register}
          errors={errors}
          name="contactInfo.occupation"
          label="Occupations"
          defaultItem={{ occupation: "unemployed", fromDate: "", toDate: "" }}
        >
          {(field, index, register, errors) => (
            <div key={field.id} className="mb-4 p-4 border rounded-md">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium">
                    Occupation
                  </label>
                  <select
                    id="occupation"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    disabled={isReadOnly}
                    {...register(`contactInfo.occupation.${index}.occupation`)}
                  >
                    <option value="unemployed">Unemployed</option>
                    <option value="engineer">Engineer</option>
                    <option value="teacher">Teacher</option>
                    <option value="doctor">Doctor</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.contactInfo?.occupation?.[index]?.occupation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.occupation?.[index]?.occupation?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="occupation-from"
                    className="block text-sm font-medium"
                  >
                    From Date
                  </label>
                  <input
                    type="date"
                    id="occupation-from"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    disabled={isReadOnly}
                    {...register(`contactInfo.occupation.${index}.fromDate`)}
                  />
                  {errors.contactInfo?.occupation?.[index]?.fromDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.occupation?.[index]?.fromDate?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="occupation-to"
                    className="block text-sm font-medium"
                  >
                    To Date
                  </label>
                  <input
                    type="date"
                    id="occupation-to"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    disabled={isReadOnly}
                    {...register(`contactInfo.occupation.${index}.toDate`)}
                  />
                  {errors.contactInfo?.occupation?.[index]?.toDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactInfo?.occupation?.[index]?.toDate?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </MultipleInputFieldSection>
      </div>
    </>
  );
};

export default PersonalInformation;
