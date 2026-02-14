import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
    return jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET as string,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRE || "15m",
        } as jwt.SignOptions
    );
};

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d",
        } as jwt.SignOptions
    );
};



