import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt: process.env.SALT,
  cloudinary: {
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
  },
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_algorithm: process.env.JWT_ALGORITHM,
  access_token_expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
