"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Fingerprint,
  Phone,
  Shield,
  Edit2,
  Droplet,
  Activity,
  Pill,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

export default function PatientDashboard() {
  const [patient, setPatient] = useState<any>(null);

  const getPatient = async (emailPatient: string) => {
    try {
      const response = await api.post("api/patients/search", {
        data: {
          email: emailPatient,
          searchEmail: true,
        },
      });

      if (response.status === 200) {
        setPatient(response.data.patients[0]);
      }
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    if (email) {
      getPatient(email);
    }
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Minha Carteirinha Digital
        </h1>
        <p className="text-muted-foreground">
          Identificação oficial e dados médicos vitais.
        </p>
      </div>

      {/* Digital ID Card */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-linar-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative border-none shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Fingerprint className="w-64 h-64" />
          </div>

          <CardContent className="p-8 relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl tracking-wider">IDLIFE</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-green-300">
                  Biometria Ativa
                </span>
              </div>
            </div>

            <div className="space-y-6 flex-1">
              <div>
                <h2 className="text-2xl font-bold mb-1">{patient?.name}</h2>
                <p className="text-slate-400 text-sm uppercase tracking-wider">
                  Data de Nasc: {patient?.birthDate}
                </p>
                <p className="text-slate-400 text-sm uppercase tracking-wider">
                  CPF: {patient?.cpf}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">
                    Tipo Sanguíneo:
                  </p>
                  <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-red-400" />
                    <span className="text-lg text-slate-950 font-semibold">
                      {patient?.bloodType}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">
                    Plano de Saúde:
                  </p>
                  <p className="text-lg text-slate-950 font-semibold">
                    {patient?.insurance}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-red-300 mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Alergias</span>
                </div>
                <p className="text-sm text-slate-950 font-medium">
                  {patient?.allergies}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-300 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Condições</span>
                </div>
                <p className="text-sm font-medium">Hipertensão</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-orange-300 mb-1">
                  <Pill className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">
                    Uso Contínuo
                  </span>
                </div>
                <p className="text-sm font-medium">Losartana 50mg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact Card - The only editable part */}
        <Card className="md:col-span-1 flex flex-col">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Contato de Emergência</CardTitle>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/patient/settings">
                  <Edit2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </Link>
              </Button>
            </div>
            <CardDescription>
              Pessoa a ser contatada em caso de urgência.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div className="flex flex-col items-center text-center p-4 bg-secondary/30 rounded-lg border border-secondary">
              <Avatar className="w-16 h-16 mb-3">
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg">Maria Silva</h3>
              <p className="text-sm text-muted-foreground mb-1">Esposa</p>
              <Badge variant="outline" className="mt-2">
                Principal
              </Badge>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full gap-2 bg-transparent"
                variant="outline"
                asChild
              >
                <a href="tel:+5511987654321">
                  <Phone className="w-4 h-4" />
                  (11) 98765-4321
                </a>
              </Button>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md flex items-start gap-3 text-xs text-yellow-800 dark:text-yellow-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                Mantenha este contato sempre atualizado. É a primeira pessoa que
                os socorristas tentarão contatar.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
