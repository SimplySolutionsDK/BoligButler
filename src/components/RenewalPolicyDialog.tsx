import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

interface RenewalPolicyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (policy: string) => void;
  initialPolicy?: string;
}

interface PolicyForm {
  noticeRequired: number;
  maxRentIncrease: number;
  autoRenewal: boolean;
  renewalTerm: number;
  conditions: string[];
  specialTerms: string;
}

export const RenewalPolicyDialog: React.FC<RenewalPolicyDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPolicy
}) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<PolicyForm>({
    noticeRequired: 90,
    maxRentIncrease: 4,
    autoRenewal: true,
    renewalTerm: 12,
    conditions: [],
    specialTerms: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const policy = `
Renewal Terms:
- Notice Required: ${form.noticeRequired} days
- Maximum Rent Increase: ${form.maxRentIncrease}%
- Auto Renewal: ${form.autoRenewal ? 'Yes' : 'No'}
- Renewal Term: ${form.renewalTerm} months
${form.conditions.length > 0 ? `\nConditions for Renewal:\n${form.conditions.map(c => `- ${c}`).join('\n')}` : ''}
${form.specialTerms ? `\nSpecial Terms:\n${form.specialTerms}` : ''}
    `.trim();

    onSave(policy);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Create Renewal Policy</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notice Required (days)
              </label>
              <input
                type="number"
                value={form.noticeRequired}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  noticeRequired: Number(e.target.value)
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="30"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Rent Increase (%)
              </label>
              <input
                type="number"
                value={form.maxRentIncrease}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  maxRentIncrease: Number(e.target.value)
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="0"
                step="0.1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Renewal Term (months)
              </label>
              <input
                type="number"
                value={form.renewalTerm}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  renewalTerm: Number(e.target.value)
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="1"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={form.autoRenewal}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    autoRenewal: e.target.checked
                  }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Automatic Renewal</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conditions for Renewal
            </label>
            <div className="space-y-2">
              {[
                'No outstanding rent or fees',
                'Compliance with all lease terms',
                'Positive maintenance record',
                'No noise complaints',
                'No unauthorized occupants'
              ].map((condition) => (
                <label key={condition} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={form.conditions.includes(condition)}
                    onChange={(e) => {
                      setForm(prev => ({
                        ...prev,
                        conditions: e.target.checked
                          ? [...prev.conditions, condition]
                          : prev.conditions.filter(c => c !== condition)
                      }));
                    }}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">{condition}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Terms
            </label>
            <textarea
              value={form.specialTerms}
              onChange={(e) => setForm(prev => ({
                ...prev,
                specialTerms: e.target.value
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={4}
              placeholder="Enter any special terms or conditions..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Save Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};