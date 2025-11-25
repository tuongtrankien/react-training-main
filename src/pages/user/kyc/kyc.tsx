import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalInformationSchema } from "../../../utils/validation";
import api from "../../../api/axios";
import { useParams } from "react-router";
import FinanceStatus from "../finance-status/finance-status";
import { InferType } from "yup";
import PersonalInformation from "../personal-information/personal-information";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthenticatedContext } from "../../../shared/Authenticated";
import { formatDateForInput } from "../../../utils/date";
import { mapKycToUserPatch } from "../../../utils/helper";
import { KycRecord } from "../../../models/kycsubmission";
import { v4 as uuid } from "uuid";
import { User } from "../../../models/user";

export type UserKYCFormData = InferType<typeof personalInformationSchema>;

const UserKYC = () => {
  const { user, updateUser } = useContext(AuthenticatedContext);
  const { id } = useParams();

  const [isReadOnly, setIsReadOnly] = useState(false);
  const [kycData, setKycData] = useState<User | null>(null);
  const [isAccessDenied, setIsAccessDenied] = useState(false);

  // Determine access control and read-only status
  useEffect(() => {
    if (!user || !id) return;

    const userId = parseInt(id, 10);
    const isOwnProfile = user.id === userId;
    const isAdmin = user.role === "admin";

    if (!isAdmin && !isOwnProfile) {
      setIsAccessDenied(true);
      return;
    }

    if (isAdmin) {
      setIsReadOnly(true);
    }

    // Load data from localStorage
    const kycUsersList = JSON.parse(localStorage.getItem("kycUsersList") || "[]");
    const foundKycData = kycUsersList.find((u: any) => u.id?.toString() === id || u.userId?.toString() === id);
    
    if (foundKycData) {
      setKycData(foundKycData);
    }
  }, [id, user]);

  const methods = useForm<UserKYCFormData>({
    resolver: yupResolver(personalInformationSchema),
    mode: "onBlur",
    defaultValues: {
      basicInfo: {
        firstName: "",
        lastName: "",
        middleName: "",
        dob: "",
        age: 0,
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

  const { handleSubmit, reset } = methods;

  // Update form when kycData or user changes
  useEffect(() => {
    const getDefaultValues = (): UserKYCFormData => {
      const dataSource = kycData;
      console.log("Data Source:", dataSource);
      return {
        basicInfo: {
          firstName: dataSource?.firstName || "",
          lastName: dataSource?.lastName || "",
          middleName: (dataSource as any)?.middleName || "",
          dob: formatDateForInput(dataSource?.birthDate || ""),
          age: dataSource?.age || 0,
        },
        contactInfo: {
          addresses: (dataSource as any)?.addresses || [
            {
              country: "",
              city: "",
              street: "",
              postalCode: "",
              type: "mailing",
            },
          ],
          emails: (dataSource as any)?.emails || [{ email: "", type: "personal", preferred: false }],
          phones: (dataSource as any)?.phones || [{ phone: "", type: "personal", preferred: false }],
          identification: (dataSource as any)?.identifications || [
            { idType: "national-id", expirationDate: "", documentFile: null },
          ],
          occupation: (dataSource as any)?.occupations || [{ occupation: "unemployed", fromDate: "", toDate: "" }],
        },
        financeStatus: {
          incomes: (dataSource as any)?.incomes || [{ type: "Salary", amount: 0 }],
          assets: (dataSource as any)?.assets || [{ type: "bond", amount: 0 }],
          liabilities: (dataSource as any)?.liabilities || [{ type: "personal-loan", amount: 0 }],
          totalLiabilities: (dataSource as any)?.totalLiabilities || 0,
          sourceOfWealth: (dataSource as any)?.sourceOfWealth || [{ type: "inheritance", amount: 0 }],
          totalSourceOfWealth: (dataSource as any)?.totalSourceOfWealth || 0,
          totalNetWorth: (dataSource as any)?.totalNetWorth || 0,
          investmentExperience: (dataSource as any)?.investmentExperience || "<5-years",
          riskTolerance: (dataSource as any)?.riskTolerance || "10%",
        },
      };
    };
    reset(getDefaultValues());
  }, [kycData, user, reset]);

  const onSubmit = async (data: UserKYCFormData) => {
    // Prevent submission if read-only or access denied
    if (isReadOnly || isAccessDenied) {
      await Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You do not have permission to submit this form.',
      });
      return;
    }

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

      // Details kyc users list
      localStorage.setItem("kycUsersList", JSON.stringify(usersList));

      // General kyc submissions list
      const kycSubmission: KycRecord = {
        id: uuid(),
        userId: updatedUser.data.id,
        fullName: `${updatedUser.data.firstName} ${updatedUser.data.lastName}`,
        status: "Pending",
        submittedAt: new Date().toISOString(),
      };

      const kycSubmissions = JSON.parse(localStorage.getItem("kycSubmissions") || "[]");
      kycSubmissions.push(kycSubmission);
      localStorage.setItem("kycSubmissions", JSON.stringify(kycSubmissions));

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

  // Handle access denied case
  if (isAccessDenied) {
    return (
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2
          className="text-2xl font-bold text-center text-red-500"
        >
          Access Denied
        </h2>
        <p className="text-center mt-4 text-gray-600">
          You do not have permission to access this KYC form.
        </p>
      </div>
    );
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
        {isReadOnly && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md">
            <p className="font-semibold">Read-Only Mode</p>
            <p className="text-sm">Admins can only view KYC information in read-only mode. You cannot make edits.</p>
          </div>
        )}
        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
          <PersonalInformation isReadOnly={isReadOnly} />
          <FinanceStatus isReadOnly={isReadOnly} />
          {!isReadOnly && (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold my-2 py-2 px-4 rounded-md"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </FormProvider>
  );
};

export default UserKYC;
