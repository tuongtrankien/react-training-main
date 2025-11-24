import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalInformationSchema } from "../../../utils/validation";
import api from "../../../api/axios";
import { useParams } from "react-router";
import FinanceStatus from "../finance-status/finance-status";
import { InferType } from "yup";
import PersonalInformation from "../personal-information/personal-information";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthenticatedContext } from "../../../shared/Authenticated";
import { formatDateForInput } from "../../../utils/date";
import { mapKycToUserPatch } from "../../../utils/helper";

export type UserKYCFormData = InferType<typeof personalInformationSchema>;

const UserKYC = () => {
  const { user, updateUser } = useContext(AuthenticatedContext);
  const { id } = useParams();

  const methods = useForm<UserKYCFormData>({
    resolver: yupResolver(personalInformationSchema),
    mode: "onBlur",
    defaultValues: {
      basicInfo: {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        middleName: user?.middleName || "",
        dob: formatDateForInput(user?.birthDate),
        age: user?.age || 0,
      },
      contactInfo: {
        addresses: [
          {
            country: "",
            city: "",
            street: "",
            postalCode: "",
            type: "mailing",
          },
        ],
        emails: [{ email: "", type: "personal", preferred: false }],
        phones: [{ phone: "", type: "personal", preferred: false }],
        identification: [
          { idType: "national-id", expirationDate: "", documentFile: null },
        ],
        occupation: [{ occupation: "unemployed", fromDate: "", toDate: "" }],
      },
      financeStatus: {
        incomes: [{ type: "Salary", amount: 0 }],
        assets: [{ type: "bond", amount: 0 }],
        liabilities: [{ type: "personal-loan", amount: 0 }],
        totalLiabilities: 0,
        sourceOfWealth: [{ type: "inheritance", amount: 0 }],
        totalSourceOfWealth: 0,
        totalNetWorth: 0,
        investmentExperience: "<5-years",
        riskTolerance: "10%",
      },
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: UserKYCFormData) => {
    console.log("Form Data:", data);

    try
    {
      // Map form data to user patch format
      const userPatchData = mapKycToUserPatch(data, user!);
      
      const updatedUser = await api.put(`/user/${id}`, userPatchData);
      console.log("Updated User:", updatedUser);
      
      updateUser(updatedUser.data);

      const usersList = JSON.parse(localStorage.getItem("usersList") || "[]");
      const userIndex = usersList.findIndex((u: any) => u.id === id);
      
      if (userIndex !== -1) {
        usersList[userIndex] = userPatchData;
      } else {
        usersList.push(userPatchData);
      }
      localStorage.setItem("usersList", JSON.stringify(usersList));

      await Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        text: 'User KYC information has been updated successfully.',
      });
    }
    catch (error)
    {
      console.error("Error updating user:", error);
      await Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'There was an error updating the user KYC information. Please try again later.',
      });
    }    
  };

  const onError = async (errors: any) => {
    console.log("Form validation errors:", errors);
    await Swal.fire({
      icon: 'error',
      title: 'Invalid Data',
      text: 'Please correct the errors in the form before submitting.',
      returnFocus: false,
    });
  }

  return (
    <FormProvider {...methods}>
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2
          className="text-2xl font-bold text-center"
          style={{ color: "var(--primary-color)" }}
        >
          Financial Status
        </h2>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
          <PersonalInformation />
          <FinanceStatus />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold my-2 py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default UserKYC;
