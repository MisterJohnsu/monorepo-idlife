"use client";

import { Button } from "@/components/ui/button";
import { api, bridgeApi } from "@/lib/axios";
import {
  Activity,
  AlertCircle,
  Calendar,
  FileText,
  Fingerprint,
  Loader2,
  Phone,
  Search,
  ShieldAlert,
  Trash2,
  User,
  X,
} from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ResponderPage() {
  const router = useRouter();
  // Inicializando socket apenas uma vez
  const [socket] = useState(() => io("http://localhost:3333"));

  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [messageArduino, setMessageArduino] = useState("");
  const [patientData, setPatientData] = useState<any>(null);

  const handleNovaConsulta = () => {
    setScanStatus("idle");
    setPatientData(null);
    setMessageArduino("");
    setIsScanning(false);
  };

  // --- NOVA FUNÇÃO: CANCELAR ---
  const handleCancelScan = () => {
    try {
      bridgeApi.get("/cancelar");
      setScanStatus("idle");
      setIsScanning(false);
      setMessageArduino("");
    } catch (error) {
      console.error("Erro ao cancelar a captura biométrica:", error);
    }
  };

  const handleScan = async () => {
    try {
      setIsScanning(true);
      setScanStatus("scanning");
      await bridgeApi.get("/identificar");
    } catch (error) {
      console.error("Erro ao iniciar a captura biométrica:", error);
      setScanStatus("error");
    }
  };

  const scanningApi = async (biometricId: string) => {
    try {
      const response = await api.post("api/patients/search", {
        data: {
          biometricId,
          searchBiometric: true,
        },
      });
      if (response.status === 200) {
        setPatientData(response.data.patients);
        setScanStatus("success");
      }
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
      setScanStatus("error");
    }
  };

  useEffect(() => {
    const handleListenArduino = (data: any) => {
      setMessageArduino(data.message);
      if (data.message && data.message.includes("Identificado: ID")) {
        const replaceData = data.message.replace("Identificado: ID", "").trim();
        const biometricId = parseInt(replaceData, 10);
        scanningApi(String(biometricId));
      }
    };
    socket.on("listenArduino", handleListenArduino);
    return () => {
      socket.off("listenArduino", handleListenArduino);
    };
  }, [socket]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-red-600 p-4 shadow-lg z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-8 w-8 text-white" />
            <div>
              <h1 className="font-bold text-xl leading-none">IDLife</h1>
              <p className="text-xs text-red-100 font-medium uppercase tracking-wider">
                Acesso de Emergência
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-transparent border-red-400 text-red-100 hover:bg-red-700 hover:text-white"
            asChild
          >
            <Link href="/">Sair</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-6 container mx-auto">
        {/* LÓGICA DE EXIBIÇÃO: SE NÃO TIVER DADOS, MOSTRA SCANNER */}
        {!patientData ? (
          <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-500">
            <div className="w-full max-w-md space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">
                  Identificação do Paciente
                </h2>
                <p className="text-slate-400">
                  Utilize o leitor biométrico para acessar o prontuário de
                  emergência.
                </p>
              </div>

              {/* Área do Scanner Interativo */}
              <div
                className="relative group cursor-pointer"
                onClick={scanStatus !== "scanning" ? handleScan : undefined}
              >
                <div
                  className={`w-64 h-64 mx-auto rounded-3xl border-4 flex items-center justify-center transition-all duration-500 ${
                    scanStatus === "scanning"
                      ? "border-blue-500 bg-blue-950/30 shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                      : scanStatus === "error"
                        ? "border-red-500 bg-red-950/30"
                        : "border-slate-700 bg-slate-900 hover:border-slate-500 hover:bg-slate-800"
                  }`}
                >
                  {scanStatus === "idle" && (
                    <Fingerprint
                      className="w-32 h-32 text-slate-600 group-hover:text-slate-400 transition-colors"
                      strokeWidth={1}
                    />
                  )}
                  {scanStatus === "error" && (
                    <div className="flex flex-col items-center text-red-500">
                      <AlertCircle className="w-24 h-24 mb-2" />
                      <span className="font-bold">Erro na Leitura</span>
                    </div>
                  )}
                  {scanStatus === "scanning" && (
                    <div className="relative">
                      <Fingerprint
                        className="w-32 h-32 text-blue-500 opacity-50"
                        strokeWidth={1}
                      />
                      <div className="absolute top-0 left-0 w-full h-2 bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.8)] animate-scan" />
                    </div>
                  )}
                </div>

                {/* Container de Botões (Ajustado para min-h) */}
                <div className="mt-8 min-h-[3rem] flex flex-col items-center justify-center gap-4">
                  {scanStatus === "idle" || scanStatus === "error" ? (
                    <Button
                      size="lg"
                      className={`w-full text-lg font-bold h-14 text-white shadow-lg ${
                        scanStatus === "error"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-blue-600 hover:bg-blue-500 shadow-blue-900/20"
                      }`}
                    >
                      {scanStatus === "error"
                        ? "TENTAR NOVAMENTE"
                        : "INICIAR LEITURA BIOMÉTRICA"}
                    </Button>
                  ) : (
                    <>
                      {/* Estado de Carregamento */}
                      <div className="flex items-center justify-center gap-3 text-blue-400 animate-pulse">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="text-xl font-medium">
                          {messageArduino ? messageArduino : "Lendo Digital..."}
                        </span>
                      </div>

                      {/* Botão Cancelar */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation(); // Evita reativar o scanner ao clicar
                          handleCancelScan();
                        }}
                        className="text-slate-500 hover:text-red-400 hover:bg-red-950/20 transition-colors gap-2"
                      >
                        <X className="w-4 h-4" /> Cancelar
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Busca Manual Fallback */}
              <div className="pt-12 border-t border-slate-800">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Buscar por CPF"
                      className="w-full h-10 bg-slate-900 border border-slate-700 rounded-md pl-9 pr-3 text-sm text-slate-300 focus:outline-none focus:border-slate-500"
                    />
                  </div>
                  <Button
                    variant="secondary"
                    className="bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Buscar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TELA 2: DADOS DO PACIENTE */
          <div className="w-full max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-500 space-y-6">
            <div className="flex items-center justify-between mb-6 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
              <div className="flex items-center gap-2 px-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
                  Identificado via Biometria
                </span>
              </div>

              <Button
                onClick={handleNovaConsulta}
                variant="destructive"
                className="gap-2 bg-slate-800 hover:bg-red-900/50 text-slate-200 hover:text-red-200 border border-slate-700 hover:border-red-800 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Limpar Dados / Nova Consulta
              </Button>
            </div>

            {/* Cartão Principal */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row gap-6 items-start shadow-xl">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700 shrink-0">
                <User className="w-12 h-12 text-slate-400" />
              </div>
              <div className="flex-1 space-y-2">
                <h2 className="text-3xl font-bold text-white">
                  {patientData.patientName}
                </h2>
                <div className="flex flex-wrap gap-4 text-slate-400">
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>CPF: {patientData.cpf || "---"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <InfoField
                      icon={Calendar}
                      label="Data de Nascimento"
                      value={DateTime.fromISO(
                        patientData.birthDate
                      ).toLocaleString(DateTime.DATE_MED)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-red-950/40 p-4 rounded-xl border border-red-900/50 min-w-[150px] text-center">
                <div className="text-sm text-red-200 mb-1">Tipo Sanguíneo</div>
                <div className="text-3xl font-black text-red-500">
                  {patientData?.bloodType || "--"}
                </div>
              </div>
            </div>

            {/* Grid de Informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Alergias */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-5 h-5 text-amber-500" /> Alergias
                </h3>
                {patientData?.allergies && patientData.allergies.length > 0 ? (
                  <ul className="space-y-2">
                    {patientData.allergies.map((allergy: any, i: number) => (
                      <li
                        key={i}
                        className="bg-amber-950/20 text-amber-200 px-3 py-2 rounded-md border border-amber-900/30 text-sm font-medium"
                      >
                        {allergy}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 italic">
                    Nenhuma alergia registrada.
                  </p>
                )}
              </div>

              {/* Condições Crônicas */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-blue-500" /> Condições
                  Crônicas
                </h3>
                {patientData?.chronicConditions &&
                patientData.chronicConditions.length > 0 ? (
                  <ul className="space-y-2">
                    {patientData.chronicConditions.map(
                      (condition: any, i: number) => (
                        <li
                          key={i}
                          className="text-slate-300 text-sm border-b border-slate-800 pb-2 last:border-0"
                        >
                          {condition}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="text-slate-500 italic">
                    Nenhuma condição registrada.
                  </p>
                )}
              </div>

              {/* Contato de Emergência */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 md:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2 mb-4">
                  <Phone className="w-5 h-5 text-green-500" /> Contato de
                  Emergência
                </h3>
                {patientData?.emergencyContact ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold text-white">
                        {patientData.emergencyContact.name}
                      </p>
                      <p className="text-slate-400 text-sm">
                        {patientData.emergencyContact.relation}
                      </p>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700 gap-2">
                      <Phone className="w-4 h-4" />
                      Ligar: {patientData.emergencyContact.phone}
                    </Button>
                  </div>
                ) : (
                  <p className="text-slate-500">Nenhum contato cadastrado.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes scan {
          0%,
          100% {
            top: 0%;
            opacity: 0;
          }
          10%,
          90% {
            opacity: 1;
          }
          50% {
            top: 100%;
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
interface InfoFieldProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

function InfoField({ icon: Icon, label, value }: InfoFieldProps) {
  return (
    <div className=" p-3 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-blue-600" />
        <p className="text-xs text-gray-600">{label}</p>
      </div>
      <p className="text-slate-400 font-medium text-sm">{value}</p>
    </div>
  );
}
