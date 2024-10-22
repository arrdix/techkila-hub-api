import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'
import { RegisterUserRequest, toUserResponse, UserResponse } from '../model/user.model'
import { UserValidation } from '../validation/user-validation'
import { Validation } from '../validation/validation'
import bcrypt from 'bcrypt'

export class UserService {
    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request)

        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username,
            },
        })

        if (totalUserWithSameUsername != 0) {
            throw new ResponseError(400, 'Username already exist.')
        }

        const totalUserWithSameEmail = await prismaClient.user.count({
            where: {
                email: registerRequest.email,
            },
        })

        if (totalUserWithSameEmail != 0) {
            throw new ResponseError(400, 'Email already exist.')
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        const user = await prismaClient.user.create({
            data: {
                ...registerRequest,
                role: 'Guest',
            },
        })

        return toUserResponse(user)
    }
}
