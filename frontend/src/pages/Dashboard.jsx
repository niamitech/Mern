import LeadImportExport from '@/components/LeadImportExport';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lead Management</h1>
      <LeadImportExport />
      {/* Other dashboard components... */}
    </div>
  );
}
