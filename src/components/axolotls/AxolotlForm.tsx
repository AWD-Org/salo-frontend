'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'react-toastify';
import type { Axolotl, CreateAxolotlData, UpdateAxolotlData, Axolotary, Pond } from '@/types';
import { cn } from '@/lib/utils';

const axolotlSchema = z.object({
  axolotaryId: z.string().min(1, 'Selecciona un ajolotario'),
  pondId: z.string().min(1, 'Selecciona un estanque'),
  code: z.string().min(1, 'Código es requerido'),
  name: z.string().min(1, 'Nombre es requerido'),
  gender: z.enum(['male', 'female', 'unknown']),
  species: z.string().min(1, 'Especie es requerida'),
  birthDate: z.string().min(1, 'Fecha de nacimiento es requerida'),
  originZone: z.string().min(1, 'Zona de origen es requerida'),
  healthStatus: z.enum(['healthy', 'sick', 'critical', 'treatment']),
  notes: z.string().optional().default(''),
});

type AxolotlFormData = z.infer<typeof axolotlSchema>;

interface AxolotlFormProps {
  axolotl?: Axolotl;
  axolotaries: Axolotary[];
  onSubmit: (data: CreateAxolotlData | UpdateAxolotlData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function AxolotlForm({ 
  axolotl, 
  axolotaries, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: AxolotlFormProps) {
  const [selectedAxolotary, setSelectedAxolotary] = useState<string>(axolotl?.axolotaryId || '');
  const [availablePonds, setAvailablePonds] = useState<Pond[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<AxolotlFormData>({
    resolver: zodResolver(axolotlSchema),
    defaultValues: {
      axolotaryId: axolotl?.axolotaryId || '',
      pondId: axolotl?.pondId || '',
      code: axolotl?.code || '',
      name: axolotl?.name || '',
      gender: axolotl?.gender || 'unknown',
      species: axolotl?.species || '',
      birthDate: axolotl?.birthDate ? new Date(axolotl.birthDate).toISOString().split('T')[0] : '',
      originZone: axolotl?.originZone || '',
      healthStatus: axolotl?.healthStatus || 'healthy',
      notes: axolotl?.notes || '',
    },
  });

  // Watch for axolotary changes to update pond options
  useEffect(() => {
    if (selectedAxolotary) {
      const axolotary = axolotaries.find(a => a.id === selectedAxolotary);
      setAvailablePonds(axolotary?.ponds || []);
      
      // Only reset pond selection when axolotary changes and it's not part of initialization
      if (isDirty) {
        setValue('pondId', '');
      }
    }
  }, [selectedAxolotary, axolotaries, setValue, isDirty]);

  const handleFormSubmit = async (data: AxolotlFormData) => {
    try {
      if (axolotl) {
        // Update existing axolotl
        const updateData: UpdateAxolotlData = {
          id: axolotl.id,
          ...data,
          birthDate: new Date(data.birthDate),
        };
        await onSubmit(updateData);
      } else {
        // Create new axolotl
        const createData: CreateAxolotlData = {
          ...data,
          birthDate: new Date(data.birthDate),
        };
        await onSubmit(createData);
      }
      
      toast.success(axolotl ? 'Axolotl actualizado exitosamente' : 'Axolotl creado exitosamente');
    } catch (error) {
      toast.error(axolotl ? 'Error al actualizar axolotl' : 'Error al crear axolotl');
      console.error(error);
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
              Estanque
            </label>
            <select
              {...register('pondId')}
              disabled={!selectedAxolotary}
              className={cn(
                "w-full px-3 py-2 border rounded-md text-gray-900 bg-white transition-colors duration-200",
                "placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                "disabled:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                errors.pondId ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
              )}
            >
              <option value="">Selecciona un estanque</option>
              {availablePonds.map((pond) => (
                <option key={pond.id} value={pond.id}>
                  {pond.name}
                </option>
              ))}
            </select>
            {errors.pondId && (
              <p className="text-sm text-red-500 mt-1">{errors.pondId.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Código
            </label>
            <Input
              {...register('code')}
              placeholder="Ej. AX001"
              error={!!errors.code}
            />
            {errors.code && (
              <p className="text-sm text-red-500 mt-1">{errors.code.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Nombre
            </label>
            <Input
              {...register('name')}
              placeholder="Nombre del axolotl"
              error={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Género
            </label>
            <select
              {...register('gender')}
              className={cn(
                "w-full px-3 py-2 border rounded-md text-gray-900 bg-white transition-colors duration-200",
                "placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                "disabled:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                errors.gender ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
              )}
            >
              <option value="unknown">Desconocido</option>
              <option value="male">Macho</option>
              <option value="female">Hembra</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Especie
            </label>
            <Input
              {...register('species')}
              placeholder="Especie del axolotl"
              error={!!errors.species}
            />
            {errors.species && (
              <p className="text-sm text-red-500 mt-1">{errors.species.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Fecha de Nacimiento
            </label>
            <Input
              type="date"
              {...register('birthDate')}
              error={!!errors.birthDate}
            />
            {errors.birthDate && (
              <p className="text-sm text-red-500 mt-1">{errors.birthDate.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Zona de Origen
            </label>
            <Input
              {...register('originZone')}
              placeholder="Zona donde nació"
              error={!!errors.originZone}
            />
            {errors.originZone && (
              <p className="text-sm text-red-500 mt-1">{errors.originZone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Estado de Salud
          </label>
          <select
            {...register('healthStatus')}
            className={cn(
              "w-full px-3 py-2 border rounded-md text-gray-900 bg-white transition-colors duration-200",
              "placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              "disabled:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
              errors.healthStatus ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
            )}
          >
            <option value="healthy">Saludable</option>
            <option value="sick">Enfermo</option>
            <option value="treatment">En Tratamiento</option>
            <option value="critical">Crítico</option>
          </select>
          {errors.healthStatus && (
            <p className="text-sm text-red-500 mt-1">{errors.healthStatus.message}</p>
          )}
        </div>

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
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            className="flex-1"
          >
            {axolotl ? 'Actualizar' : 'Crear'} Axolotl
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
