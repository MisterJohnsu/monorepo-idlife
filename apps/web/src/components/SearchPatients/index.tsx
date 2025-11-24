"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { Calendar, MapPin, Phone, Search, User } from "lucide-react";
import { useState } from "react";

interface Patient {
  patientId: string;
  patientName: string;
  cpf: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  gender: string;
  bloodType: string;
  emergencyPhone: string;
  emergencyName: string;
  additionalInfo: string;
  allergies: string;
  insurance: string;
  medications: string;
  status: "ativo" | "inativo";
  lastVisit: string;
}

export function SearchPatients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await api.get(`api/patients/search/${searchTerm}`);
      setSearchResults(data);

      const results = data.filter(
        (patient: any) =>
          patient.patientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          patient.cpf.includes(searchTerm.replace(/\D/g, ""))
      );

      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      setSearchResults(results);
      setHasSearched(true);
      setSelectedPatient(null);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  const handleSelectPatient = (patient: Patient) => {
    console.log("Paciente selecionado:", patient);
    setSelectedPatient(patient);
  };

  return (
    <div className="space-y-6">
      {/* Formulário de Busca */}
      <Card className="p-6 shadow-lg border-0 bg-white">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-blue-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Digite o nome ou CPF do paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base border-blue-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 font-semibold"
            >
              Buscar
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Busque pelo nome completo ou pelo CPF (com ou sem máscara)
          </p>
        </form>
      </Card>

      {/* Resultados da Busca */}
      {hasSearched && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Pacientes */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="bg-linear-gradient-to-r from-blue-600 to-blue-700 p-4">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Resultados ({searchResults.length})
                </h2>
              </div>

              {searchResults.length > 0 ? (
                <div className="divide-y max-h-96 overflow-y-auto">
                  {searchResults.map((patient) => (
                    <button
                      key={patient.patientId}
                      onClick={() => handleSelectPatient(patient)}
                      className={`w-full text-left p-4 hover:bg-blue-50 transition-colors ${
                        selectedPatient?.patientId === patient.patientId
                          ? "bg-blue-100 border-l-4 border-blue-600"
                          : ""
                      }`}
                    >
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        {patient.patientName}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        CPF: {patient.cpf}
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge
                          variant={
                            patient.status === "ativo" ? "default" : "secondary"
                          }
                          className={
                            patient.status === "ativo"
                              ? "bg-green-600"
                              : "bg-gray-400"
                          }
                        >
                          {patient.status === "ativo" ? "Ativo" : "Inativo"}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Vis: {patient.lastVisit.split("/")[0]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhum paciente encontrado</p>
                </div>
              )}
            </Card>
          </div>

          {/* Ficha do Paciente */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <Card className="shadow-lg border-0 overflow-hidden">
                <div className="bg-linear-gradient-to-r from-blue-600 to-blue-700 p-6">
                  <h3 className="text-white text-2xl font-bold">
                    {selectedPatient.patientName}
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">
                    CPF: {selectedPatient.cpf}
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Informações Pessoais */}
                  <section>
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                      Informações Pessoais
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InfoField
                        icon={Calendar}
                        label="Data de Nascimento"
                        value={selectedPatient.birthDate}
                      />
                      <InfoField
                        icon={Phone}
                        label="Telefone"
                        value={selectedPatient.phone}
                      />
                      <div className="sm:col-span-2">
                        <InfoField
                          icon={MapPin}
                          label="Endereço"
                          value={`${selectedPatient.address}, ${selectedPatient.city}`}
                        />
                      </div>
                    </div>
                  </section>

                  {/* Informações de Contato */}
                  <section className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                      Informações de Contato
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Email</p>
                        <p className="text-gray-900 font-medium">
                          {selectedPatient.email}
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Status */}
                  <section className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                      Status e Histórico
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">Status</p>
                        <Badge
                          className={
                            selectedPatient.status === "ativo"
                              ? "bg-green-600 text-white"
                              : "bg-gray-400 text-white"
                          }
                        >
                          {selectedPatient.status === "ativo"
                            ? "Ativo"
                            : "Inativo"}
                        </Badge>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">
                          Última Visita
                        </p>
                        <p className="text-gray-900 font-medium">
                          {selectedPatient.lastVisit}
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Ações */}
                  <div className="border-t pt-6 flex gap-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      Editar Ficha
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                    >
                      Agendar Consulta
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="shadow-lg border-0 flex items-center justify-center h-96">
                <div className="text-center">
                  <User className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 font-medium">
                    Selecione um paciente para visualizar a ficha completa
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
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
    <div className="bg-gray-50 p-3 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-blue-600" />
        <p className="text-xs text-gray-600">{label}</p>
      </div>
      <p className="text-gray-900 font-medium text-sm">{value}</p>
    </div>
  );
}
