import { prisma } from "@repo/db/client";
import { IUserSigninDTO, IUserSignupDTO } from "../interfaces/user.interface";
import { checkPassword, encryptPassword } from "@repo/utils/password"


class UserService {
    async userSignup(body:IUserSignupDTO):Promise<void>{
        const { username , password } = body;
        const user = await prisma.user.findFirst({
            where:{
                username
            }
        })
        if(user){
            throw new Error('Username is taken. Please choose another username')
        }

        const hashedPassword = await encryptPassword(password);

        await prisma.user.create({
            data:{
                username,
                password:hashedPassword
            }
        })

    }
    async userSignin(body:IUserSigninDTO):Promise<string>{
        const { username , password } = body;
        const user = await prisma.user.findFirst({
            where:{
                username
            }
        })
        if(!user){
            throw new Error('Username not found')
        }

        const isCorrectPassword = await checkPassword(password,user.password);

        return user.username
 
    }
}

export const userService = new UserService();