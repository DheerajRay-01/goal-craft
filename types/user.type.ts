export type UserCategory =
  | "Student"
  | "Fresher"
  | "Professional";

export interface Experience {
  _id?: string;
  companyName: string;
  jobTitle: string;
  employmentType: string;
  location: string;
  startDate: string | Date | null;
  endDate: string | Date | null;
  currentlyWorking: boolean;
}

export interface Education {
  university: string;
  degree: string;
  branch: string;
  graduationYear: string;
}

export interface UserProfile {
  _id?: string;
  fullName: string;
  username: string;
  email: string;
  password?: string;

  userCategory: UserCategory;

  bio?: string;
  avatar?: string;

  education?: Education;

  experiences: Experience[];

  likedPosts?: string[];
  createdPosts?: string[];

  createdAt?: string;
  updatedAt?: string;
}