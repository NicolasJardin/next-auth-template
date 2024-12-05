import { LoginForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GrGoogle } from 'react-icons/gr'

export default function Login() {
  return (
    <div className="flex flex-col max-w-screen-sm">
      <h1 className="text-2xl font-semibold tracking-wide">Crie sua conta</h1>

      <Button variant="outline" type="button" className="mt-8">
        <GrGoogle className="mr-2 h-4 w-4" />
        Entrar com o Google
      </Button>

      <div className="flex gap-2 items-center justify-center mt-4">
        <Separator className="w-[45%]" />
        <p className="font-medium text-gray-500 text-sm">OU</p>
        <Separator className="w-[45%]" />
      </div>

      <div className="mt-4">
        <LoginForm />
      </div>
    </div>
  )
}
