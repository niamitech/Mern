import React, { useRef } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Upload, Download } from 'lucide-react';

const LeadImportExport = () => {
  const fileInputRef = useRef();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/leads/import', formData);
      alert(`✅ ${res.data.count} leads imported successfully!`);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to import leads.');
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get('/api/leads/export', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leads.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to export leads.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start p-4 border rounded-xl shadow bg-white">
      <div>
        <input
          type="file"
          accept=".xlsx"
          ref={fileInputRef}
          onChange={handleFileUpload}
          hidden
        />
        <Button onClick={() => fileInputRef.current.click()} className="flex gap-2">
          <Upload size={18} /> Import Excel
        </Button>
      </div>
      <div>
        <Button onClick={handleExport} variant="secondary" className="flex gap-2">
          <Download size={18} /> Export Excel
        </Button>
      </div>
    </div>
  );
};

export default LeadImportExport;
