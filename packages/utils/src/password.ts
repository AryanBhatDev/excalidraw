import { hash, compare } from 'bcrypt';

export const encryptPassword =async (password:string):Promise<string>=>{
    const saltRounds = 10
    const hashedPassword = await hash(password,saltRounds);
    return hashedPassword;
}

export const checkPassword =async (password:string,dbPassword:string):Promise<boolean>=>{
    const isCorrect = await compare(password,dbPassword);
    return isCorrect
}