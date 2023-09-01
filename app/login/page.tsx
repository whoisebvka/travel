import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Messages from './messages';
import rio from "../images/rio.jpeg"
import { url } from 'inspector';
import Image from 'next/image';
import { Caveat, Montserrat } from 'next/font/google'
import SocialLogin from './SocialLogin';




const cavet = Caveat({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })

export default function Login() {
  const supabase = createServerComponentClient({ cookies })

  async function signInWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    })
  }
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  }


  async function signInWithLinkedIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin',
    })
  }
  async function signout() {
    const { error } = await supabase.auth.signOut()
  }
    
  
  return (
    <div className=" flex w-full px-8 sm:max-w-md justify-center overflow-hidden gap-2 bg-cover bg-center bg-fixed" style={{backgroundImage: `url(${rio})`}}>
      <Image alt={" Hero Section"} src={rio} className='absolute object-cover w-full h-full' />
      <div className="absolute inset-0 bg-black opacity-25">
      </div>
      {/* <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link> */}
      <div className="my-24 w-full flex flex-col items-center justify-center py-12  border-2 border-red-600 z-20 ">
        
        <Link href="/" className={`${cavet.className} h-8 text-4xl z-10 mb-4 text-white  w-auto`} >
          mytraveljournal.
        </Link>

        <h1 className={ `${montserrat.className} h-8 text-4xl z-10 mb-6 text-white  w-auto`}>Login</h1>

            <form
              className="flex-1 flex flex-col w-full bg-white rounded-lg p-8 border-2 justify-center gap-2 text-foreground"
              action="/auth/sign-in"
              method="post"
            >

            <SocialLogin />

              <label className="text-md text-black" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md px-4 py-2 border border-slate-400 text-slate-700 bg-slate-200 mb-6"
                name="email"
                placeholder="you@example.com"
                required
              />
              <label className="text-md text-black" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-md px-4 py-2 border border-slate-400 text-slate-700 bg-slate-200 mb-6"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
              <button className="bg-[#f25f14] rounded px-4 py-2 text-white mb-2">
                Login
              </button>
              <span
                // formAction="/auth/sign-up"
                className="rounded px-4 flex items-center justify-center text-black mb-2"
              >
                Don't have an account? <Link href="/signup" className='text-[#f25f14] ml-1 '>Sign Up</Link>
              </span>
              {/* <button
                formAction="/auth/sign-up"
                className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
              >
                Sign Up
              </button> */}
              <Messages />
            </form>
      </div>
    </div>
  )
}
