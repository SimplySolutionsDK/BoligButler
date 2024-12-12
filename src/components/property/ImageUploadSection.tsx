import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadPropertyImage, deletePropertyImage } from '../../lib/firebase/storage';
import { createProperty } from '../../lib/firebase/property';

interface ImageUploadSectionProps {
  propertyId?: string;
  images: Array<{ url: string; path: string }>;
  onChange: (images: Array<{ url: string; path: string }>) => void;
  formData?: any;
  userId?: string;
}

export const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  propertyId,
  images,
  onChange,
  formData,
  userId
}) => {
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !userId) return;
    
    setUploading(true);
    setError(null);

    try {
      const file = e.target.files[0];
      
      // If no propertyId exists, create the property first
      let targetPropertyId = propertyId;
      if (!propertyId && formData) {
        const { property, error: createError } = await createProperty({
          ...formData,
          landlordId: userId,
          images: []
        });
        if (createError) throw createError;
        targetPropertyId = property?.id;
      }
      
      if (!targetPropertyId) {
        throw new Error('Failed to create property');
      }
      
      const { url, path, error } = await uploadPropertyImage(file, targetPropertyId);
      
      if (error) throw error;
      if (url && path) {
        onChange([...images, { url, path }]);
      }
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (index: number) => {
    const image = images[index];
    // Just update the images array - actual deletion will happen on save
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{t('properties.form.images.title')}</h2>
        <div className="relative">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id="image-upload"
            disabled={uploading || !userId}
          />
          <label
            htmlFor="image-upload"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              uploading || !userId
                ? 'bg-gray-100 text-gray-400'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? t('properties.form.images.uploading') : t('properties.form.images.upload')}</span>
          </label>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={image.path} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={image.url}
                alt={`Property ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            {userId && (
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        {images.length === 0 && (
          <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
            <ImageIcon className="w-8 h-8 mb-2" />
            <p className="text-sm text-center">
              {t('properties.form.images.empty')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};