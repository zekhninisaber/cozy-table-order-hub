
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Demo credentials - in production, use proper authentication
    if (email === 'admin@takeabowl.com' && password === 'admin123') {
      localStorage.setItem('admin-auth', 'true');
      navigate('/admin');
    } else {
      toast({
        title: 'Erreur',
        description: 'Email ou mot de passe incorrect',
        variant: 'destructive'
      });
    }
    
    setIsLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-peach-cream p-4 flex items-center justify-center">
      <div className="max-w-md mx-auto w-full">
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              Administration Take A Bowl
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Demo: admin@takeabowl.com / admin123
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@takeabowl.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
