import React from 'react';
import { useTheme, ThemeName } from '@/lib/theme-context';
import { Button } from './ui/button';
import { Menu, Moon, Sun, Palette } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function ThemeSwitcher({ variant = 'dropdown' }: { variant?: 'dropdown' | 'buttons' | 'sheet' }) {
  const { theme, setTheme } = useTheme();

  // Theme options with labels and icons
  const themeOptions: { value: ThemeName; label: string; icon: React.ReactNode }[] = [
    { value: 'default', label: 'Amarillo', icon: <Palette className="h-4 w-4 mr-2" /> },
    { value: 'alternate', label: 'Azul', icon: <Palette className="h-4 w-4 mr-2" /> },
    { value: 'dark', label: 'Oscuro', icon: <Moon className="h-4 w-4 mr-2" /> },
  ];

  // Dropdown version
  if (variant === 'dropdown') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {theme === 'dark' ? (
              <Moon className="h-5 w-5" />
            ) : theme === 'alternate' ? (
              <Palette className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {themeOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={theme === option.value ? 'bg-accent text-accent-foreground' : ''}
            >
              <div className="flex items-center">
                {option.icon}
                {option.label}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Buttons version
  if (variant === 'buttons') {
    return (
      <div className="flex space-x-2">
        {themeOptions.map((option) => (
          <Button
            key={option.value}
            variant={theme === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTheme(option.value)}
            className="flex items-center"
          >
            {option.icon}
            <span className="sr-only md:not-sr-only">{option.label}</span>
          </Button>
        ))}
      </div>
    );
  }

  // Sheet version (for mobile)
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="py-4">
          <h3 className="text-lg font-medium mb-4">Seleccionar tema</h3>
          <div className="grid gap-2">
            {themeOptions.map((option) => (
              <Button
                key={option.value}
                variant={theme === option.value ? 'default' : 'outline'}
                onClick={() => setTheme(option.value)}
                className="justify-start"
              >
                {option.icon}
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
