import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Heart, Shield, BarChart3, Users, Zap, Sparkles } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Heart,
      title: 'Cuidado Integral',
      description: 'Monitoreo completo de la salud y bienestar de tus ajolotes con alertas inteligentes.',
    },
    {
      icon: Users,
      title: 'Gestión de Colonias',
      description: 'Organiza y gestiona múltiples ajolotarios con herramientas profesionales.',
    },
    {
      icon: BarChart3,
      title: 'Análisis Avanzado',
      description: 'Visualiza estadísticas y reportes detallados sobre el crecimiento y reproducción.',
    },
    {
      icon: Shield,
      title: 'Prevención de Problemas',
      description: 'Sistema proactivo de alertas para prevenir enfermedades y problemas de salud.',
    },
    {
      icon: Zap,
      title: 'Interfaz Moderna',
      description: 'Diseño intuitivo y responsive que se adapta a todos tus dispositivos.',
    },
    {
      icon: Sparkles,
      title: 'Fácil de Usar',
      description: 'Onboarding guiado y herramientas diseñadas para usuarios de todos los niveles.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background-light dark:from-primary/10 dark:to-background-dark py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Gestiona tus{' '}
              <span className="text-primary">Ajolotes</span>{' '}
              como un profesional
            </h1>
            <p className="mt-6 text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto">
              SaloSaaS es la plataforma integral para el cuidado, gestión y reproducción de ajolotes. 
              Diseñada por expertos para cuidadores apasionados.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Comenzar Gratis
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Todo lo que necesitas para cuidar tus ajolotes
            </h2>
            <p className="mt-4 text-xl text-text-secondary-light dark:text-text-secondary-dark">
              Herramientas profesionales en una plataforma fácil de usar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold">1,000+</div>
              <div className="text-primary-light mt-2">Ajolotes Gestionados</div>
            </div>
            <div>
              <div className="text-4xl font-bold">500+</div>
              <div className="text-primary-light mt-2">Usuarios Activos</div>
            </div>
            <div>
              <div className="text-4xl font-bold">99.9%</div>
              <div className="text-primary-light mt-2">Tiempo de Actividad</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            ¿Listo para simplificar el cuidado de tus ajolotes?
          </h2>
          <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-2xl mx-auto">
            Únete a cientos de cuidadores que ya utilizan SaloSaaS para gestionar sus ajolotes de manera profesional.
          </p>
          <Link href="/signup">
            <Button size="lg">
              Empezar Ahora - Gratis
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
