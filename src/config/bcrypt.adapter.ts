import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export const bcryptAdapter = {
  hash: (password: string) => {
    const salt = genSaltSync(12);
    return hashSync(password, salt);
  },

  compare: (bodyPassword: string, hashedPassword: string): boolean => {
    return compareSync(bodyPassword, hashedPassword);
  },
};
