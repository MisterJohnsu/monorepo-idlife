import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  Ambulance,
  CheckCircle,
  Clock,
  Fingerprint,
  Heart,
  Shield,
  Stethoscope,
  User,
  UserCog,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Heart
                className="w-6 h-6 text-primary-foreground"
                fill="currentColor"
              />
            </div>
            <span className="text-xl font-bold text-foreground">IDLife</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#como-funciona"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Como Funciona
            </Link>
            <Link
              href="#beneficios"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Benefícios
            </Link>
            <Link
              href="#acesso"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Acesso
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="#acesso">Acessar Sistema</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
              <Heart className="w-4 h-4" fill="currentColor" />
              Identificação Médica Biométrica
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Suas informações médicas{" "}
              <span className="text-primary">na ponta dos dedos</span> em
              emergências
            </h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              A tecnologia de biometria digital que salva vidas. Tenha todas as
              suas informações vitais acessíveis instantaneamente por
              socorristas autorizados através da sua digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <Link href="#acesso">Acessar Minha Carteirinha</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#como-funciona">Ver Como Funciona</Link>
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Biometria Segura</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Privacidade Total</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Acesso Rápido</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-linear-gradient-to-br from-primary/10 via-accent/5 to-secondary/20 flex items-center justify-center p-12">
              <div className="w-full max-w-sm aspect-square bg-background rounded-xl shadow-2xl border border-border p-8 flex flex-col items-center justify-center gap-6 text-center">
                <div className="w-32 h-32 rounded-full bg-primary/5 flex items-center justify-center animate-pulse">
                  <Fingerprint className="w-20 h-20 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    Identificação Biométrica
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    Toque para liberar acesso ao
                    <br />
                    Perfil de Emergência
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Access Section */}
      <section id="acesso" className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Acesso ao Sistema
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
              Selecione seu perfil para entrar no IDLife
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/login" className="block group">
              <Card className="h-full transition-all hover:border-primary hover:shadow-lg cursor-pointer">
                <CardHeader className="text-center pt-8">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Stethoscope className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="mt-4">Funcionários</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Funcionários Autorizados
                </CardContent>
              </Card>
            </Link>

            <Link href="/patient-login" className="block group">
              <Card className="h-full transition-all hover:border-primary hover:shadow-lg cursor-pointer">
                <CardHeader className="text-center pt-8">
                  <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <User className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="mt-4">Paciente</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Carteirinha digital e agendamentos
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Como Funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Tecnologia avançada para proteção da sua vida
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold">Cadastro Médico</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seu médico de confiança cria seu perfil no sistema, inserindo
                  todas as informações clínicas relevantes e histórico de saúde.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold">Vínculo Biométrico</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sua impressão digital é vinculada de forma segura ao seu
                  prontuário, tornando-se sua chave de acesso única e
                  intransferível.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold">Identificação Imediata</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Em emergências, socorristas utilizam um leitor biométrico para
                  identificar você e acessar dados vitais instantaneamente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="bg-secondary/30 py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">
                Por que usar o IDLife?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">
                      Sem Dependência de Dispositivos
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Você não precisa carregar cartões, pulseiras ou celular.
                      Sua digital é tudo o que você precisa.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">À Prova de Fraudes</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A identificação biométrica garante que o prontuário
                      acessado é realmente o seu, evitando erros de
                      identificação.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Informações Vitais</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Alergias, tipo sanguíneo, medicamentos, condições médicas
                      e contatos de emergência sempre atualizados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-4/5 rounded-2xl bg-linear-gradient-to-br from-accent/10 via-primary/5 to-secondary/20 flex items-center justify-center p-8">
                <Card className="w-full border-2 shadow-xl">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Fingerprint className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold">João Silva</h4>
                        <p className="text-sm text-muted-foreground">
                          Identificação Biométrica Verificada
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          ALERGIAS
                        </p>
                        <p className="text-sm font-medium">Penicilina, Látex</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          MEDICAMENTOS
                        </p>
                        <p className="text-sm font-medium">
                          Losartana 50mg, AAS 100mg
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          CONTATO DE EMERGÊNCIA
                        </p>
                        <p className="text-sm font-medium">
                          Maria Silva • (11) 98765-4321
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="seguranca" className="bg-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Seus dados estão seguros
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Utilizamos as mais avançadas tecnologias de criptografia e
              segurança para proteger suas informações médicas. Seus dados são
              armazenados com segurança e apenas você tem controle total sobre o
              que é compartilhado.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-primary">256-bit</p>
                <p className="text-sm text-muted-foreground">
                  Criptografia SSL
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-primary">LGPD</p>
                <p className="text-sm text-muted-foreground">
                  Compliance Total
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground">Monitoramento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Heart
                    className="w-6 h-6 text-primary-foreground"
                    fill="currentColor"
                  />
                </div>
                <span className="text-xl font-bold text-foreground">
                  IDLife
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Identificação médica digital para salvar vidas em emergências.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-sm">Produto</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link
                  href="#como-funciona"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Como Funciona
                </Link>
                <Link
                  href="#beneficios"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Benefícios
                </Link>
                <Link
                  href="#seguranca"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Segurança
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-sm">Empresa</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sobre Nós
                </Link>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contato
                </Link>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-sm">Legal</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de Privacidade
                </Link>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Termos de Uso
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 IDLife. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
