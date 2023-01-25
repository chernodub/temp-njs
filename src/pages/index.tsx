import { signIn, signOut, useSession } from 'next-auth/react'
import { ChangeEventHandler, useCallback, useState } from 'react'

export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return <SignInForm />;
}

function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => setEmail(event.target.value), []);
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => setPassword(event.target.value), []);

  return (
    <>
      <input placeholder='Email' autoComplete='email' type="email" name="email" onChange={handleEmailChange} />
      <input placeholder='Password' autoComplete='password' type="password" name="password" onChange={handlePasswordChange} />
      <button onClick={() => signIn('credentials', {
        redirect: false, 
        password: password, 
        email: email,
      })}>Sign in</button>
    </>
  )
}