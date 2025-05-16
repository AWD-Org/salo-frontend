'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from './Modal';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  description?: string;
}

export function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  description,
  confirmText = 'Eliminar',
  cancelText = 'Cancelar',
  isLoading = false,
}: DeleteConfirmationModalProps) {
  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title={title} 
      description={description}
      size="sm"
      hideCloseButton
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-50 flex items-center justify-center mt-0.5">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            loading={isLoading}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
