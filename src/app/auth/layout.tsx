import Image from 'next/image'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] xl:grid-cols-[30%_70%] h-screen w-screen">
      <main className="p-12 flex justify-center">{children}</main>
      <aside className="relative hidden lg:block">
        <Image src="/images/auth-background.jpg" alt="" fill role="presentation" />
      </aside>
    </div>
  )
}
