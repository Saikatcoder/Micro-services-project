'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Ghost, Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-400 opacity-20 blur-[140px]" />

        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500 opacity-20 blur-[150px]" />

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/5 blur-[180px]" />

      </div>

      <Card className="relative z-10 w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-2xl shadow-2xl">

        <CardContent className="flex flex-col items-center p-12 text-center">

          {/* Icon */}
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-sky-500/20 bg-gradient-to-br from-fuchsia-500/20 via-indigo-500/20 to-sky-500/20">

            <Ghost className="h-12 w-12 text-sky-400"/>
          </div>

          {/* 404 */}
          <h1 className="bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-sky-400 bg-clip-text text-8xl font-extrabold text-transparent">
            404
          </h1>

          <h2 className="mt-4 text-3xl font-bold text-white">
            Page Not Found
          </h2>

          <p className="mt-4 max-w-md text-zinc-400 leading-7">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            Please check the URL or return to your dashboard.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link href="/app/dashboard">
              <Button className="h-11 rounded-xl bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-400 px-6 text-white hover:brightness-110">

                <Home className="mr-2 h-4 w-4" />

                Dashboard

              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => history.back()}
              className="h-11 rounded-xl border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />

              Go Back

            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  )
}

export default NotFound