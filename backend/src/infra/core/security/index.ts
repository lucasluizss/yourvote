import crypto from 'crypto';

export const generateToken = (ipAddress: string) => {
    return {
        token: crypto.randomBytes(40).toString('hex'),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    };
};