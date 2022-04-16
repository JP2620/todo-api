import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string) {
    const SALT: string = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT)
}

export function comparePasswords(rawPassword: string, hashedPassword: string) {
    return bcrypt.compareSync(rawPassword, hashedPassword);
}