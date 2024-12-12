import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getProperties } from '../../lib/firebase/property';

interface ContractFormProps {
  templateId?: string;
  onSubmit: (e: React.FormEvent) => void;
  onPreview: () => void;
  onChange: (data: any) => void;
  data: any;
}

export const ContractForm: React.FC<ContractFormProps> = ({
  templateId,
  onSubmit,
  onPreview,
  onChange,
  data
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [properties, setProperties] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProperties = async () => {
      if (user) {
        const { properties: userProperties } = await getProperties(user.uid, 'Landlord');
        setProperties(userProperties);
      }
      setLoading(false);
    };

    fetchProperties();
  }, [user]);

  const handleChange = (section: string, field: string, value: any) => {
    onChange({
      ...data,
      [section]: {
        ...data[section],
        [field]: value
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const handlePropertySelect = (propertyId: string) => {
    const selectedProperty = properties.find(p => p.id === propertyId);
    // Update form with property details
  };

  return (
    <form onSubmit={onSubmit} className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t('contracts.form.title')}
        </h1>
        <button
          type="button"
          onClick={onPreview}
          className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <Eye className="w-5 h-5" />
          {t('contracts.preview')}
        </button>
      </div>

      <div className="space-y-6">
        {/* 1. Parties */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">{t('contracts.form.sections.parties.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Landlord Information */}
            <div className="space-y-4">
              <h3 className="font-medium">{t('contracts.form.sections.parties.landlord.title')}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contracts.form.sections.parties.landlord.name')}
                </label>
                <input
                  type="text"
                  value={data?.parties?.landlordName || ''}
                  onChange={(e) => handleChange('parties', 'landlordName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              {/* Add other landlord fields */}
            </div>

            {/* Tenant Information */}
            <div className="space-y-4">
              <h3 className="font-medium">{t('contracts.form.sections.parties.tenant.title')}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contracts.form.sections.parties.tenant.name')}
                </label>
                <input
                  type="text"
                  value={data?.parties?.tenantName || ''}
                  onChange={(e) => handleChange('parties', 'tenantName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              {/* Add other tenant fields */}
            </div>
          </div>
        </div>

        {/* 2. Property */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">{t('contracts.form.sections.property.title')}</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('contracts.form.sections.property.select')}
              </label>
              <select
                value={data?.property?.id || ''}
                onChange={(e) => handlePropertySelect(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select a property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.address.street}, {property.address.postalCode} {property.address.city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 3. Rental Period */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">{t('contracts.form.sections.period.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('contracts.form.sections.period.startDate')}
              </label>
              <input
                type="date"
                value={data?.period?.startDate || ''}
                onChange={(e) => handleChange('period', 'startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('contracts.form.sections.period.endDate')}
              </label>
              <input
                type="date"
                value={data?.period?.endDate || ''}
                onChange={(e) => handleChange('period', 'endDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        {/* 4. Payment */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">{t('contracts.form.sections.payment.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('contracts.form.sections.payment.rent')}
              </label>
              <input
                type="number"
                value={data?.payment?.rent || ''}
                onChange={(e) => handleChange('payment', 'rent', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('contracts.form.sections.payment.dueDate')}
              </label>
              <input
                type="number"
                value={data?.payment?.dueDate || ''}
                onChange={(e) => handleChange('payment', 'dueDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
                min="1"
                max="31"
              />
            </div>
          </div>
        </div>

        {/* 5. Deposit */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">{t('contracts.form.sections.deposit.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('contracts.form.sections.deposit.amount')}
              </label>
              <input
                type="number"
                value={data?.deposit?.amount || ''}
                onChange={(e) => handleChange('deposit', 'amount', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('contracts.form.sections.deposit.prepaidRent')}
              </label>
              <input
                type="number"
                value={data?.deposit?.prepaidRent || ''}
                onChange={(e) => handleChange('deposit', 'prepaidRent', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
                min="0"
              />
            </div>
          </div>
        </div>

        {/* 6. House Rules */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">{t('contracts.form.sections.houseRules.title')}</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={data?.houseRules?.smoking || false}
                onChange={(e) => handleChange('houseRules', 'smoking', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                {t('contracts.form.sections.houseRules.smoking')}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('contracts.form.sections.houseRules.pets.title')}
              </label>
              <select
                value={data?.houseRules?.pets || ''}
                onChange={(e) => handleChange('houseRules', 'pets', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="allowed">{t('contracts.form.sections.houseRules.pets.allowed')}</option>
                <option value="notAllowed">{t('contracts.form.sections.houseRules.pets.notAllowed')}</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contracts.form.sections.houseRules.quiet.from')}
                </label>
                <input
                  type="time"
                  value={data?.houseRules?.quietFrom || ''}
                  onChange={(e) => handleChange('houseRules', 'quietFrom', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contracts.form.sections.houseRules.quiet.to')}
                </label>
                <input
                  type="time"
                  value={data?.houseRules?.quietTo || ''}
                  onChange={(e) => handleChange('houseRules', 'quietTo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* 7. Special Terms */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">{t('contracts.form.sections.specialTerms.title')}</h2>
          
          <div>
            <textarea
              value={data?.specialTerms || ''}
              onChange={(e) => handleChange('specialTerms', 'text', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={4}
              placeholder={t('contracts.form.sections.specialTerms.description')}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {t('contracts.cancel')}
        </button>
        <div>
          <button
            type="button"
            onClick={onPreview}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            {t('contracts.preview')}
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {t('contracts.generate')}
          </button>
        </div>
      </div>
    </form>
  );
};