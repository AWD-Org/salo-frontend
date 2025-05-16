'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'react-toastify';
import type { Axolotl, Axolotary, CreateReproductionEventData, ReproductionEvent, UpdateReproductionEventData } from '@/types';
import { cn } from '@/lib/utils';

const reproductionSchema = z.object({
  axolotaryId: z.string().min(1, 'Selecciona un ajolotario'),
  fatherAxolotlId: z.string().min(1, 'Selecciona el axolotl padre'),
  motherAxolotlId: z.string().min(1, 'Selecciona el axolotl madre'),
  scheduledDate: z.string().min(1, 'Fecha de reproducción es requerida'),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'failed', 'cancelled']),
  result: z.string().optional().default(''),
  offspringSuccessCount: z.preprocess(
    (val) => (val === '' ? 0 : Number(val)),
    z.number().min(0, 'No puede ser menor que 0')
  ),
  offspringFailedCount: z.preprocess(
    (val) => (val === '' ? 0 : Number(val)),
    z.number().min(0, 'No puede ser menor que 0')
  ),
  notes: z.string().optional().default(''),
});

type ReproductionFormData = z.infer<typeof reproductionSchema>;

interface ReproductionFormProps {
  reproductionEvent?: ReproductionEvent;
  axolotaries: Axolotary[];
  axolotls: Axolotl[];
  onSubmit: (data: CreateReproductionEventData | UpdateReproductionEventData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ReproductionForm({
  reproductionEvent,
  axolotaries,
  axolotls,
  onSubmit,
  onCancel,
  isLoading = false
}: ReproductionFormProps) {
  const [selectedAxolotary, setSelectedAxolotary] = useState<string>(reproductionEvent?.axolotaryId || '');
  const [maleAxolotls, setMaleAxolotls] = useState<Axolotl[]>([]);
  const [femaleAxolotls, setFemaleAxolotls] = useState<Axolotl[]>([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
  } = useForm<ReproductionFormData>({
    resolver: zodResolver(reproductionSchema),
    defaultValues: {
      axolotaryId: reproductionEvent?.axolotaryId || '',
      fatherAxolotlId: reproductionEvent?.fatherAxolotlId || '',
      motherAxolotlId: reproductionEvent?.motherAxolotlId || '',
      scheduledDate: reproductionEvent?.scheduledDate ? new Date(reproductionEvent.scheduledDate).toISOString().split('T')[0] : '',
      status: reproductionEvent?.status || 'scheduled',
      result: reproductionEvent?.result || '',
      offspringSuccessCount: reproductionEvent?.offspringSuccessCount || 0,
      offspringFailedCount: reproductionEvent?.offspringFailedCount || 0,
      notes: reproductionEvent?.notes || '',
    },
  });

  const watchStatus = watch('status');

  // Update the available axolotls based on selected axolotary
  useEffect(() => {
    if (selectedAxolotary) {
      const filteredAxolotls = axolotls.filter(
        axolotl => axolotl.axolotaryId === selectedAxolotary && axolotl.isActive
      );
      
      setMaleAxolotls(filteredAxolotls.filter(axolotl => axolotl.gender === 'male'));
      setFemaleAxolotls(filteredAxolotls.filter(axolotl => axolotl.gender === 'female'));
      
      // Only reset selected axolotls if form is dirty
      if (isDirty) {
        setValue('fatherAxolotlId', '');
        setValue('motherAxolotlId', '');
      }
    }
  }, [selectedAxolotary, axolotls, setValue, isDirty]);

  const handleFormSubmit = async (data: ReproductionFormData) => {
    try {
      if (reproductionEvent) {
        // Update existing reproduction event
        const updateData: UpdateReproductionEventData = {
          id: reproductionEvent.id,
          fatherAxolotlId: data.fatherAxolotlId,
          motherAxolotlId: data.motherAxolotlId,
          scheduledDate: new Date(data.scheduledDate),
          status: data.status,
          result: data.result,
          offspringSuccessCount: data.offspringSuccessCount,
          offspringFailedCount: data.offspringFailedCount,
          notes: data.notes,
        };
        await onSubmit(updateData);
      } else {
        // Create new reproduction event
        const createData: CreateReproductionEventData = {
          axolotaryId: data.axolotaryId,
          fatherAxolotlId: data.fatherAxolotlId,
          motherAxolotlId: data.motherAxolotlId,
          scheduledDate: new Date(data.scheduledDate),
          status: data.status,
          notes: data.notes,
        };
        await onSubmit(createData);
      }
      
      toast.success(reproductionEvent 
        ? 'Evento de reproducción actualizado exitosamente' 
        : 'Evento de reproducción creado exitosamente'
      );
    } catch (error) {
      console.error('Error saving reproduction event:', error);
      toast.error(reproductionEvent 
        ? 'Error al actualizar evento de reproducción' 
        : 'Error al crear evento de reproducción'
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Ajolotario
            </label>
            <select
              {...register('axolotaryId')}
              disabled={!!reproductionEvent}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedAxolotary(value);
                setValue('axolotaryId', value);
              }}
              className={cn(
                "w-full px-3 py-2 border rounded-md text-gray-900 bg-white transition-colors duration-200",
                "placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                "disabled:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                errors.axolotaryId ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
              )}
            >
              <option value="">Selecciona un ajolotario</option>
              {axolotaries.map((axolotary) => (
                <option key={axolotary.id} value={axolotary.id}>
                  {axolotary.name}
                </option>
              ))}
            </select>
            {errors.axolotaryId && (
              <p className="text-sm text-red-500 mt-1">{errors.axolotaryId.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Fecha Programada
            </label>
            <Input
              type="date"
              {...register('scheduledDate')}
              error={!!errors.scheduledDate}
            />
            {errors.scheduledDate && (
              <p className="text-sm text-red-500 mt-1">{errors.scheduledDate.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Axolotl Padre
            </label>
            <select
              {...register('fatherAxolotlId')}
              disabled={!selectedAxolotary}
              className={cn(
                "w-full px-3 py-2 border rounded-md text-gray-900 bg-white transition-colors duration-200",
                "placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                "disabled:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                errors.fatherAxolotlId ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
              )}
            >
              <option value="">Selecciona el axolotl padre</option>
              {maleAxolotls.map((axolotl) => (
                <option key={axolotl.id} value={axolotl.id}>
                  {axolotl.name} - {axolotl.code}
                </option>
              ))}
            </select>
            {errors.fatherAxolotlId && (
              <p className="text-sm text-red-500 mt-1">{errors.fatherAxolotlId.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Axolotl Madre
            </label>
            <select
              {...register('motherAxolotlId')}
              disabled={!selectedAxolotary}
              className={cn(
                "w-full px-3 py-2 border rounded-md text-gray-900 bg-white transition-colors duration-200",
                "placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                "disabled:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                errors.motherAxolotlId ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
              )}
            >
              <option value="">Selecciona el axolotl madre</option>
              {femaleAxolotls.map((axolotl) => (
                <option key={axolotl.id} value={axolotl.id}>
                  {axolotl.name} - {axolotl.code}
                </option>
              ))}
            </select>
            {errors.motherAxolotlId && (
              <p className="text-sm text-red-500 mt-1">{errors.motherAxolotlId.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Estado
          </label>
          <select
            {...register('status')}
            className={cn(
              "w-full px-3 py-2 border rounded-md text-gray-900 bg-white transition-colors duration-200",
              "placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              "disabled:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
              errors.status ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
            )}
          >
            <option value="scheduled">Programado</option>
            <option value="in_progress">En Progreso</option>
            <option value="completed">Completado</option>
            <option value="failed">Fallido</option>
            <option value="cancelled">Cancelado</option>
          </select>
          {errors.status && (
            <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
          )}
        </div>

        {(watchStatus === 'completed' || watchStatus === 'failed') && (
          <>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Resultado
              </label>
              <Input
                {...register('result')}
                placeholder="Resultado de la reproducción"
                error={!!errors.result}
              />
              {errors.result && (
                <p className="text-sm text-red-500 mt-1">{errors.result.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Crías Exitosas
                </label>
                <Input
                  type="number"
                  min="0"
                  {...register('offspringSuccessCount')}
                  error={!!errors.offspringSuccessCount}
                />
                {errors.offspringSuccessCount && (
                  <p className="text-sm text-red-500 mt-1">{errors.offspringSuccessCount.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Crías Fallidas
                </label>
                <Input
                  type="number"
                  min="0"
                  {...register('offspringFailedCount')}
                  error={!!errors.offspringFailedCount}
                />
                {errors.offspringFailedCount && (
                  <p className="text-sm text-red-500 mt-1">{errors.offspringFailedCount.message}</p>
                )}
              </div>
            </div>
          </>
        )}

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Notas
          </label>
          <textarea
            {...register('notes')}
            placeholder="Observaciones adicionales (opcional)"
            className={cn(
              "w-full px-3 py-2 border rounded-md text-gray-900 bg-white transition-colors duration-200",
              "placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              "min-h-[80px] resize-none",
              "border-gray-200 hover:border-gray-300"
            )}
          />
          {errors.notes && (
            <p className="text-sm text-red-500 mt-1">{errors.notes.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            className="flex-1"
          >
            {reproductionEvent ? 'Actualizar' : 'Crear'} Evento
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
