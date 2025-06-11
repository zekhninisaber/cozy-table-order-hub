
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { getTableFromUrl } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export function SplashPage() {
  const navigate = useNavigate();
  const { setTableNumber } = useAppStore();
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Extract table number from URL
    const table = getTableFromUrl();
    if (table) {
      setTableNumber(table);
    }
    
    // Update progress bar every 40ms for smooth animation (4000ms / 100 steps)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2.5; // 2.5% every 40ms = 100% in 4000ms
        return next >= 100 ? 100 : next;
      });
    }, 40);
    
    // Redirect after 4 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 4000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
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
        <h1 className="text-4xl font-display font-bold text-peach-cream mb-8">
          Take A Bowl
        </h1>
        
        {/* Loading bar */}
        <div className="w-64 mx-auto">
          <Progress value={progress} className="h-2 bg-peach-cream/20" />
        </div>
      </div>
    </div>
  );
}
