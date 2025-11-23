"use client"
import { BiometricLinkSection } from "@/components/BiometricLinkSection"
import { RegisterPatient } from "@/components/RegisterPatient"
import { SearchPatients } from "@/components/SearchPatients"
import { Button } from "@/components/ui/button"
import { Fingerprint, Plus, Search } from "lucide-react"
import { useState } from "react"

export default function DoctorDashboard() {
  const [view, setView] = useState<"search" | "register" | "biometry">("search")

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Portal do Médico</h1>
          <p className="text-blue-600 mb-6">Gerenciamento de fichas de pacientes</p>

          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={() => setView("search")}
              className={`cursor-pointer flex items-center gap-2 ${
                view === "search"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-white hover:bg-gray-100 text-blue-600 border border-blue-200"
              }`}
            >
              <Search className="h-4 w-4" />
              Buscar Paciente
            </Button>
            <Button
              onClick={() => setView("register")}
              className={`cursor-pointer flex items-center gap-2 ${
                view === "register"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-white hover:bg-gray-100 text-blue-600 border border-blue-200"
              }`}
            >
              <Plus className="h-4 w-4" />
              Cadastrar Paciente
            </Button>
            {view === "biometry" && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md">
                <Fingerprint className="h-4 w-4" />
                <span className="text-sm font-medium">Registrando Biometria...</span>
              </div>
            )}
          </div>
        </div>
        {view === "search" ? <SearchPatients /> : view === 'biometry' ? <BiometricLinkSection patientName="Luan Sellera" /> : <RegisterPatient onSuccess={() => { setView('biometry')}} />}
      </div>
    </main>
  )
}
