import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Building2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getProperties } from '../lib/firebase/property';
import { Property } from '../types/property';
import { Navbar } from '../components/Navbar';

export const PropertiesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      if (user && (userData?.role === 'Landlord' || userData?.role === 'Admin')) {
        const { properties, error } = await getProperties(user.uid, userData.role);
        if (!error) {
          setProperties(properties);
        }
      }
      setLoading(false);
    };

    fetchProperties();
  }, [user, userData]);

  if (!user || (userData?.role !== 'Landlord' && userData?.role !== 'Admin')) {
    navigate('/user');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              {t('properties.title')}
              {userData?.role === 'Admin' && (
                <span className="ml-2 text-sm text-gray-500 font-normal">
                  (Viewing all properties as Admin)
                </span>
              )}
            </h1>
            <button
              onClick={() => navigate('/properties/create')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              {t('properties.createNew')}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4" />
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">{t('properties.noProperties')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="relative group rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden h-64"
                  onClick={() => navigate(`/properties/${property.id}`)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    {property.images && property.images[0] ? (
                      <img
                        src={property.images[0].url}
                        alt={property.address.street}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                        <Building2 className="w-12 h-12 text-primary-300" />
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-end text-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl mb-1">
                          {property.address.street}
                        </h3>
                        <p className="text-gray-200">
                          {property.address.postalCode} {property.address.city}
                        </p>
                        {userData?.role === 'Admin' && property.landlordEmail && (
                          <p className="text-sm text-gray-300 mt-1">
                            Landlord: {property.landlordEmail.length > 15 
                              ? `${property.landlordEmail.substring(0, 15)}...` 
                              : property.landlordEmail}
                          </p>
                        )}
                      </div>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm">
                        {t(`properties.form.details.types.${property.details.type}`)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-200">
                        {property.details.size} m² • {property.details.rooms} {t('properties.form.details.rooms')}
                      </p>
                      <p className="text-xl font-medium">
                        {property.rent.monthlyRent.toLocaleString()} DKK/md
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};