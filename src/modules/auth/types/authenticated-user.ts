export interface AuthenticatedUser {
  id: number;
  email: string;
  role: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
