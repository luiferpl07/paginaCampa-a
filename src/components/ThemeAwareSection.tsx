'use client';

import React from 'react';
import { useTheme } from '@/lib/theme-context';
import { Button } from './ui/button';
import { ThemeSwitcher } from './ThemeSwitcher';

interface ThemeAwareSectionProps {
  title?: string;
}

export function ThemeAwareSection({ title = 'Personaliza tu experiencia' }: ThemeAwareSectionProps) {
  const { theme, colors } = useTheme();

  // Get background color based on current theme
  const getBgColor = () => {
    if (theme === 'dark') return colors.secondary;
    if (theme === 'alternate') return colors.blue;
    return colors.accent;
  };

  return (
    <div className="py-10 px-4 rounded-lg mb-8 text-center">
      <div
        className="max-w-3xl mx-auto p-6 rounded-lg shadow-md"
        style={{
          backgroundColor: getBgColor(),
          color: theme === 'dark' ? '#ffffff' : '#000000'
        }}
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6">
          {theme === 'default' && 'Estás usando el tema Amarillo, el tema principal de Héctor Olimpo.'}
          {theme === 'alternate' && 'Estás usando el tema Azul, destacando el color institucional de Héctor Olimpo.'}
          {theme === 'dark' && 'Estás usando el tema Oscuro, ideal para uso nocturno o baja luminosidad.'}
        </p>

        <div className="flex justify-center">
          <div className="inline-block">
            <ThemeSwitcher variant="buttons" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div
            className="p-4 rounded shadow"
            style={{ backgroundColor: colors.background }}
          >
            <h3 className="font-bold mb-2">Color Primario</h3>
            <div
              className="h-12 w-full rounded mb-2"
              style={{ backgroundColor: colors.primary }}
            ></div>
            <p className="text-xs" style={{ color: colors.mutedForeground }}>{colors.primary}</p>
          </div>

          <div
            className="p-4 rounded shadow"
            style={{ backgroundColor: colors.background }}
          >
            <h3 className="font-bold mb-2">Color Secundario</h3>
            <div
              className="h-12 w-full rounded mb-2"
              style={{ backgroundColor: colors.secondary }}
            ></div>
            <p className="text-xs" style={{ color: colors.mutedForeground }}>{colors.secondary}</p>
          </div>

          <div
            className="p-4 rounded shadow"
            style={{ backgroundColor: colors.background }}
          >
            <h3 className="font-bold mb-2">Color Azul</h3>
            <div
              className="h-12 w-full rounded mb-2"
              style={{ backgroundColor: colors.blue }}
            ></div>
            <p className="text-xs" style={{ color: colors.mutedForeground }}>{colors.blue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
