"use client"

import type React from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, Check } from "lucide-react"
import { useState } from "react"

interface RegistrationData {
  name: string
  cpf: string
  birthDate: string
  phone: string
  email: string
  address: string
  city: string
  state: string
}

export function RegisterPatient() {
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    cpf: "",
    birthDate: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "SP",
  })

  const [submitted, setSubmitted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    // Validação básica
    const isValid = Object.values(formData).every((field) => field.trim() !== "")

    if (isValid) {
      console.log("Novo paciente registrado:", formData)
      setShowSuccess(true)

      // Limpar formulário após 2 segundos
      setTimeout(() => {
        setFormData({
          name: "",
          cpf: "",
          birthDate: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          state: "SP",
        })
        setSubmitted(false)
        setShowSuccess(false)
      }, 2000)
    }
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  return (
    <div className="space-y-6">
      {/* Mensagem de Sucesso */}
      {showSuccess && (
        <Alert className="bg-green-50 border-green-200 border-2">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 font-medium">Paciente cadastrado com sucesso!</AlertDescription>
        </Alert>
      )}

      {/* Formulário de Cadastro */}
      <Card className="p-8 shadow-lg border-0 bg-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Cadastro de Novo Paciente</h2>
          <p className="text-blue-600">Preencha os dados pessoais do paciente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Pessoais */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-gray-900 mb-4">Informações Pessoais</legend>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Digite o nome completo"
                className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {submitted && !formData.name && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Campo obrigatório
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CPF *</label>
                <Input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      cpf: formatCPF(e.target.value),
                    }))
                  }
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {submitted && !formData.cpf && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Campo obrigatório
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento *</label>
                <Input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {submitted && !formData.birthDate && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Campo obrigatório
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Contato */}
          <fieldset className="space-y-4 border-t pt-6">
            <legend className="text-lg font-semibold text-gray-900 mb-4">Informações de Contato</legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: formatPhone(e.target.value),
                    }))
                  }
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {submitted && !formData.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Campo obrigatório
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="exemplo@email.com"
                  className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {submitted && !formData.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Campo obrigatório
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Endereço */}
          <fieldset className="space-y-4 border-t pt-6">
            <legend className="text-lg font-semibold text-gray-900 mb-4">Endereço</legend>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rua/Avenida *</label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Digite o endereço"
                className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {submitted && !formData.address && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Campo obrigatório
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Digite a cidade"
                  className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {submitted && !formData.city && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Campo obrigatório
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="SP">São Paulo (SP)</option>
                  <option value="RJ">Rio de Janeiro (RJ)</option>
                  <option value="MG">Minas Gerais (MG)</option>
                  <option value="BA">Bahia (BA)</option>
                  <option value="RS">Rio Grande do Sul (RS)</option>
                  <option value="PR">Paraná (PR)</option>
                  <option value="PE">Pernambuco (PE)</option>
                  <option value="CE">Ceará (CE)</option>
                  <option value="PA">Pará (PA)</option>
                  <option value="SC">Santa Catarina (SC)</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Botões */}
          <div className="flex gap-3 pt-6 border-t">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold h-11">
              Cadastrar Paciente
            </Button>
            <Button
              type="reset"
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 h-11 bg-transparent"
              onClick={() =>
                setFormData({
                  name: "",
                  cpf: "",
                  birthDate: "",
                  phone: "",
                  email: "",
                  address: "",
                  city: "",
                  state: "SP",
                })
              }
            >
              Limpar
            </Button>
          </div>
        </form>
      </Card>

      {/* Informações de Ajuda */}
      <Alert className="bg-blue-50 border-blue-200 border">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 text-sm">
          Os campos marcados com * são obrigatórios. Verifique se todos os dados estão corretos antes de confirmar o
          cadastro.
        </AlertDescription>
      </Alert>
    </div>
  )
}
