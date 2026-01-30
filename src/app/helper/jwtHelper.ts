import jwt from "jsonwebtoken";
import config from "../../config";
const generateAccessToken = (payload: any) => {
  const accessToken = jwt.sign(
    { email: payload.email, role: payload.role },
    config.jwt_secret_key as string,
    {
      algorithm: config.jwt_algorithm as jwt.Algorithm,
      expiresIn: config.access_token_expiresIn as any,
    },
  );
  return accessToken;
};

const generateRefreshToken = (payload: any) => {
  const refreshToken = jwt.sign(
    { email: payload.email, role: payload.role },
    config.jwt_secret_key as string,
    {
      algorithm: config.jwt_algorithm as jwt.Algorithm,
      expiresIn: config.access_token_expiresIn as any,
    },
  );
  return refreshToken;
};

export const tokenGenerator = {
  generateAccessToken,
  generateRefreshToken,
};
