export type UserRole = 'Tenant' | 'Landlord' | 'Admin';

export interface UserData {
  email: string;
  role: UserRole;
  createdAt: Date;
}