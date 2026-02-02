import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md';
}

export default function CopyButton({ text, className = '', size = 'md' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const padding = size === 'sm' ? 'p-1.5' : 'p-2';

  return (
    <button
      onClick={handleCopy}
      className={`${padding} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label="Kopijuoti"
      title="Kopijuoti"
    >
      {copied ? (
        <Check className={`${iconSize} text-emerald-600`} />
      ) : (
        <Copy className={`${iconSize} text-gray-500 dark:text-gray-400`} />
      )}
    </button>
  );
}
