export class UserEntity {
  id: number;
  email: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
