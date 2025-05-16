import { ReactNode, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const dropdownVariants = cva(
  'absolute right-0 mt-2 min-w-[200px] bg-white rounded-lg border border-gray-200 z-50 animate-in slide-in-from-top-2 duration-200',
  {
    variants: {
      alignment: {
        left: 'left-0 right-auto',
        right: 'right-0 left-auto',
        center: 'left-1/2 -translate-x-1/2',
      },
      size: {
        small: 'min-w-[150px]',
        default: 'min-w-[200px]',
        large: 'min-w-[300px]',
      },
    },
    defaultVariants: {
      alignment: 'right',
      size: 'default',
    },
  }
);

interface DropdownProps extends VariantProps<typeof dropdownVariants> {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export function Dropdown({ 
  trigger, 
  children, 
  className, 
  alignment,
  size,
  onOpenChange 
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOpenChange]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div className={cn(dropdownVariants({ alignment, size }), className)}>
          <div className="py-1 text-gray-700">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

// Additional sub-components for better composition
export function DropdownItem({ 
  children, 
  onClick, 
  className,
  disabled = false 
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex w-full items-center px-3 py-2 text-sm font-medium text-left transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg',
        disabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'hover:bg-gray-100 active:bg-gray-200',
        className
      )}
    >
      {children}
    </button>
  );
}

export function DropdownSeparator({ className }: { className?: string }) {
  return (
    <div className={cn('my-1 h-px bg-gray-200', className)} />
  );
}
