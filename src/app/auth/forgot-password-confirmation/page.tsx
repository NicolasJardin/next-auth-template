import { ForgotPasswordConfirmationForm } from '@/components/auth'

export default function ForgotPassword() {
  return (
    <section className="flex flex-col max-w-screen-sm">
      <h1 className="text-2xl font-semibold tracking-wide">Confirme o código</h1>
      <p className="mt-2  text-md">Nós enviamos um código de confirmação para o seu email</p>

      <div className="mt-4">
        <ForgotPasswordConfirmationForm />
      </div>
    </section>
  )
}
