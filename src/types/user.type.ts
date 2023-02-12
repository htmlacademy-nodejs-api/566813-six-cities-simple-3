import { UserType } from "./user-types.type";

export type User = {
    name: string;
    email: string;
    avatarPath: string;
    password: string;
    userType: UserType;
  }
