'use client'

import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import Link from 'next/link'
import httpRequest from '@/lib/http'

import { Form, Input } from 'antd'
import { ArrowRight } from 'lucide-react'

import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
} from './ui/card'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from './ui/input-otp'

import Logo from './shared/logo'
import { useRouter } from 'next/navigation'

export interface UserInterface {
  fullname: string
  email: string
  mobile: string
}

const Signup = () => {
  const [sent, setSent] = useState(false)
  const router = useRouter()

  const [phone, setPhone] = useState('')

  const [user, setUser] = useState<UserInterface | null>(null)

  const signup = async (values: any) => {
    try {
      const payload = {
        ...values,
        mobile: phone
      }

      await httpRequest.post("/auth/signup", payload)

      setUser(payload)
      setSent(true)
    }
    catch (err) {
      if (err instanceof Error)
        console.log(err.message)
    }
  }

  const verifyOtp = async (values: any) => {
    try {
      if (!user)
        return

      const payload = {
        mobile: user.mobile,
        otp: values.otp
      }

      await httpRequest.post("/auth/verify-otp", payload)

      setUser(null)

      router.replace("/app")
    }
    catch (err) {
      if (err instanceof Error)
        console.log(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-20 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-400" />
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full blur-3xl opacity-10 bg-pink-500" />
      </div>

      {sent ? (

        <Card className="relative z-10 w-full max-w-md bg-zinc-950/95 border border-zinc-800 rounded-3xl shadow-2xl">

          <CardContent className="p-8">

            <div className="flex justify-center mb-6">
              <Logo />
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                OTP Verification
              </h2>

              <p className="text-zinc-400 mt-2">
                Verification code sent to
              </p>

              <p className="text-sky-400 font-medium">
                +{user?.mobile}
              </p>
            </div>

            <Form
              layout="vertical"
              onFinish={verifyOtp}
              className="mt-8"
            >
              <Form.Item
                      name="otp"
                      rules={[
                        {
                          required: true,
                          message: "Enter OTP",
                        },
                      ]}
                    >
                <div className="flex justify-center">

                  <InputOTP maxLength={4}>

                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>

                    <InputOTPSeparator />

                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>

                  </InputOTP>

                </div>
              </Form.Item>
              <Button
                type="submit"
                disabled={!user}
                className="w-full h-12 mt-6 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-400"
              >
                {user ? "Verifying..." : "Verify OTP"}

                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </Form>

            <div className="text-center mt-6">

              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-sky-400 hover:text-sky-300 text-sm"
              >
                Change Mobile Number
              </button>

            </div>

          </CardContent>

        </Card>

      ) : (

        <Card className="relative z-10 w-full max-w-md border border-purple-500/20 bg-zinc-950 shadow-2xl rounded-2xl">

          <CardContent className="p-8">

            <div className="flex justify-center mb-6">
              <Logo />
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">
                Welcome to Strimo
              </h1>

              <p className="text-gray-400 mt-2 text-sm">
                Secure account creation with mobile OTP verification
              </p>
            </div>

            <Form
              layout="vertical"
              onFinish={signup}
            >

              <Form.Item
                label={<span className="text-gray-300">Full Name</span>}
                name="fullname"
                rules={[
                  {
                    required: true,
                    message: "Please enter your full name",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your full name"
                  className="bg-black! border-zinc-800! text-white! rounded-xl!"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-300">Email</span>}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter email",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter email"
                  className="bg-black! border-zinc-800! text-white! rounded-xl!"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-300">Mobile Number</span>}
              >

                <PhoneInput
                  country="in"
                  enableSearch
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  placeholder="Enter mobile number"
                  containerStyle={{
                    width: "100%",
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "50px",
                    background: "#09090B",
                    color: "#fff",
                    border: "1px solid #3f3f46",
                    borderRadius: "12px",
                    paddingLeft: "55px",
                  }}
                  buttonStyle={{
                    background: "#09090B",
                    border: "1px solid #3f3f46",
                    borderRadius: "12px 0 0 12px",
                  }}
                  dropdownStyle={{
                    background: "#09090B",
                    color: "#fff",
                  }}
                />

              </Form.Item>

              <Button
                type="submit"
                disabled={!phone}
                className="w-full h-12 mt-2 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-400"
              >
                {phone ? "Sending OTP..." : "Send OTP"}

                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </Form>

            <div className="flex justify-center items-center mt-5">

              <CardDescription>
                Already have an account?
              </CardDescription>

              <Link href="/login">
                <Button variant="link">
                  Login
                </Button>
              </Link>

            </div>

            <p className="text-center text-xs text-gray-500 mt-6">
              Secure authentication powered by OTP verification
            </p>

          </CardContent>

        </Card>

      )}

    </div>
  )
}

export default Signup