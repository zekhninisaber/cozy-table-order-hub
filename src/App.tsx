
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import AuthGuard from '@/components/AuthGuard';
import { AdminLayout } from '@/layouts/AdminLayout';

// Pages
import { SplashPage } from '@/pages/SplashPage';
import { HomePage } from '@/pages/HomePage';
import { MenuPage } from '@/pages/MenuPage';
import { CategoryPage } from '@/pages/CategoryPage';
import { BasketPage } from '@/pages/BasketPage';
import { SummaryPage } from '@/pages/SummaryPage';
import { OrderCompletePage } from '@/pages/OrderCompletePage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminMenuPage } from '@/pages/admin/AdminMenuPage';
import { AdminBuilderPage } from '@/pages/admin/AdminBuilderPage';
import { AdminBuilderStepPage } from '@/pages/admin/AdminBuilderStepPage';
import { AdminLiveOrdersPage } from '@/pages/admin/AdminLiveOrdersPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';
import PokeBuilderPage from '@/pages/PokeBuilderPage';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Routes>
            {/* Always accessible routes */}
            <Route path="/splash" element={<SplashPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            
            {/* Admin routes with authentication and layout */}
            <Route path="/admin" element={
              <AuthGuard>
                <AdminLayout />
              </AuthGuard>
            }>
              <Route index element={<Navigate to="menu" replace />} />
              <Route path="menu" element={<AdminMenuPage />} />
              <Route path="builder" element={<AdminBuilderPage />} />
              <Route path="builder/step/:id" element={<AdminBuilderStepPage />} />
              <Route path="live-orders" element={<AdminLiveOrdersPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
            
            {/* Customer routes - now always accessible */}
            <Route path="/" element={<Navigate to="/splash" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/poke-builder" element={<PokeBuilderPage />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/order-complete" element={<OrderCompletePage />} />
            
            {/* 404 for all other routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
