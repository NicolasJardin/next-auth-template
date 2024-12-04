import { LoginForm } from '@/components/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen px-4">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Nome</CardTitle>
          <CardDescription className="mt-2">Descrição</CardDescription>
        </CardHeader>

        <CardContent className="mt-6">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
