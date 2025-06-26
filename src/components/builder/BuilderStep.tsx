
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface BuilderStepProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function BuilderStep({ title, subtitle, children, className = '' }: BuilderStepProps) {
  return (
    <Card className={`shadow-md border-0 mb-4 ${className}`}>
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-serif font-semibold text-secondary">{title}</h3>
          {subtitle && (
            <p className="text-sm text-accent opacity-70">{subtitle}</p>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
