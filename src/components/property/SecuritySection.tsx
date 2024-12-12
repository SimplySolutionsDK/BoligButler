import React from 'react';
import { useTranslation } from 'react-i18next';

interface SecuritySectionProps {
  security: {
    cctv: boolean;
    alarm: boolean;
    accessControl: string;
  };
  onChange: (value: typeof SecuritySectionProps['security']) => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({ security, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{t('properties.form.details.security.title')}</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {['cctv', 'alarm'].map((item) => (
            <label key={item} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={security[item as 'cctv' | 'alarm']}
                onChange={(e) => onChange({
                  ...security,
                  [item]: e.target.checked
                })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">
                {t(`properties.form.details.security.${item}`)}
              </span>
            </label>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.details.security.accessControl')}
          </label>
          <input
            type="text"
            value={security.accessControl}
            onChange={(e) => onChange({
              ...security,
              accessControl: e.target.value
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  );
};