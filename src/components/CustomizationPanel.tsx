import React from 'react';
import { Sketch } from '@uiw/react-color';
import { CVData } from '../types';

interface CustomizationPanelProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
}

const fonts = [
  { name: 'Helvetica', value: 'Helvetica' },
  { name: 'Times New Roman', value: 'Times-Roman' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'OpenSans' },
] as const;

const spacingPresets = [
  { name: 'Compact', value: 1 },
  { name: 'Normal', value: 1.15 },
  { name: 'Comfortable', value: 1.3 },
  { name: 'Spacious', value: 1.5 },
] as const;

export function CustomizationPanel({ data, onUpdate }: CustomizationPanelProps) {
  const handleColorChange = (color: { hex: string }, type: 'primary' | 'secondary') => {
    onUpdate({
      ...data,
      styling: {
        ...data.styling,
        [`${type}Color`]: color.hex,
      },
    });
  };

  const handleFontChange = (font: string) => {
    onUpdate({
      ...data,
      styling: {
        ...data.styling,
        font,
      },
    });
  };

  const handleSpacingChange = (spacing: number) => {
    onUpdate({
      ...data,
      styling: {
        ...data.styling,
        spacing,
      },
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Customize Template
      </h3>

      {/* Colors */}
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Color
          </h4>
          <div className="relative">
            <Sketch
              color={data.styling?.primaryColor || '#000000'}
              onChange={(color) => handleColorChange(color, 'primary')}
              disableAlpha={true}
              presetColors={[
                '#000000', '#1a56db', '#2563eb', '#3b82f6', 
                '#0891b2', '#0d9488', '#059669', '#16a34a',
                '#4f46e5', '#7c3aed', '#9333ea', '#c026d3',
                '#db2777', '#e11d48', '#dc2626', '#ea580c'
              ]}
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Secondary Color
          </h4>
          <div className="relative">
            <Sketch
              color={data.styling?.secondaryColor || '#666666'}
              onChange={(color) => handleColorChange(color, 'secondary')}
              disableAlpha={true}
              presetColors={[
                '#666666', '#4b5563', '#6b7280', '#9ca3af',
                '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0',
                '#374151', '#1f2937', '#111827', '#030712',
                '#525252', '#404040', '#262626', '#171717'
              ]}
            />
          </div>
        </div>

        {/* Font */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Font
          </h4>
          <select
            value={data.styling?.font || 'Helvetica'}
            onChange={(e) => handleFontChange(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          >
            {fonts.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* Spacing */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Content Spacing
          </h4>
          <div className="space-y-3">
            {spacingPresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handleSpacingChange(preset.value)}
                className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  data.styling?.spacing === preset.value
                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Click a preset to adjust the spacing between elements
          </p>
        </div>
      </div>
    </div>
  );
}