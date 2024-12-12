import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Building2, Calendar, Home, Users, Edit2, Ruler, Bath, Thermometer, Shield, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getProperty } from '../lib/firebase/property';
import { Property } from '../types/property';
import { Navbar } from '../components/Navbar';

export const PropertyDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const { user, userData } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) return;
      const { property, error } = await getProperty(propertyId);
      if (property) {
        // Only allow access to property owner or admin
        if (property.landlordId === user?.uid || userData?.role === 'Admin') {
          setProperty(property);
        } else {
          navigate('/properties');
        }
      }
      setLoading(false);
    };

    fetchProperty();
  }, [propertyId, user, userData, navigate]);

  if (!user || (userData?.role !== 'Landlord' && userData?.role !== 'Admin')) {
    navigate('/user');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 pt-24">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full" />
          </div>
        </main>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 pt-24">
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Property not found</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/properties')}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('properties.form.cancel')}
          </button>

          <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  {property.address.street}
                </h1>
                <p className="text-gray-600">
                  {property.address.postalCode} {property.address.city}
                </p>
                {(property.landlordId === user?.uid || userData?.role === 'Admin') && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/properties/${property.id}/edit`);
                    }}
                    className="mt-4 flex items-center gap-2 px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>{t('properties.edit')}</span>
                  </button>
                )}
              </div>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                {t(`properties.form.details.types.${property.details.type}`)}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-500">{t('properties.form.details.size')}</p>
                  <p className="font-medium">{property.details.size} m²</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-500">{t('properties.form.details.rooms')}</p>
                  <p className="font-medium">{property.details.rooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-500">{t('properties.form.details.constructionYear')}</p>
                  <p className="font-medium">{property.details.constructionYear || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">{t('properties.form.details.title')}</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">{t('properties.form.details.size')}</p>
                    <p className="font-medium">{property.details.size} m²</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bath className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">{t('properties.form.details.bathrooms')}</p>
                    <p className="font-medium">{property.details.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Thermometer className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">{t('properties.form.details.heatingCost')}</p>
                    <p className="font-medium">{property.details.heatingCost} DKK</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('properties.form.details.heatingSolutions')}</p>
                  <div className="space-y-1">
                    {property.details.heatingSolutions.map((solution) => (
                      <p key={solution} className="text-gray-700">
                        {t(`properties.form.details.heatingSolutions.${solution}`)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Distances */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">{t('properties.form.details.distances.title')}</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">{t('properties.form.details.distances.school')}</p>
                    <p className="font-medium">{property.details.distances.school} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">{t('properties.form.details.distances.shopping')}</p>
                    <p className="font-medium">{property.details.distances.shopping} km</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">{t('properties.form.details.distances.publicTransport.title')}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">{t('properties.form.details.distances.publicTransport.bus')}</p>
                      <p className="font-medium">{property.details.distances.publicTransport.bus} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('properties.form.details.distances.publicTransport.train')}</p>
                      <p className="font-medium">{property.details.distances.publicTransport.train} km</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">{t('properties.form.details.amenities.title')}</h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(property.details.amenities).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={value}
                      readOnly
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">
                      {t(`properties.form.details.amenities.${key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">{t('properties.form.details.security.title')}</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {['cctv', 'alarm'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={property.details.security[item as 'cctv' | 'alarm']}
                        readOnly
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">
                        {t(`properties.form.details.security.${item}`)}
                      </span>
                    </div>
                  ))}
                </div>
                {property.details.security.accessControl && (
                  <div>
                    <p className="text-sm text-gray-500">{t('properties.form.details.security.accessControl')}</p>
                    <p className="font-medium">{property.details.security.accessControl}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">{t('properties.form.facilities.title')}</h2>
              <div className="space-y-3">
                {Object.entries(property.facilities).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      readOnly
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-gray-700">
                      {t(`properties.form.facilities.${key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rent Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">{t('properties.form.rent.title')}</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">{t('properties.form.rent.monthlyRent')}</p>
                  <p className="text-xl font-semibold">{property.rent.monthlyRent.toLocaleString()} DKK</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('properties.form.rent.deposit')}</p>
                  <p className="font-medium">{property.rent.deposit.toLocaleString()} DKK</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('properties.form.rent.prepaidRent')}</p>
                  <p className="font-medium">{property.rent.prepaidRent.toLocaleString()} DKK</p>
                </div>
              </div>
            </div>

            {/* Images */}
            {property.images && property.images.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
                <h2 className="text-lg font-semibold mb-4">{t('properties.form.images.title')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {property.images.map((image, index) => (
                    <div key={image.path} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={image.url}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};