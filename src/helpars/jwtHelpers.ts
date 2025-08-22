import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const generateToken = (payload: any, secret: Secret, expiresIn: string | number) => {
    const token = jwt.sign(
        payload,
        secret,
        {
            algorithm: 'HS256',
            expiresIn : "30d",
        }
    );

    return token;
};

const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as JwtPayload;
}

export const jwtHelpers = {
    generateToken,
    verifyToken
}