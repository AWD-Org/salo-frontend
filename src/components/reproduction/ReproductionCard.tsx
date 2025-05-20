'use client';

import { Calendar, Heart, User, Clock, BarChart, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Dropdown } from '@/components/ui/Dropdown';
import type { Axolotl, Axolotary, ReproductionEvent } from '@/types';
import { cn } from '@/lib/utils';

interface ReproductionCardProps {
  reproductionEvent: ReproductionEvent;
  axolotls: Axolotl[];
  axolotaries: Axolotary[];
  onEdit: (event: ReproductionEvent) => void;
  onDelete: (event: ReproductionEvent) => void;
}

const getStatusColor = (status: ReproductionEvent['status']) => {
  switch (status) {
    case 'scheduled':
      return { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' };
    case 'in_progress':
      return { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' };
    case 'completed':
      return { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' };
    case 'failed':
      return { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' };
    case 'cancelled':
      return { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500' };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500' };
  }
};

const getStatusText = (status: ReproductionEvent['status']) => {
  switch (status) {
    case 'scheduled':
      return 'Programado';
    case 'in_progress':
      return 'En Progreso';
    case 'completed':
      return 'Completado';
    case 'failed':
      return 'Fallido';
    case 'cancelled':
      return 'Cancelado';
    default:
      return 'Desconocido';
  }
};

export function ReproductionCard({
  reproductionEvent,
  axolotls,
  axolotaries,
  onEdit,
  onDelete,
}: ReproductionCardProps) {
  const statusColors = getStatusColor(reproductionEvent.status);
  const father = axolotls.find(a => a.id === reproductionEvent.fatherAxolotlId);
  const mother = axolotls.find(a => a.id === reproductionEvent.motherAxolotlId);
  const axolotary = axolotaries.find(a => a.id === reproductionEvent.axolotaryId);
  
  const isCompleted = reproductionEvent.status === 'completed' || reproductionEvent.status === 'failed';
  const scheduledDate = new Date(reproductionEvent.scheduledDate);
  const totalOffspring = isCompleted
    ? reproductionEvent.offspringSuccessCount + reproductionEvent.offspringFailedCount
    : null;
  const successRate = isCompleted && totalOffspring
    ? Math.round((reproductionEvent.offspringSuccessCount / totalOffspring) * 100)
    : null;

  return (
    <Card variant="interactive" className="group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900 text-lg">
              {father?.name} + {mother?.name}
            </h3>
            <p className="text-sm text-gray-500">{axolotary?.name}</p>
          </div>
          <Dropdown
            trigger={
              <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={16} />
              </Button>
            }
          >
            <div className="py-1 min-w-[120px]">
              <button
                onClick={() => onEdit(reproductionEvent)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Edit size={14} />
                Editar
              </button>
              <button
                onClick={() => onDelete(reproductionEvent)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
              >
                <Trash2 size={14} />
                Eliminar
              </button>
            </div>
          </Dropdown>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Estado:</span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
              <div className={`w-2 h-2 rounded-full ${statusColors.dot}`}></div>
              {getStatusText(reproductionEvent.status)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Fecha Programada:</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {scheduledDate.toLocaleDateString('es-ES')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">Padre:</span>
              <span className="text-sm font-medium text-gray-900 truncate">
                {father?.name || 'No encontrado'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-pink-500" />
              <span className="text-sm text-gray-600">Madre:</span>
              <span className="text-sm font-medium text-gray-900 truncate">
                {mother?.name || 'No encontrado'}
              </span>
            </div>
          </div>

          {isCompleted && (
            <>
              <hr className="border-gray-200" />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Crías Exitosas:</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {reproductionEvent.offspringSuccessCount}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-600">Crías Fallidas:</span>
                  </div>
                  <span className="text-sm font-medium text-red-600">
                    {reproductionEvent.offspringFailedCount}
                  </span>
                </div>

                {successRate !== null && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Tasa de Éxito:</span>
                    </div>
                    <span className={cn(
                      "text-sm font-medium",
                      successRate > 70 ? "text-green-600" : 
                      successRate > 40 ? "text-amber-600" : "text-red-600"
                    )}>
                      {successRate}%
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          {reproductionEvent.result && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">{reproductionEvent.result}</p>
            </div>
          )}

          {reproductionEvent.notes && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">{reproductionEvent.notes}</p>
            </div>
          )}

          <div className="flex items-center justify-end">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">
                {new Date(reproductionEvent.createdDate).toLocaleDateString('es-ES')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
