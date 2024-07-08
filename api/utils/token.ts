import jwt, { JwtPayload } from "jsonwebtoken";

const getTokenDecoded = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};

export { getTokenDecoded };
