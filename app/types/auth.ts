export type UserRole = "CLIENT" | "FREELANCER";

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};
