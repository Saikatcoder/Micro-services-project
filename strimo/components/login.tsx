'use client'

import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Card, CardContent, CardDescription, CardFooter } from './ui/card'
import { Form } from 'antd'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from './ui/input-otp'
import Logo from './shared/logo'
import Link from 'next/link'
import httpRequest from '@/lib/http'
import { UserInterface } from './signup'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [user, setUser] = useState<UserInterface | null>(null)
  const [sent, setSent] = useState(false)
  const router = useRouter()

  const login = async (values: any) => {
    try {
      await httpRequest.post("/auth/send-otp", values)
      setUser(values)
      setSent(true)
    } catch (err: any) {
      console.log(err.response.data.message)
    }
  }

  const verifyOtp = async (values: any) => {
    try {
      if (!user)
        return

      const payload = {
        mobile: user.mobile,
        otp: Number(values.otp)
      }

      await httpRequest.post("/auth/verify-otp", payload)
      router.replace("/app")
    } catch (err) {
      if (err instanceof Error)
        console.log(err.message)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-4">

      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-linear-to-r from-fuchsia-500 via-indigo-500 to-sky-400 opacity-20 blur-3xl" />
        <div className="absolute right-20 bottom-20 h-72 w-72 rounded-full bg-pink-500 opacity-10 blur-3xl" />
      </div>

      {sent ? (
        <Card className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-purple-500/20 bg-zinc-950/95 shadow-2xl backdrop-blur-xl">

          <CardContent className="p-8">

            <div className="mb-6 flex justify-center">
              <Logo />
            </div>

            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white">
                OTP Verification
              </h1>

              <p className="mt-2 text-sm text-zinc-400">
                Enter the verification code sent to your mobile
              </p>
            </div>

            <Form
              layout="vertical"
              onFinish={verifyOtp}
            >
              <Form.Item
                name="otp"
                rules={[
                  {
                    required: true,
                    message: 'Enter OTP'
                  }
                ]}
              >
                <div className="flex justify-center py-4">
                  <InputOTP maxLength={4}>
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="h-14 w-14 border-zinc-700 bg-zinc-900 text-lg text-white"
                      />

                      <InputOTPSlot
                        index={1}
                        className="h-14 w-14 border-zinc-700 bg-zinc-900 text-lg text-white"
                      />
                    </InputOTPGroup>

                    <InputOTPSeparator />

                    <InputOTPGroup>
                      <InputOTPSlot
                        index={2}
                        className="h-14 w-14 border-zinc-700 bg-zinc-900 text-lg text-white"
                      />

                      <InputOTPSlot
                        index={3}
                        className="h-14 w-14 border-zinc-700 bg-zinc-900 text-lg text-white"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </Form.Item>

              <Form.Item className="mt-6">
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-linear-to-r from-fuchsia-500 via-indigo-500 to-sky-400 text-base font-semibold text-white shadow-lg transition-all hover:brightness-110"
                >
                  Verify OTP
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-xs text-zinc-500">
                Secure authentication powered by OTP verification
              </p>

              <p className="mt-2 text-xs text-zinc-600">
                Didn&apos;t receive code?{" "}
                <span className="cursor-pointer text-sky-400">
                  Resend
                </span>
              </p>
            </div>

          </CardContent>
        </Card>
      ) : (
        <Card className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-purple-500/20 bg-zinc-950/95 shadow-2xl backdrop-blur-xl">

          <CardContent className="p-8">

            <div className="mb-6 flex justify-center">
              <Logo />
            </div>

            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white">
                Welcome Back to Strimo
              </h1>

              <p className="mt-2 text-sm text-gray-400">
                Secure account creation with mobile OTP verification
              </p>
            </div>

            <Form
              layout="vertical"
              onFinish={login}
            >
              <Form.Item
                label={
                  <span className="text-gray-300">
                    Mobile Number
                  </span>
                }
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: 'Please enter mobile number'
                  }
                ]}
              >
                <PhoneInput
                  country="in"
                  enableSearch
                  placeholder="Enter your mobile number"
                  containerStyle={{
                    width: '100%',
                  }}
                  inputStyle={{
                    width: '100%',
                    height: '52px',
                    background: '#09090B',
                    border: '1px solid rgb(63 63 70)',
                    borderRadius: '12px',
                    color: '#fff',
                    paddingLeft: '55px',
                    fontSize: '15px',
                    fontWeight: '500',
                    transition: 'all .3s ease',
                  }}
                  buttonStyle={{
                    background: '#09090B',
                    border: '1px solid rgb(63 63 70)',
                    borderRadius: '12px 0 0 12px',
                    width: '48px',
                  }}
                  dropdownStyle={{
                    background: '#09090B',
                    color: '#fff',
                    border: '1px solid rgb(63 63 70)',
                    borderRadius: '12px',
                    maxHeight: '280px',
                  }}
                  searchStyle={{
                    background: '#18181B',
                    color: '#fff',
                    border: '1px solid rgb(63 63 70)',
                    borderRadius: '8px',
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="submit"
                  className="mt-2 h-11 w-full rounded-xl bg-linear-to-r from-fuchsia-500 via-indigo-500 to-sky-400 text-base font-semibold text-white shadow-lg transition-all hover:brightness-110"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Form.Item>
            </Form>

            <div className="flex items-center justify-center">
              <CardDescription className="text-zinc-500">
                Don&apos;t have an account?
              </CardDescription>

              <Link href="/signup">
                <Button
                  variant="link"
                  className="text-sky-400 hover:text-sky-300"
                >
                  Signup
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-center text-xs text-gray-500">
              Secure authentication powered by OTP verification
            </p>

          </CardContent>
        </Card>
      )}

      <div className="fixed -bottom-[700px] left-1/2 h-[1080px] w-[1080px] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-400 via-indigo-500 to-violet-500 opacity-30" />

    </div>
  )
}

export default Login