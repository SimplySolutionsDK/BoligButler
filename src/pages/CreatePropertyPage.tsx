import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createProperty, getProperty, updateProperty } from '../lib/firebase/property';
import { Property } from '../types/property';
import { Navbar } from '../components/Navbar';
import { AddressSection } from '../components/property/AddressSection';
import { BasicDetailsSection } from '../components/property/BasicDetailsSection';
import { RentDetailsSection } from '../components/property/RentDetailsSection';
import { FacilitiesSection } from '../components/property/FacilitiesSection';
import { AdditionalDetailsSection } from '../components/property/AdditionalDetailsSection';
import { DistancesSection } from '../components/property/DistancesSection';
import { LeaseSection } from '../components/property/LeaseSection';
import { AmenitiesSection } from '../components/property/AmenitiesSection';
import { SecuritySection } from '../components/property/SecuritySection';
import { StatusSection } from '../components/property/StatusSection';
import { ImageUploadSection } from '../components/property/ImageUploadSection';
import { RenewalPolicyDialog } from '../components/RenewalPolicyDialog';

export const CreatePropertyPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(!!propertyId);
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isRenewalDialogOpen, setIsRenewalDialogOpen] = useState(false);
  const [originalImages, setOriginalImages] = useState<Array<{ url: string; path: string }>>([]);

  const [formData, setFormData] = useState<Omit<Property, 'id' | 'landlordId' | 'createdAt' | 'updatedAt'>>({
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Denmark'
    },
    details: {
      type: 'apartment',
      size: 0,
      rooms: 1,
      bathrooms: 1,
      floor: 0,
      constructionYear: new Date().getFullYear(),
      heatingCost: 0,
      heatingSolutions: [],
      energyLabel: 'C',
      distances: {
        school: 0,
        shopping: 0,
        publicTransport: {
          bus: 0,
          train: 0
        }
      },
      lease: {
        term: 12,
        renewalPolicy: ''
      },
      amenities: {
        refrigerator: false,
        washer: false,
        dryer: false,
        dishwasher: false,
        gym: false,
        pool: false,
        communityRoom: false,
        balcony: false,
        garden: false,
        parkingLot: false
      },
      security: {
        cctv: false,
        alarm: false,
        accessControl: ''
      },
      status: 'available',
      visitorPolicy: '',
      additionalFees: {}
    },
    facilities: {
      parking: false,
      elevator: false,
      furnished: false,
      petsAllowed: false,
      internetIncluded: false,
      heatingIncluded: false,
      waterIncluded: false
    },
    rent: {
      monthlyRent: 0,
      deposit: 0,
      prepaidRent: 0
    },
    tenants: [],
    images: []
  });

  useEffect(() => {
    const fetchProperty = async () => {
      if (propertyId) {
        const { property, error } = await getProperty(propertyId);
        if (property && !error) {
          // Only allow editing if user is the landlord or admin
          if (property.landlordId === user?.uid || userData?.role === 'Admin') {
            const { id, landlordId, createdAt, updatedAt, ...propertyData } = property;
            setFormData(propertyData);
            setOriginalImages(propertyData.images || []);
          } else {
            navigate('/properties');
          }
        }
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, user, userData, navigate]);

  if (!user || (userData?.role !== 'Landlord' && userData?.role !== 'Admin')) {
    navigate('/user');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const propertyData = {
      ...formData,
      landlordId: user.uid
    };

    const { error } = propertyId
      ? await updateProperty(propertyId, propertyData, originalImages)
      : await createProperty(propertyData);

    if (error) {
      setStatus({ message: t('properties.form.error'), type: 'error' });
    } else {
      setStatus({ message: t('properties.form.success'), type: 'success' });
      setTimeout(() => navigate('/properties'), 1500);
    }
  };

  const handleChange = (section: keyof typeof formData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/properties')}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('properties.form.cancel')}
          </button>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AddressSection
              address={formData.address}
              onChange={(field, value) => handleChange('address', field, value)}
            />

            <BasicDetailsSection
              details={formData.details}
              onChange={(field, value) => handleChange('details', field, value)}
            />
            <ImageUploadSection
              propertyId={propertyId}
              images={formData.images}
              formData={formData}
              userId={user?.uid}
              onChange={(images) => setFormData(prev => ({ ...prev, images }))}
            />
            <AdditionalDetailsSection
              details={{
                bathrooms: formData.details.bathrooms,
                floor: formData.details.floor,
                constructionYear: formData.details.constructionYear,
                heatingCost: formData.details.heatingCost,
                heatingSolutions: formData.details.heatingSolutions,
                energyLabel: formData.details.energyLabel
              }}
              onChange={(field, value) => handleChange('details', field, value)}
            />

            <DistancesSection
              distances={formData.details.distances}
              onChange={(value) => handleChange('details', 'distances', value)}
            />

            <LeaseSection
              lease={formData.details.lease}
              onChange={(value) => handleChange('details', 'lease', value)}
              onOpenRenewalDialog={() => setIsRenewalDialogOpen(true)}
            />

            <AmenitiesSection
              amenities={formData.details.amenities}
              onChange={(value) => handleChange('details', 'amenities', value)}
            />

            <SecuritySection
              security={formData.details.security}
              onChange={(value) => handleChange('details', 'security', value)}
            />

            <StatusSection
              status={formData.details.status}
              visitorPolicy={formData.details.visitorPolicy}
              onChange={(field, value) => handleChange('details', field, value)}
            />

            <FacilitiesSection
              facilities={formData.facilities}
              onChange={(field, value) => handleChange('facilities', field, value)}
            />

            <RentDetailsSection
              rent={formData.rent}
              onChange={(field, value) => handleChange('rent', field, value)}
            />

            {status && (
              <p className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {status.message}
              </p>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                {t('properties.form.cancel')}
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center shadow-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                {t('properties.form.save')}
              </button>
            </div>
          </form>

          <RenewalPolicyDialog
            isOpen={isRenewalDialogOpen}
            onClose={() => setIsRenewalDialogOpen(false)}
            onSave={(policy) => {
              handleChange('details', 'lease', {
                ...formData.details.lease,
                renewalPolicy: policy
              });
            }}
            initialPolicy={formData.details.lease.renewalPolicy}
          />
        </div>
      </main>
    </div>
  );
};