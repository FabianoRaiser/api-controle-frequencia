import { ramdonBytes } from 'crypto';

const generateToken = (length = 32) => {
    return ramdonBytes(length).toString('hex');
}

export default generateToken;