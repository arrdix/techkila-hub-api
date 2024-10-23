import { User } from '@prisma/client'

export type UserResponse = {
    username: string
    name: string
    role: string
    token?: string
}

export type RegisterUserRequest = {
    username: string
    email: string
    name: string
    password: string
}

export function toUserResponse(user: User): UserResponse {
    const { name, username, role } = user

    return {
        name,
        username,
        role,
    }
}
