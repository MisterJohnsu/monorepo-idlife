"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  patientName: z.string().min(2, "Nome inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data de nascimento inválida",
  }),
  phone: z.string().min(10, "Telefone inválido"),
  address: z.string().min(5, "Endereço inválido"),
  city: z.string().min(2, "Cidade inválida"),
  email: z.string().email("Email inválido"),
  state: z.enum(["SP", "RJ", "MG", "BA", "RS", "PR", "PE", "CE", "PA", "SC"]),
  gender: z.enum(["M", "F"]),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  emergencyPhone: z.string().min(10),
  emergencyName: z.string().min(2),
  medicalDevices: z.string(),
  insurance: z.string(),
  allergies: z.string(),
  additionalInfo: z.string(),
  medications: z.string(),
});

type RegistrationPatientData = z.infer<typeof formSchema>;

interface RegisterPatientProps {
  onSuccess: (registredPatient: boolean) => void;
  patientName: (name: string) => void;
}

export function RegisterPatient({
  onSuccess,
  patientName,
}: RegisterPatientProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationPatientData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      cpf: "",
      birthDate: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "SP",
      gender: "M",
      bloodType: "A+",
      emergencyPhone: "",
      emergencyName: "",
      medicalDevices: "",
      insurance: "",
      allergies: "",
      additionalInfo: "",
      medications: "",
    },
  });
  const handleFormSubmit = async (data: RegistrationPatientData) => {
    try {
      await api.post("api/patients/register", data);
      onSuccess(true);
      patientName(data.patientName);
      return;
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      onSuccess(false);
      return;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 shadow-lg border-0 bg-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            Cadastro de Novo Paciente
          </h2>
          <p className="text-blue-600">
            Preencha os dados pessoais do paciente
          </p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-gray-900 mb-4">
              Informações Pessoais
            </legend>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <Input
                type="text"
                id="patientName"
                placeholder="Digite o nome completo"
                className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                {...register("patientName")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF *
                </label>
                <Input
                  type="text"
                  id="cpf"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  {...register("cpf")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento *
                </label>
                <Input
                  type="date"
                  id="birthDate"
                  className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  {...register("birthDate")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gênero *
                </label>
                <select
                  id="state"
                  {...register("gender")}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4 border-t pt-6">
            <legend className="text-lg font-semibold text-gray-900 mb-4">
              Informações de Contato
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  {...register("phone")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="exemplo@email.com"
                  className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  {...register("email")}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4 border-t pt-6">
            <legend className="text-lg font-semibold text-gray-900 mb-4">
              Endereço
            </legend>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logradouro *
              </label>
              <Input
                type="text"
                id="address"
                placeholder="Digite o endereço"
                className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                {...register("address")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade *
                </label>
                <Input
                  type="text"
                  id="city"
                  placeholder="Digite a cidade"
                  className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  {...register("city")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  id="state"
                  {...register("state")}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MG">MG</option>
                  <option value="MS">MS</option>
                  <option value="MT">MT</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PE">PE</option>
                  <option value="PR">PR</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SE">SE</option>
                  <option value="SP">SP</option>
                  <option value="TO">TO</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo Sanguíneo *
                </label>
                <select
                  id="bloodType"
                  {...register("bloodType")}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Contato de Emergência *
                </label>
                <Input
                  type="text"
                  id="emergencyName"
                  placeholder="Nome do contato"
                  className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  {...register("emergencyName")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone do Contato de Emergência *
                </label>
                <Input
                  type="tel"
                  id="emergencyPhone"
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  {...register("emergencyPhone")}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aparelhos Médicos Utilizados
              </label>
              <Input
                type="text"
                id="medicalDevices"
                placeholder="Ex: Marcapasso, prótese, etc."
                className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                {...register("medicalDevices")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plano de Saúde
              </label>
              <Input
                type="text"
                id="insurance"
                placeholder="Ex: Unimed, Bradesco, etc."
                className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                {...register("insurance")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alergias
              </label>
              <Input
                type="text"
                id="allergies"
                placeholder="Ex: Penicilina, látex, etc."
                className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                {...register("allergies")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medicamentos em Uso
              </label>
              <Input
                type="text"
                id="medications"
                placeholder="Ex: Aspirina, insulina, etc."
                className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                {...register("medications")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Informações Adicionais
              </label>
              <Input
                type="text"
                id="additionalInfo"
                placeholder="Outras informações relevantes. Ex: histórico médico, preferências, etc."
                className="h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                {...register("additionalInfo")}
              />
            </div>
          </fieldset>

          <div className="flex gap-3 pt-6 border-t">
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold h-11 cursor-pointer"
            >
              Cadastrar Paciente
            </Button>
            <Button
              type="reset"
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 h-11 bg-transparent cursor-pointer"
              onClick={() => reset()}
            >
              Limpar
            </Button>
          </div>
        </form>
      </Card>

      <Alert className="bg-blue-50 border-blue-200 border">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 text-sm">
          Os campos marcados com * são obrigatórios. Verifique se todos os dados
          estão corretos antes de confirmar o cadastro.
        </AlertDescription>
      </Alert>
    </div>
  );
}
