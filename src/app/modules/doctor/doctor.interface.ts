import { Gender } from "../../../generated/prisma/enums";

export type IDoctorUpdateInput = {
  name: string;
  email: string;
  contactNumber: string;
  address: string | null;
  registrationNumber: string;
  experience: number;
  gender: Gender;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  specialties: {
    specialtyId: string;
    isDeleted?: boolean;
  }[];
};
