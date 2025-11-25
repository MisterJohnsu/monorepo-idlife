"use client";

import { Button } from "@/components/ui/button";
import { api, bridgeApi } from "@/lib/axios";
import { CheckCircle, Fingerprint, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface BiometricLinkSectionProps {
  patient: any;
  onView?: (view: "search") => void;
}

export function BiometricLinkSection({
  patient,
  onView,
}: BiometricLinkSectionProps) {
  const [step, setStep] = useState<
    "waiting" | "scanning" | "success" | "error"
  >("waiting");
  const socket = io("http://localhost:3333");
  const [messageArduino, setMessageArduino] = useState("");

  const startScanning = async () => {
    try {
      setStep("scanning");
      const response = await bridgeApi.post("/cadastro");
      if (response.status === 200) {
        setStep("scanning");
      }
    } catch (error) {
      console.error("Erro ao iniciar a captura biométrica:", error);
      setStep("error");
    }
  };

  const handleFormSubmit = () => {
    onView?.("search");
  };

  const scanningApi = async (biometricId: string) => {
    try {
      const data = {
        biometricId,
        cpf: patient.cpf,
      };
      api.post("api/patients/biometric/register", { data });
      setStep("success");
    } catch (error) {
      console.error("Erro ao vincular biometria:", error);
    }
  };

  useEffect(() => {
    const handleListenArduino = (data: any) => {
      setMessageArduino(data.message);
      if (data.message.includes("Cadastro OK: ID")) {
        const replaceData = data.message.replace("Cadastro OK: ID", "").trim();
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
    <section className="sm:max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      <header className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Vínculo Biométrico {messageArduino}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Vinculando digital para o paciente:{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {patient.patientName}
          </span>
        </p>
      </header>

      <div className="flex flex-col items-center justify-center py-8 space-y-6">
        {step === "waiting" && (
          <>
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center animate-pulse">
              <Fingerprint className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="text-center text-muted-foreground">
              Solicite ao paciente que posicione o dedo indicador
              <br />
              no leitor biométrico.
            </p>
          </>
        )}

        {step === "scanning" && (
          <>
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center relative">
              <Fingerprint className="w-12 h-12 text-primary" />
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin" />
            </div>
            <p className="text-center font-medium text-primary">
              Capturando leitura biométrica...
            </p>
          </>
        )}

        {step === "success" && (
          <>
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center space-y-1">
              <p className="font-bold text-lg text-green-600 dark:text-green-400">
                Biometria Vinculada!
              </p>
              <p className="text-sm text-muted-foreground">
                A identificação digital foi configurada com sucesso.
              </p>
            </div>
          </>
        )}

        {step === "error" && (
          <>
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              {/* <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" /> */}
            </div>
            <div className="text-center space-y-1">
              <p className="font-bold text-lg text-red-600 dark:text-red-400">
                Erro ao vincular biometria!
              </p>
              <p className="text-sm text-muted-foreground">
                Não foi possível configurar a biometria.
              </p>
              <Button
                onClick={() => setStep("waiting")}
                size="lg"
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Fingerprint className="mr-2 h-5 w-5" />
                Tentar Novamente
              </Button>
            </div>
          </>
        )}
      </div>

      <footer className="sm:justify-center mt-4">
        {step === "waiting" && (
          <Button
            onClick={startScanning}
            size="lg"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Fingerprint className="mr-2 h-5 w-5" />
            Iniciar Captura
          </Button>
        )}
        {step === "scanning" && (
          <Button disabled variant="secondary" size="lg" className="w-full">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processando...
          </Button>
        )}
        {step === "success" && (
          <Button
            onClick={handleFormSubmit}
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white"
          >
            Concluir Cadastro
          </Button>
        )}
      </footer>
    </section>
  );
}
