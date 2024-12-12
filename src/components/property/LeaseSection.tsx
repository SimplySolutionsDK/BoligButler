import React from 'react';
import { useTranslation } from 'react-i18next';

interface LeaseSectionProps {
  lease: {
    term: number;
    renewalPolicy: string;
  };
  onChange: (value: typeof LeaseSectionProps['lease']) => void;
  onOpenRenewalDialog: () => void;
}

export const LeaseSection: React.FC<LeaseSectionProps> = ({ lease, onChange, onOpenRenewalDialog }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{t('properties.form.details.lease.title')}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.details.lease.term')}
          </label>
          <input
            type="number"
            value={lease.term}
            onChange={(e) => onChange({
              ...lease,
              term: Number(e.target.value)
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.details.lease.renewalPolicy')}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={lease.renewalPolicy}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Click 'Create Policy' to set renewal terms"
            />
            <button
              type="button"
              onClick={onOpenRenewalDialog}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
            >
              Create Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};