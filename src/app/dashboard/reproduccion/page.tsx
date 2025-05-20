'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/modal/Modal';
import { DeleteConfirmationModal } from '@/components/ui/modal/DeleteConfirmationModal';
import { Skeleton } from '@/components/ui/Skeleton';
import ReproductionForm from '@/components/reproduction/ReproductionForm';
import { ReproductionCard } from '@/components/reproduction/ReproductionCard';
import {
  Search,
  Filter,
  Plus,
  Heart,
  Calendar,
  BarChart,
  AlertTriangle,
  Clock,
  CheckSquare,
  XSquare,
  Users,
} from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import { toast } from 'react-toastify';
import type { Axolotl, Axolotary, CreateReproductionEventData, ReproductionEvent, UpdateReproductionEventData } from '@/types';
import { cn } from '@/lib/utils';

// Mock data for reproduction events
const mockReproductionEvents: ReproductionEvent[] = [
  {
    id: '1',
    axolotaryId: 'axolotary-1',
    fatherAxolotlId: '2', // Shadow
    motherAxolotlId: '1', // Luna
    scheduledDate: new Date('2024-06-10'),
    status: 'completed',
    result: 'Reproducción exitosa',
    offspringSuccessCount: 12,
    offspringFailedCount: 3,
    notes: 'Sin complicaciones',
    isActive: true,
    createdDate: new Date('2024-05-01'),
    lastUpdatedDate: new Date('2024-06-12'),
  },
  {
    id: '2',
    axolotaryId: 'axolotary-2',
    fatherAxolotlId: '2', // Shadow
    motherAxolotlId: '3', // Aurora
    scheduledDate: new Date('2024-07-05'),
    status: 'scheduled',
    result: '',
    offspringSuccessCount: 0,
    offspringFailedCount: 0,
    notes: 'Primera reproducción entre estos individuos',
    isActive: true,
    createdDate: new Date('2024-05-10'),
    lastUpdatedDate: new Date('2024-05-10'),
  },
  {
    id: '3',
    axolotaryId: 'axolotary-1',
    fatherAxolotlId: '2', // Shadow
    motherAxolotlId: '1', // Luna
    scheduledDate: new Date('2024-04-15'),
    status: 'failed',
    result: 'No hubo embriones viables',
    offspringSuccessCount: 0,
    offspringFailedCount: 5,
    notes: 'Posible problema de compatibilidad',
    isActive: true,
    createdDate: new Date('2024-03-01'),
    lastUpdatedDate: new Date('2024-04-18'),
  },
  {
    id: '4',
    axolotaryId: 'axolotary-1',
    fatherAxolotlId: '2', // Shadow
    motherAxolotlId: '3', // Aurora
    scheduledDate: new Date('2024-05-20'),
    status: 'in_progress',
    result: '',
    offspringSuccessCount: 0,
    offspringFailedCount: 0,
    notes: 'Monitoreo constante',
    isActive: true,
    createdDate: new Date('2024-05-10'),
    lastUpdatedDate: new Date('2024-05-10'),
  },
];

// Mock data for axolotaries and axolotls - reusing from mis-axolotls
const mockAxolotaries: Axolotary[] = [
  {
    id: 'axolotary-1',
    name: 'Criadero Principal',
    description: 'Instalación principal para axolotls',
    userId: 'user-1',
    ponds: [
      { id: 'pond-1', name: 'Estanque A', capacity: 20, temperature: 18, axolotaryId: 'axolotary-1', axolotls: [], createdAt: new Date(), updatedAt: new Date() },
      { id: 'pond-2', name: 'Estanque B', capacity: 20, temperature: 19, axolotaryId: 'axolotary-1', axolotls: [], createdAt: new Date(), updatedAt: new Date() }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'axolotary-2',
    name: 'Criadero Secundario',
    description: 'Instalación para jóvenes',
    userId: 'user-1',
    ponds: [
      { id: 'pond-3', name: 'Estanque C', capacity: 15, temperature: 17, axolotaryId: 'axolotary-2', axolotls: [], createdAt: new Date(), updatedAt: new Date() }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockAxolotls: Axolotl[] = [
  {
    id: '1',
    axolotaryId: 'axolotary-1',
    pondId: 'pond-1',
    code: 'AX001',
    name: 'Luna',
    gender: 'female',
    species: 'Ambystoma mexicanum',
    birthDate: new Date('2023-03-15'),
    originZone: 'Xochimilco',
    healthStatus: 'healthy',
    lastHealthCheck: new Date('2024-12-01'),
    notes: 'Muy activa y con buen apetito',
    isActive: true,
    createdDate: new Date('2023-03-15'),
    lastUpdatedDate: new Date('2024-12-01'),
  },
  {
    id: '2',
    axolotaryId: 'axolotary-1',
    pondId: 'pond-2',
    code: 'AX002',
    name: 'Shadow',
    gender: 'male',
    species: 'Ambystoma mexicanum',
    birthDate: new Date('2023-05-20'),
    originZone: 'Chalco',
    healthStatus: 'treatment',
    lastHealthCheck: new Date('2024-12-05'),
    notes: 'En tratamiento por lesión en branquias',
    isActive: true,
    createdDate: new Date('2023-05-20'),
    lastUpdatedDate: new Date('2024-12-05'),
  },
  {
    id: '3',
    axolotaryId: 'axolotary-2',
    pondId: 'pond-3',
    code: 'AX003',
    name: 'Aurora',
    gender: 'female',
    species: 'Ambystoma mexicanum',
    birthDate: new Date('2023-01-10'),
    originZone: 'Xochimilco',
    healthStatus: 'healthy',
    lastHealthCheck: new Date('2024-11-28'),
    notes: 'Excelente reproducción',
    isActive: true,
    createdDate: new Date('2023-01-10'),
    lastUpdatedDate: new Date('2024-11-28'),
  },
  {
    id: '4',
    axolotaryId: 'axolotary-1',
    pondId: 'pond-1',
    code: 'AX004',
    name: 'Coco',
    gender: 'unknown',
    species: 'Ambystoma mexicanum',
    birthDate: new Date('2023-08-12'),
    originZone: 'Chalco',
    healthStatus: 'sick',
    lastHealthCheck: new Date('2024-12-03'),
    notes: 'Síntomas de estrés, separado temporalmente',
    isActive: true,
    createdDate: new Date('2023-08-12'),
    lastUpdatedDate: new Date('2024-12-03'),
  },
];

export default function ReproduccionPage() {
  const { data: session, status } = useSession();
  const [reproductionEvents, setReproductionEvents] = useState<ReproductionEvent[]>(mockReproductionEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<ReproductionEvent['status'] | 'all'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ReproductionEvent | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<ReproductionEvent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  // Filter events based on search term and status
  const filteredEvents = reproductionEvents.filter(event => {
    // Get father and mother names for search
    const father = mockAxolotls.find(a => a.id === event.fatherAxolotlId);
    const mother = mockAxolotls.find(a => a.id === event.motherAxolotlId);
    const axolotary = mockAxolotaries.find(a => a.id === event.axolotaryId);
    
    const searchString = `${father?.name || ''} ${mother?.name || ''} ${axolotary?.name || ''}`;
    const matchesSearch = searchTerm === '' || searchString.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus;
    
    return matchesSearch && matchesFilter && event.isActive;
  });

  // Event handlers
  const handleCreateEvent = async (data: CreateReproductionEventData) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const newEvent: ReproductionEvent = {
        ...data,
        id: Date.now().toString(),
        result: '',
        offspringSuccessCount: 0,
        offspringFailedCount: 0,
        isActive: true,
        createdDate: new Date(),
        lastUpdatedDate: new Date(),
        notes: data.notes || '', // Ensure notes is always a string
      };
      
      setReproductionEvents(prev => [...prev, newEvent]);
      setIsCreateModalOpen(false);
      toast.success('Evento de reproducción creado exitosamente');
    } catch (error) {
      console.error('Error creating reproduction event:', error);
      toast.error('Error al crear evento de reproducción');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEvent = async (data: UpdateReproductionEventData) => {
    setIsLoading(true);
    try {
      setReproductionEvents(prev => prev.map(event => 
        event.id === data.id 
          ? { 
              ...event, 
              ...data,
              lastUpdatedDate: new Date() 
            }
          : event
      ));
      setEditingEvent(null);
      toast.success('Evento de reproducción actualizado exitosamente');
    } catch (error) {
      console.error('Error updating reproduction event:', error);
      toast.error('Error al actualizar evento de reproducción');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (event: ReproductionEvent) => {
    setIsLoading(true);
    try {
      // In a real app, this would be a soft delete API call
      setReproductionEvents(prev => prev.map(e => 
        e.id === event.id ? { ...e, isActive: false } : e
      ));
      setDeletingEvent(null);
      toast.success('Evento de reproducción eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting reproduction event:', error);
      toast.error('Error al eliminar evento de reproducción');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
  };

  // Stats for the dashboard
  const statusCounts = reproductionEvents.reduce((acc, event) => {
    if (event.isActive) {
      acc[event.status] = (acc[event.status] || 0) + 1;
    }
    return acc;
  }, {} as Record<ReproductionEvent['status'], number>);

  const totalOffspring = reproductionEvents.reduce(
    (sum, event) => sum + event.offspringSuccessCount,
    0
  );

  const completedEvents = reproductionEvents.filter(
    e => e.isActive && e.status === 'completed'
  ).length;

  const failedEvents = reproductionEvents.filter(
    e => e.isActive && e.status === 'failed'
  ).length;

  const upcomingEvents = reproductionEvents.filter(
    e => e.isActive && e.status === 'scheduled' && new Date(e.scheduledDate) > new Date()
  ).length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Reproducción
          </h1>
          <p className="text-gray-600">
            Gestiona los eventos de reproducción de tus axolotls
          </p>
        </div>
        <Button
          size="sm"
          className="gap-2"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={16} />
          Nuevo Evento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card variant="interactive" className="group">
          <div >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eventos Activos</p>
                <p className="text-2xl font-bold text-gray-900">{filteredEvents.length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </Card>

        <Card variant="interactive" className="group">
          <div >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Próximos</p>
                <p className="text-2xl font-bold text-blue-600">{upcomingEvents}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </Card>

        <Card variant="interactive" className="group">
          <div >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Exitosos</p>
                <p className="text-2xl font-bold text-green-600">{completedEvents}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg group-hover:scale-110 transition-transform">
                <CheckSquare className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </Card>

        <Card variant="interactive" className="group">
          <div >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Crías</p>
                <p className="text-2xl font-bold text-purple-600">{totalOffspring}</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nombre de axolotl o ajolotario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Dropdown
          trigger={
            <Button variant="outline" size="sm" className="gap-2">
              <Filter size={16} />
              {filterStatus === 'all' ? 'Todos' : 
               filterStatus === 'scheduled' ? 'Programados' :
               filterStatus === 'in_progress' ? 'En Progreso' :
               filterStatus === 'completed' ? 'Completados' :
               filterStatus === 'failed' ? 'Fallidos' : 'Cancelados'}
            </Button>
          }
        >
          <div className="py-1 min-w-[150px]">
            <button
              onClick={() => setFilterStatus('all')}
              className={cn(
                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors",
                filterStatus === 'all' ? "bg-gray-100 font-medium" : ""
              )}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterStatus('scheduled')}
              className={cn(
                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors",
                filterStatus === 'scheduled' ? "bg-gray-100 font-medium" : ""
              )}
            >
              Programados
            </button>
            <button
              onClick={() => setFilterStatus('in_progress')}
              className={cn(
                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors",
                filterStatus === 'in_progress' ? "bg-gray-100 font-medium" : ""
              )}
            >
              En Progreso
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={cn(
                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors",
                filterStatus === 'completed' ? "bg-gray-100 font-medium" : ""
              )}
            >
              Completados
            </button>
            <button
              onClick={() => setFilterStatus('failed')}
              className={cn(
                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors",
                filterStatus === 'failed' ? "bg-gray-100 font-medium" : ""
              )}
            >
              Fallidos
            </button>
            <button
              onClick={() => setFilterStatus('cancelled')}
              className={cn(
                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors",
                filterStatus === 'cancelled' ? "bg-gray-100 font-medium" : ""
              )}
            >
              Cancelados
            </button>
          </div>
        </Dropdown>

        {(searchTerm || filterStatus !== 'all') && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Reproduction Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <ReproductionCard
            key={event.id}
            reproductionEvent={event}
            axolotls={mockAxolotls}
            axolotaries={mockAxolotaries}
            onEdit={setEditingEvent}
            onDelete={setDeletingEvent}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron eventos de reproducción</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'No hay eventos que coincidan con los criterios de búsqueda'
              : 'Aún no tienes eventos de reproducción registrados'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
              <Plus size={16} />
              Crear tu primer evento
            </Button>
          )}
          {(searchTerm || filterStatus !== 'all') && (
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="gap-2"
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      )}

      {/* Modals */}
      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Nuevo Evento de Reproducción"
        description="Programa un nuevo evento de reproducción entre axolotls"
        size="2xl"
      >
        <ReproductionForm
          axolotaries={mockAxolotaries}
          axolotls={mockAxolotls}
          onSubmit={(data) => handleCreateEvent(data as CreateReproductionEventData)}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      <Modal
        open={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        title="Editar Evento de Reproducción"
        description={editingEvent ? `Actualizando información del evento entre ${
          mockAxolotls.find(a => a.id === editingEvent?.fatherAxolotlId)?.name
        } y ${
          mockAxolotls.find(a => a.id === editingEvent?.motherAxolotlId)?.name
        }` : ''}
        size="2xl"
      >
        {editingEvent && (
          <ReproductionForm
            reproductionEvent={editingEvent}
            axolotaries={mockAxolotaries}
            axolotls={mockAxolotls}
            onSubmit={(data) => {
              if ('id' in data) {
                return handleUpdateEvent(data);
              }
              return Promise.reject(new Error('Invalid data type for update'));
            }}
            onCancel={() => setEditingEvent(null)}
            isLoading={isLoading}
          />
        )}
      </Modal>

      <DeleteConfirmationModal
        open={!!deletingEvent}
        onClose={() => setDeletingEvent(null)}
        onConfirm={() => deletingEvent && handleDeleteEvent(deletingEvent)}
        title="Eliminar Evento de Reproducción"
        description="Esta acción no se puede deshacer"
        message={`¿Estás seguro de que quieres eliminar el evento de reproducción entre ${
          mockAxolotls.find(a => a.id === deletingEvent?.fatherAxolotlId)?.name
        } y ${
          mockAxolotls.find(a => a.id === deletingEvent?.motherAxolotlId)?.name
        }?`}
        confirmText="Eliminar"
        isLoading={isLoading}
      />
    </div>
  );
}
