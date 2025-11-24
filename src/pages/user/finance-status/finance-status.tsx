import { useFormContext, useWatch } from "react-hook-form";
import { UserKYCFormData } from "../kyc/kyc";
import MultipleInputFieldSection from "../../../components/inputs/MultipleInputFieldSection";

const FinanceStatus = () => {
  const { register, control, formState: { errors } } = useFormContext<UserKYCFormData>();
  const financeStatus = useWatch({control, name: 'financeStatus'});

  // Calculate total net worth as (A + B + C + D)
  const totalIncomes = financeStatus.incomes?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;
  const totalAssets = financeStatus.assets?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;
  const totalLiabilities = financeStatus.liabilities?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;
  const totalWealth = financeStatus.sourceOfWealth?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;
  const totalNetWorth = totalIncomes + totalAssets + totalLiabilities + totalWealth;

  return (
    <div className="border panel rounded-md p-4">
      {/* Incomes Section */}
      <MultipleInputFieldSection<UserKYCFormData, any>
        control={control}
        register={register}
        errors={errors}
        name="financeStatus.incomes"
        label="Incomes (A)"
        defaultItem={{ type: "Salary", amount: 0 }}>
          {(field, index, register, errors) => (
            <div key={field.id} className="mb-4 p-4 border rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`financeStatus.incomes.${index}.type`}
                    className="block text-sm font-medium"
                  >
                    Type
                  </label>
                  <select
                    id={`financeStatus.incomes.${index}.type`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    {...register(`financeStatus.incomes.${index}.type`)}
                  >
                    <option value="Salary">Salary</option>
                    <option value="Investment">Investment</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.financeStatus?.incomes && errors.financeStatus.incomes[index]?.type && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.financeStatus.incomes[index]?.type?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`financeStatus.incomes.${index}.amount`}
                    className="block text-sm font-medium"
                  >
                    Amount (Currency)
                  </label>
                  <input
                    type="number"
                    id={`financeStatus.incomes.${index}.amount`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Enter amount"
                    {...register(`financeStatus.incomes.${index}.amount`)}
                  />
                  {errors.financeStatus?.incomes && errors.financeStatus.incomes[index]?.amount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.financeStatus.incomes[index]?.amount?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
      </MultipleInputFieldSection>

      {/* Assets Section */}
      <MultipleInputFieldSection<UserKYCFormData, any>
        control={control}
        register={register}
        errors={errors}
        name="financeStatus.assets"
        label="Assets (B)"
        defaultItem={{ type: "bond", amount: 0 }}>
          {(field, index, register, errors) => (
            <div key={field.id} className="mb-4 p-4 border rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`financeStatus.assets.${index}.type`} className="block text-sm font-medium">
                    Type
                  </label>
                  <select
                    id={`financeStatus.assets.${index}.type`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    {...register(`financeStatus.assets.${index}.type`)}
                  >
                    <option value="bond">Bond</option>
                    <option value="liquidity">Liquidity</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.financeStatus?.assets && errors.financeStatus.assets[index]?.type && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.financeStatus.assets[index]?.type?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`financeStatus.assets.${index}.amount`}
                    className="block text-sm font-medium"
                  >
                    Amount (Currency)
                  </label>
                  <input
                    type="number"
                    id={`financeStatus.assets.${index}.amount`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Enter amount"
                    {...register(`financeStatus.assets.${index}.amount`)}
                  />
                  {errors.financeStatus?.assets && errors.financeStatus.assets[index]?.amount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.financeStatus.assets[index]?.amount?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
      </MultipleInputFieldSection>

      {/* Liabilities Section */}
      <MultipleInputFieldSection<UserKYCFormData, any>
        control={control}
        register={register}
        errors={errors}
        name="financeStatus.liabilities"
        label="Liabilities (C)"
        defaultItem={{ type: "personal-loan", amount: 0 }}
        renderTotal={(items) => {
          const total = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
          return (
            <div className="mt-4">
              <label
                htmlFor="liabilities-total"
                className="block text-sm font-medium"
              >
                Total Liabilities
              </label>
              <input
                type="number"
                id="liabilities-total"
                className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Calculated Total"
                value={total}
                readOnly
              />
            </div>
          )}
        } 
        >
          {(field, index, register, errors) => (
            <div key={field.id} className="mb-4 p-4 border rounded-md">
              <p className="text-sm mb-4 text-gray-600">
                Liabilities are any outstanding debts or obligations you may have.
                These can include loans such as personal loans, mortgages, or other
                forms of debt.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`financeStatus.liabilities.${index}.type`}
                    className="block text-sm font-medium"
                  >
                    Type
                  </label>
                  <select
                    id={`financeStatus.liabilities.${index}.type`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    {...register(`financeStatus.liabilities.${index}.type`)}
                  >
                    <option value="personal-loan">Personal Loan</option>
                    <option value="real-estate-loan">Real Estate Loan</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.financeStatus?.liabilities && errors.financeStatus.liabilities[index]?.type && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.financeStatus.liabilities[index]?.type?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`financeStatus.liabilities.${index}.amount`}
                    className="block text-sm font-medium"
                  >
                    Amount (Currency)
                  </label>
                  <input
                    type="number"
                    id={`financeStatus.liabilities.${index}.amount`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Enter amount"
                    {...register(`financeStatus.liabilities.${index}.amount`)}
                  />
                  {errors.financeStatus?.liabilities && errors.financeStatus.liabilities[index]?.amount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.financeStatus.liabilities[index]?.amount?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
      </MultipleInputFieldSection>                

      {/* Source of Wealth Section */}
      <MultipleInputFieldSection<UserKYCFormData, any>
        control={control}
        register={register}
        errors={errors}
        name="financeStatus.sourceOfWealth"
        label="Source of Wealth (D)"
        defaultItem={{ type: "inheritance", amount: 0, total: 0 }}
        renderTotal={(items) => {
          const total = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
          return (
            <div className="mt-4">
              <label htmlFor="wealth-total" className="block text-sm font-medium">
                Total Source of Wealth
              </label>
              <input
                type="number"
                id="wealth-total"
                className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Calculated Total"
                value={total}
                readOnly
              />
            </div>
          )}
        } 
      >
          {(field, index, register, errors) => (
            <div key={field.id} className="mb-4 p-4 border rounded-md">
              <p className="text-sm mb-4 text-gray-600">
                This section identifies the origin of your wealth, such as any
                inheritance or donations you may have received. It's important for
                financial transparency.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`financeStatus.sourceOfWealth.${index}.type`}
                    className="block text-sm font-medium"
                  >
                    Type
                  </label>
                  <select
                    id={`financeStatus.sourceOfWealth.${index}.type`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    {...register(`financeStatus.sourceOfWealth.${index}.type`)}
                  >
                    <option value="inheritance">Inheritance</option>
                    <option value="donation">Donation</option>
                  </select>
                  {errors.financeStatus?.sourceOfWealth && errors.financeStatus.sourceOfWealth[index]?.type && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.financeStatus.sourceOfWealth[index]?.type?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`financeStatus.sourceOfWealth.${index}.amount`}
                    className="block text-sm font-medium"
                  >
                    Amount (Currency)
                  </label>
                  <input
                    type="number"
                    id={`financeStatus.sourceOfWealth.${index}.amount`}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Enter amount"
                    required
                    {...register(`financeStatus.sourceOfWealth.${index}.amount`)}
                  />
                  {errors.financeStatus?.sourceOfWealth && errors.financeStatus.sourceOfWealth[index]?.amount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.financeStatus.sourceOfWealth[index]?.amount?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
      </MultipleInputFieldSection>

      {/* Net Worth Section */}
      <div className="panel">
        <h3
          className="text-lg font-medium mb-4"
          style={{ color: "var(--primary-color)" }}
        >
          Net Worth
        </h3>
        <div>
          <label
            htmlFor="net-worth-total"
            className="block text-sm font-medium"
          >
            Total
          </label>

          <input
            type="number"
            id="net-worth-total"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
            placeholder="Automatically calculated"
            value={totalNetWorth}
            disabled
          />
        </div>
      </div>

      {/* {<!-- Investment Experience and Objectives Section -->} */}
      <div className="panel">
        <h3
          className="text-lg font-medium mb-4"
          style={{ color: "var(--primary-color)" }}
        >
          Investment Experience and Objectives
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="investment-experience"
              className="block text-sm font-medium"
            >
              Experience in Financial Markets
            </label>
            <select
              id="investment-experience"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              {...register('financeStatus.investmentExperience')}
            >
              <option value="<5-years">{`< 5 years`}</option>
              <option value="5-10-years">{`> 5 and < 10 years`}</option>
              <option value=">10-years">{`> 10 years`}</option>
            </select>
            {errors.financeStatus?.investmentExperience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.financeStatus.investmentExperience?.message}
              </p>
            )}              
          </div>
          <div>
            <label
              htmlFor="risk-tolerance"
              className="block text-sm font-medium"
            >
              Risk Tolerance
            </label>
            <select
              id="risk-tolerance"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              {...register('financeStatus.riskTolerance')}
            >
              <option value="10%">10%</option>
              <option value="30%">30%</option>
              <option value="all-in">All-in</option>
            </select>
            {errors.financeStatus?.riskTolerance && (
              <p className="text-red-500 text-sm mt-1">
                {errors.financeStatus.riskTolerance?.message} 
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceStatus;
