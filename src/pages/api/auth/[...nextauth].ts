import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const users = [
  { id: '1', name: "J Smith", email: "viktor@saritasa.com", password: '12341234' },
]

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log(credentials)
        const user = users.find(user => 
          user.email === credentials?.email && 
          user.password === credentials?.password);

        if (user) {
          return user;
        }

        return null;
      }
    })
  ],
}

export default NextAuth(authOptions)