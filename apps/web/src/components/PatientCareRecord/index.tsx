import { AlertCircle, Badge, Calendar, Clock, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

interface PatientCareRecordProps {
  patient: any;
}

interface CareVisit {
  id: string;
  date: string;
  time: string;
  symptoms: string;
  temperature: string;
  bloodPressure: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string;
  status: "agendada" | "confirmada" | "cancelada";
}

export function PatientCareRecord({ patient }: PatientCareRecordProps) {
  const [activeTab, setActiveTab] = useState<
    "atendimento" | "agendamentos" | "historico"
  >("atendimento");
  const [isAddingCare, setIsAddingCare] = useState(false);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [careVisits, setCareVisits] = useState<CareVisit[]>([
    {
      id: "1",
      date: "",
      time: "",
      symptoms: "",
      temperature: "",
      bloodPressure: "",
      diagnosis: "",
      treatment: "",
      notes: "",
    },
  ]);
  const [formData, setFormData] = useState({
    symptoms: "",
    temperature: "",
    bloodPressure: "",
    diagnosis: "",
    treatment: "",
    notes: "",
  });
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    reason: "",
  });
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      date: "25/11/2025",
      time: "10:00",
      reason: "Retorno - Acompanhamento",
      status: "confirmada",
    },
  ]);

  const handleAddCareVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.symptoms && formData.temperature) {
      const newVisit: CareVisit = {
        id: String(careVisits.length + 1),
        date: new Date().toLocaleDateString("pt-BR"),
        time: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        ...formData,
      };
      setCareVisits([newVisit, ...careVisits]);
      setFormData({
        symptoms: "",
        temperature: "",
        bloodPressure: "",
        diagnosis: "",
        treatment: "",
        notes: "",
      });
      setIsAddingCare(false);
    }
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      appointmentData.date &&
      appointmentData.time &&
      appointmentData.reason
    ) {
      const newAppointment: Appointment = {
        id: String(appointments.length + 1),
        ...appointmentData,
        status: "agendada",
      };
      setAppointments([newAppointment, ...appointments]);
      setAppointmentData({
        date: "",
        time: "",
        reason: "",
      });
      setIsAddingAppointment(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        {/* <Button onClick={() => console.log("voltar")} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button> */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900">
            {patient.patientName}
          </h2>
          <p className="text-sm text-gray-600">CPF: {patient.cpf}</p>
        </div>
      </div>

      {/* Abas de Navegação */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("atendimento")}
          className={`cursor-pointer px-4 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === "atendimento"
              ? "border-green-600 text-green-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Atendimento
        </button>
        <button
          onClick={() => setActiveTab("agendamentos")}
          className={`cursor-pointer px-4 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === "agendamentos"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Agendamentos
        </button>
        <button
          onClick={() => setActiveTab("historico")}
          className={`cursor-pointer px-4 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === "historico"
              ? "border-purple-600 text-purple-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Histórico
        </button>
      </div>

      {/* Conteúdo das Abas */}
      {activeTab === "atendimento" && (
        <div className="space-y-4">
          {!isAddingCare ? (
            <Button
              onClick={() => setIsAddingCare(true)}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Atendimento
            </Button>
          ) : (
            <Card className="p-6 bg-green-50 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Registrar Novo Atendimento
              </h3>
              <form onSubmit={handleAddCareVisit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sintomas <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.symptoms}
                      onChange={(e) =>
                        setFormData({ ...formData, symptoms: e.target.value })
                      }
                      placeholder="Ex: Febre alta, dor de cabeça, tosse"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temperatura <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Ex: 39.2°C"
                        value={formData.temperature}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            temperature: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pressão Arterial
                      </label>
                      <Input
                        type="text"
                        placeholder="Ex: 120/80"
                        value={formData.bloodPressure}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bloodPressure: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diagnóstico
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: Gripe"
                    value={formData.diagnosis}
                    onChange={(e) =>
                      setFormData({ ...formData, diagnosis: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tratamento
                  </label>
                  <textarea
                    value={formData.treatment}
                    onChange={(e) =>
                      setFormData({ ...formData, treatment: e.target.value })
                    }
                    placeholder="Ex: Dipirona 500mg a cada 6h, repouso"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Notas adicionais..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows={2}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Salvar Atendimento
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsAddingCare(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Últimos Atendimentos */}
          {careVisits.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                Últimos Atendimentos
              </h3>
              {careVisits.slice(0, 3).map((visit) => (
                <Card key={visit.id} className="p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {visit.date}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {visit.time}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600 font-medium">Sintomas:</p>
                      <p className="text-gray-900">{visit.symptoms}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Temperatura:</p>
                      <p className="text-gray-900">{visit.temperature}</p>
                    </div>
                    {visit.diagnosis && (
                      <div>
                        <p className="text-gray-600 font-medium">
                          Diagnóstico:
                        </p>
                        <p className="text-gray-900">{visit.diagnosis}</p>
                      </div>
                    )}
                    {visit.treatment && (
                      <div>
                        <p className="text-gray-600 font-medium">Tratamento:</p>
                        <p className="text-gray-900">{visit.treatment}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "agendamentos" && (
        <div className="space-y-4">
          {!isAddingAppointment ? (
            <Button
              onClick={() => setIsAddingAppointment(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agendar Consulta
            </Button>
          ) : (
            <Card className="p-6 bg-blue-50 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Agendar Nova Consulta
              </h3>
              <form onSubmit={handleAddAppointment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      value={appointmentData.date}
                      onChange={(e) =>
                        setAppointmentData({
                          ...appointmentData,
                          date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hora <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="time"
                      value={appointmentData.time}
                      onChange={(e) =>
                        setAppointmentData({
                          ...appointmentData,
                          time: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo da Consulta <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: Acompanhamento, Retorno"
                    value={appointmentData.reason}
                    onChange={(e) =>
                      setAppointmentData({
                        ...appointmentData,
                        reason: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Agendar
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsAddingAppointment(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Agendamentos */}
          {appointments.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                Consultas Agendadas
              </h3>
              {appointments.map((apt) => (
                <Card key={apt.id} className="p-4 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-gray-900">
                          {apt.date} às {apt.time}
                        </span>
                      </div>
                      <p className="text-gray-700">{apt.reason}</p>
                    </div>
                    <Badge
                      className={`${
                        apt.status === "confirmada"
                          ? "bg-green-600"
                          : apt.status === "agendada"
                            ? "bg-blue-600"
                            : "bg-red-600"
                      }`}
                    >
                      {apt.status === "confirmada"
                        ? "Confirmada"
                        : apt.status === "agendada"
                          ? "Agendada"
                          : "Cancelada"}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "historico" && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">
            Histórico Completo de Atendimentos
          </h3>
          {careVisits.length > 0 ? (
            careVisits.map((visit) => (
              <Card key={visit.id} className="p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b">
                  <AlertCircle className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold">
                    {visit.date} - {visit.time}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 font-medium">Sintomas</p>
                    <p className="text-gray-900">{visit.symptoms}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Temperatura</p>
                    <p className="text-gray-900">{visit.temperature}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Diagnóstico</p>
                    <p className="text-gray-900">
                      {visit.diagnosis || "Não preenchido"}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">Nenhum atendimento registrado</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
