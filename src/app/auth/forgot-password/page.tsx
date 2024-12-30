import { ForgotPasswordForm } from '@/components/auth'

export default function ForgotPassword() {
  return (
    <section className="flex flex-col max-w-screen-sm">
      <h1 className="text-2xl font-semibold tracking-wide">Recupere sua senha</h1>

      <div className="mt-4">
        <ForgotPasswordForm />
      </div>
    </section>
  )
}
