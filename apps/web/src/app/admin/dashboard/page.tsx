import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Users, ShieldCheck, Activity } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";

const formSchema = z.object({
  name: z.string().min(2, "Nome inválido"),
  crm: z.string().min(2, "CRM inválido"),
  email: z.string().email("Email inválido"),
  specialty: z.string(),
  phone: z.string().min(10, "Telefone inválido"),
  position: z.string(),
  password: z.string().min(6, "Senha inválida"),
});

type RegistrationEmployeeData = z.infer<typeof formSchema>;

export function AdminDashboard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationEmployeeData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      crm: "",
      email: "",
      specialty: "",
      phone: "",
      position: "",
      password: "defaultPassword123",
    },
  });

  const handleFormSubmit = async (data: RegistrationEmployeeData) => {
    try {
      await api.post("api/employees/register", { data });
      return;
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 p-6">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground">
            Gerenciamento de profissionais e acessos
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/">Sair</Link>
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Médicos Ativos
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">fiction</div>
            <p className="text-xs text-muted-foreground">ficition data</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Socorristas</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ficition data</div>
            <p className="text-xs text-muted-foreground">
              Equipes de emergência
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Usuários
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ficition data</div>
            <p className="text-xs text-muted-foreground">
              Pacientes cadastrados
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Cadastrar Novo Profissional</CardTitle>
            <CardDescription>
              Adicione médicos ou socorristas ao sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="EX: Dr. João Silva"
                  {...register("name")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Profissional</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  {...register("email")}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Função</Label>
                  <select id="position" {...register("position")}>
                    <option value="admin">Administrador</option>
                    <option value="medico">Médico</option>
                    <option value="socorrista">Socorrista</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register">Registro (CRM/COREN)</Label>
                  <Input
                    id="register"
                    placeholder="123456-SP"
                    {...register("crm")}
                  />
                </div>
              </div>
              <Button className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Cadastrar Profissional
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Profissionais Recentes</CardTitle>
            <CardDescription>Últimos cadastros realizados</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
