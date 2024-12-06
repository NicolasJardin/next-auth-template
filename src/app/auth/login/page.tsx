import { LoginForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GrGoogle } from 'react-icons/gr'

export default function Login() {
  return (
    <section className="flex flex-col max-w-screen-sm">
      <h1 className="text-2xl font-semibold tracking-wide">Entre em sua conta</h1>

      <article>
        <Button variant="outline" type="button" className="mt-8">
          <GrGoogle className="mr-2 h-4 w-4" />
          Entrar com o Google
        </Button>
      </article>

      <div
        className="flex gap-2 items-center justify-center mt-4"
        aria-label="Separador entre métodos de login"
      >
        <Separator className="w-[45%]" />
        <p className="font-medium text-gray-500 text-sm">OU</p>
        <Separator className="w-[45%]" />
      </div>

      <article className="mt-4">
        <LoginForm />
      </article>
    </section>
  )
}
