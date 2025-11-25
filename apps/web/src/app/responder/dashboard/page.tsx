"use client";

import { Button } from "@/components/ui/button";
import { api, bridgeApi } from "@/lib/axios";
import {
  AlertCircle,
  Fingerprint,
  Loader2,
  Search,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ResponderPage() {
  const router = useRouter();
  const socket = io("http://localhost:3333");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [messageArduino, setMessageArduino] = useState("");
  const [patientData, setPatientData] = useState<any>(null);

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
      if (data.message.includes("Identificado: ID")) {
        const replaceData = data.message.replace("Identificado: ID", "").trim();
        const biometricId = parseInt(replaceData, 10);
        scanningApi(String(biometricId));
      }
    };
    socket.on("listenArduino", handleListenArduino);
    return () => {
      socket.off("listenArduino", handleListenArduino);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="bg-red-600 p-4 shadow-lg">
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

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Identificação do Paciente</h2>
            <p className="text-slate-400">
              Utilize o leitor biométrico para acessar o prontuário de
              emergência.
            </p>
          </div>

          <div
            className="relative group cursor-pointer"
            onClick={!isScanning ? handleScan : undefined}
          >
            {/* Scanner Visualization */}
            <div
              className={`w-64 h-64 mx-auto rounded-3xl border-4 flex items-center justify-center transition-all duration-500 ${
                scanStatus === "scanning"
                  ? "border-blue-500 bg-blue-950/30 shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                  : scanStatus === "success"
                    ? "border-green-500 bg-green-950/30 shadow-[0_0_50px_rgba(34,197,94,0.5)]"
                    : "border-slate-700 bg-slate-900 hover:border-slate-500 hover:bg-slate-800"
              }`}
            >
              {scanStatus === "idle" && (
                <Fingerprint
                  className="w-32 h-32 text-slate-600 group-hover:text-slate-400 transition-colors"
                  strokeWidth={1}
                />
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

              {scanStatus === "success" && (
                <Fingerprint
                  className="w-32 h-32 text-green-500"
                  strokeWidth={1}
                />
              )}
            </div>

            {/* Status Text */}
            <div className="mt-8 h-12">
              {scanStatus === "idle" && (
                <Button
                  size="lg"
                  className="w-full text-lg font-bold h-14 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                >
                  INICIAR LEITURA BIOMÉTRICA
                </Button>
              )}
              {scanStatus === "scanning" && (
                <div className="flex items-center justify-center gap-3 text-blue-400 animate-pulse">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-xl font-medium">
                    {messageArduino ? messageArduino : "Lendo Digital..."}
                  </span>
                </div>
              )}
              {scanStatus === "success" && (
                <div className="text-green-400 text-xl font-bold tracking-wide">
                  IDENTIDADE CONFIRMADA
                </div>
              )}
            </div>
          </div>

          {/* Fallback Search */}
          <div className="pt-12 border-t border-slate-800">
            <p className="text-sm text-slate-500 mb-4">
              Problemas com a leitura biométrica?
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar por CPF"
                  className="w-full h-10 bg-slate-900 border border-slate-700 rounded-md pl-9 pr-3 text-sm text-slate-300 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 placeholder:text-slate-600"
                />
              </div>
              <Button
                variant="secondary"
                className="bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Buscar
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-amber-500/70">
              <AlertCircle className="w-3 h-3" />
              <span>
                Busca manual requer autenticação adicional do socorrista
              </span>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan {
          animation: scan 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
