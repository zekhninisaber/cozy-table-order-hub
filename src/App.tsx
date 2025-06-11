
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { checkOpeningHours } from '@/lib/utils';

// Pages
import { SplashPage } from '@/pages/SplashPage';
import { HomePage } from '@/pages/HomePage';
import { MenuPage } from '@/pages/MenuPage';
import { CategoryPage } from '@/pages/CategoryPage';
import { BasketPage } from '@/pages/BasketPage';
import { SummaryPage } from '@/pages/SummaryPage';
import { OrderCompletePage } from '@/pages/OrderCompletePage';
import { ClosedPage } from '@/pages/ClosedPage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminMenuPage } from '@/pages/admin/AdminMenuPage';

const queryClient = new QueryClient();

function App() {
  const isOpen = checkOpeningHours();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            {/* Always accessible routes */}
            <Route path="/splash" element={<SplashPage />} />
            <Route path="/closed" element={<ClosedPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            
            {/* Opening hours protected routes */}
            {isOpen ? (
              <>
                <Route path="/" element={<Navigate to="/splash" replace />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/basket" element={<BasketPage />} />
                <Route path="/summary" element={<SummaryPage />} />
                <Route path="/order-complete" element={<OrderCompletePage />} />
                <Route path="/admin/menu" element={<AdminMenuPage />} />
              </>
            ) : (
              <>
                <Route path="*" element={<Navigate to="/closed" replace />} />
              </>
            )}
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
