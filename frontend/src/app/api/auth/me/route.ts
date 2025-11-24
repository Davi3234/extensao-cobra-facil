import { getCurrentUsuario } from "@/lib/actions/auth"

export async function GET() {
  const response = await getCurrentUsuario()
  return Response.json(response)
}
