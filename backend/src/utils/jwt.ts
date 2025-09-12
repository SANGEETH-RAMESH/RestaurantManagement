import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "yourRefreshSecret";

export const generateAccessToken = (payload:object):string =>{
    return jwt.sign(payload,ACCESS_TOKEN_SECRET,{expiresIn:"1h"});
}

export const generateRefreshToken = (payload:object) : string =>{
    return jwt.sign(payload,REFRESH_TOKEN_SECRET,{expiresIn:'7h'});
}

export const verifyAccessToken = (token:string) =>{
    return jwt.verify(token,ACCESS_TOKEN_SECRET);
}

export const verifyRefreshToken = (token:string) =>{
    return jwt.verify(token,REFRESH_TOKEN_SECRET);
}