"use client";

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
import { useEffect } from "react";

// 1. Schema Atualizado com Validação Condicional (.superRefine)
const formSchema = z
  .object({
    employeeName: z.string().min(2, "Nome inválido"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha inválida"),
    phone: z.string().min(10, "Telefone inválido"),
    // Forçamos que seja um destes valores
    position: z.enum(["admin", "medico", "socorrista"]),

    // Estes campos começam opcionais no objeto base
    crm: z.string().optional(),
    specialty: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Lógica: Se a posição for 'medico', CRM e Especialidade tornam-se obrigatórios
    if (data.position === "medico") {
      if (!data.crm || data.crm.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CRM é obrigatório para médicos",
          path: ["crm"],
        });
      }
      if (!data.specialty || data.specialty.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Especialidade é obrigatória para médicos",
          path: ["specialty"],
        });
      }
    }
  });

type RegistrationEmployeeData = z.infer<typeof formSchema>;

export default function AdminDashboard() {
  const {
    register,
    handleSubmit,
    reset,
    watch, // 2. Importamos o watch para monitorizar o select
    setValue, // Importamos o setValue para limpar campos
    formState: { errors },
  } = useForm<RegistrationEmployeeData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: "",
      crm: "",
      email: "",
      specialty: "",
      phone: "",
      position: "socorrista", // Valor padrão seguro
      password: "defaultPassword123",
    },
  });

  // 3. Vigiar o campo de cargo em tempo real
  const selectedPosition = watch("position");

  // 4. Efeito para limpar os campos de médico se o utilizador trocar de cargo
  useEffect(() => {
    if (selectedPosition !== "medico") {
      setValue("crm", "");
      setValue("specialty", "");
    }
  }, [selectedPosition, setValue]);

  const handleFormSubmit = async (data: RegistrationEmployeeData) => {
    try {
      // Envia os dados para a API
      await api.post("api/employees/register", { data });
      reset();
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
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Em plantão</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Socorristas</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
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
            <div className="text-2xl font-bold">1,234</div>
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
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="employeeName">Nome Completo</Label>
                <Input
                  id="employeeName"
                  placeholder="EX: Dr. João Silva"
                  {...register("employeeName")}
                />
                {errors.employeeName && (
                  <span className="text-red-500 text-xs">
                    {errors.employeeName.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Profissional</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@idlife.com"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  {...register("phone")}
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Função (Select) */}
              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <select
                  id="position"
                  {...register("position")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="socorrista">Socorrista</option>
                  <option value="medico">Médico</option>
                  <option value="admin">Administrador</option>
                </select>
                {errors.position && (
                  <span className="text-red-500 text-xs">
                    {errors.position.message}
                  </span>
                )}
              </div>

              {/* 5. Campos Condicionais (Só aparecem se for médico) */}
              {selectedPosition === "medico" && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="register">CRM (Registro)</Label>
                    <Input
                      id="register"
                      placeholder="123456-SP"
                      {...register("crm")}
                    />
                    {errors.crm && (
                      <span className="text-red-500 text-xs">
                        {errors.crm.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Input
                      id="specialty"
                      placeholder="Cardiologia"
                      {...register("specialty")}
                    />
                    {errors.specialty && (
                      <span className="text-red-500 text-xs">
                        {errors.specialty.message}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full">
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
          <CardContent>
            <div className="text-sm text-muted-foreground text-center py-8">
              Nenhum cadastro recente para exibir.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
