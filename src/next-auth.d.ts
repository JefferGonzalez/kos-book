import { DefaultSession } from 'next-auth'

declare type CustomUser = DefaultSession['user'] & { 
  username:string
 }
declare module 'next-auth' {
  interface Session {
    accessToken: string
    user: CustomUser
  }
}
