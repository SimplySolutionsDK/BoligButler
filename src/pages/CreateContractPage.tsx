import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Save } from 'lucide-react';
import { PDFViewer } from '@react-pdf/renderer';
import { ContractForm } from '../components/contracts/ContractForm';
import { ContractPreview } from '../components/contracts/ContractPreview';

export const CreateContractPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    // Form data will be initialized based on template
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contract creation and PDF generation
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/contracts')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('contracts.back')}
        </button>

        <div className="bg-white rounded-xl shadow-sm">
          {showPreview ? (
            <div className="h-screen">
              <PDFViewer style={{ width: '100%', height: '100%' }}>
                <ContractPreview data={formData} />
              </PDFViewer>
            </div>
          ) : (
            <ContractForm
              templateId={templateId}
              onSubmit={handleSubmit}
              onPreview={() => setShowPreview(true)}
              onChange={setFormData}
              data={formData}
            />
          )}
        </div>
      </div>
    </main>
  );
};