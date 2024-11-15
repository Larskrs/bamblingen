import { UserRole } from '@prisma/client'
import 'next-auth/jwt'

declare module 'next-auth/jwt' {
    interface JWT {
        id: string // assuming UserId is a string
        role: UserRole
        email: string
    }
}

declare module 'next-auth' {
    interface Session {
        user: {
            id: string // assuming UserId is a string
            role: UserRole // assuming UserRole is the correct type
        }
        error?: "RefreshAccessTokenError"
    }
}

declare module "next-auth/jwt" {
    interface JWT {
      access_token: string
      expires_at: number
      refresh_token: string
      error?: "RefreshAccessTokenError"
    }
}
