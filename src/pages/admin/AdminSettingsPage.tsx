
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountsSettings } from '@/components/admin/settings/AccountsSettings';
import { ScheduleSettings } from '@/components/admin/settings/ScheduleSettings';
import { PrinterSettings } from '@/components/admin/settings/PrinterSettings';
import { ReportsSettings } from '@/components/admin/settings/ReportsSettings';

export function AdminSettingsPage() {
  // Mock user role - in real app this would come from auth context
  const userRole = 'admin'; // or 'staff'

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">
          Paramètres
        </h1>
        
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="accounts">Comptes</TabsTrigger>
            <TabsTrigger value="schedule">Horaires</TabsTrigger>
            <TabsTrigger value="printer">Imprimante</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="mt-6">
            <AccountsSettings />
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-6">
            <ScheduleSettings />
          </TabsContent>
          
          <TabsContent value="printer" className="mt-6">
            <PrinterSettings />
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <ReportsSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
