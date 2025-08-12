import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0D0C12] p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="XMX Corp Logo" width={200} height={60} />
        </div>
        <Card className="bg-[#1A1920] border-[#2A2833] text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
            <CardDescription className="text-gray-400">Faça login para acessar seu dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="bg-[#0D0C12] border-[#2A2833] text-white focus:ring-[#8B5CF6]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="********"
                  className="bg-[#0D0C12] border-[#2A2833] text-white focus:ring-[#8B5CF6]"
                />
              </div>
              <Link href="/" className="w-full">
                <Button className="w-full bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white">Entrar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
