import { prisma } from "@repo/db/client";
import { IUserSigninDTO, IUserSignupDTO } from "../interfaces/user.interface";
import { checkPassword, encryptPassword } from "@repo/utils/password"
import jwt from 'jsonwebtoken'


class UserService {
    async userSignup(body:IUserSignupDTO):Promise<void>{
        const { email , password, photo, username } = body;
        const user = await prisma.user.findFirst({
            where:{
                email
            }
        })
        if(user){
            throw new Error('Username is taken. Please choose another username')
        }

        const hashedPassword = await encryptPassword(password);

        await prisma.user.create({
            data:{
                email,
                password:hashedPassword,
                photo,
                username
            }
        })

    }
    async userSignin(body:IUserSigninDTO):Promise<Record<string,string>>{
        const { email , password } = body;
        const user = await prisma.user.findFirst({
            where:{
                email
            }
        })
        if(!user){
            throw new Error('Username not found')
        }

        const isCorrectPassword = await checkPassword(password,user.password);
        
        if(!isCorrectPassword){
            throw new Error('Incorrect password. Please try again')
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET)

        return { token }
 
    }
}

export const userService = new UserService();