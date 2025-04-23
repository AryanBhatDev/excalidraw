import { prisma } from "@repo/db/client";
import { IUserSignupDTO } from "../interfaces/user.interface";
import { encryptPassword } from "@repo/utils/utilities";


class UserService {
    async userSignup(body:IUserSignupDTO){
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
}

export const userService = new UserService();