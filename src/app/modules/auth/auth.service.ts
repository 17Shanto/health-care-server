import config from "../../../config";
import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { tokenGenerator } from "../../helper/jwtHelper";

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  if (!user) {
    throw new Error("Invalid credentials or account inactive ❌");
  }
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }
  const accessToken = tokenGenerator.generateAccessToken({
    email: user.email,
    role: user.role,
  });
  const refreshToken = tokenGenerator.generateRefreshToken({
    email: user.email,
    role: user.role,
  });
  return {
    accessToken,
    refreshToken,
    needPassWordChange: user.needPasswordChange,
  };
};
export const AuthService = {
  login,
};
