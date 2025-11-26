"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Save, X } from "lucide-react";

interface Patient {
  id: string;
  name: string;
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
  diseases: string;
  medicalDevices: string;
  status: "ativo" | "inativo";
  lastVisit: string;
}

interface EditPatientProps {
  patient: Patient;
  onSave: (data: Patient) => void;
  onCancel: () => void;
}

export function EditPatient({ patient, onSave, onCancel }: EditPatientProps) {
  const [formData, setFormData] = useState<Patient>(patient);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simular delay de salvamento
    await new Promise((resolve) => setTimeout(resolve, 800));

    onSave(formData);
    setIsSaving(false);
  };

  const states = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <div className="bg-linear-gradient-to-r from-blue-600 to-blue-700 p-6">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onCancel}
            className="p-1 hover:bg-blue-500 rounded transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
          <h3 className="text-white text-2xl font-bold">Editar Ficha</h3>
        </div>
        <p className="text-blue-100 text-sm ml-10">
          Atualize as informações do paciente
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Informações Pessoais */}
        <section>
          <h4 className="font-semibold text-gray-900 mb-4 text-lg">
            Informações Pessoais
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border-blue-200 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Informações de Contato */}
        <section className="border-t pt-6">
          <h4 className="font-semibold text-gray-900 mb-4 text-lg">
            Informações de Contato
          </h4>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-blue-200 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <Input
                type="text"
                name="phone"
                placeholder="(11) 98765-4321"
                value={formData.phone}
                onChange={handleInputChange}
                disabled
                className="bg-gray-100 cursor-not-allowed border-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endereço
              </label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="border-blue-200 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border-blue-200 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione o estado</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="border-t pt-6">
          <h4 className="font-semibold text-gray-900 mb-4 text-lg">Status</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Situação do Paciente
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-blue-200 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </section>

        {/* Botões de Ação */}
        <div className="border-t pt-6 flex gap-3">
          <Button
            type="submit"
            disabled={isSaving}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900"
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
}
