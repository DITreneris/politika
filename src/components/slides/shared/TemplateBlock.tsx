import CopyButton from './CopyButton';

interface TemplateBlockProps {
  label: string;
  template: string;
}

export default function TemplateBlock({ label, template }: TemplateBlockProps) {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 relative">
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </p>
        <CopyButton text={template} />
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line font-mono">
        {template}
      </p>
    </div>
  );
}
