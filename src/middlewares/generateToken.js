import { randomBytes } from 'crypto';

const generateToken = (length = 32) => {
    return randomBytes(length).toString('hex');
}

export default generateToken;