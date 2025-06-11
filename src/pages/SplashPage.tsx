
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { getTableFromUrl } from '@/lib/utils';

export function SplashPage() {
  const navigate = useNavigate();
  const { setTableNumber } = useAppStore();
  
  useEffect(() => {
    // Extract table number from URL
    const table = getTableFromUrl();
    if (table) {
      setTableNumber(table);
    }
    
    // Redirect after 4 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [navigate, setTableNumber]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          {/* Logo placeholder - replace with actual logo */}
          <div className="w-32 h-32 mx-auto bg-peach-cream rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-4xl font-display font-bold text-primary">TAB</span>
          </div>
        </div>
        <h1 className="text-4xl font-display font-bold text-peach-cream mb-2">
          Take A Bowl
        </h1>
        <p className="text-peach-cream/80 text-lg">
          Restaurant Japonais
        </p>
      </div>
    </div>
  );
}
