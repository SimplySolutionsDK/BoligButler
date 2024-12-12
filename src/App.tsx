import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { UserPage } from './pages/UserPage';
import { EditProfilePage } from './pages/EditProfilePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { CreatePropertyPage } from './pages/CreatePropertyPage';
import { ContractsPage } from './pages/ContractsPage';
import { CreateContractPage } from './pages/CreateContractPage';
import { AuthProvider } from './contexts/AuthContext';
import { Sidebar } from './components/Sidebar';
import './i18n/config';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/user/edit" element={<EditProfilePage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/create" element={<CreatePropertyPage />} />
              <Route path="/properties/:propertyId" element={<PropertyDetailsPage />} />
              <Route path="/properties/:propertyId/edit" element={<CreatePropertyPage />} />
              <Route path="/contracts" element={<ContractsPage />} />
              <Route path="/contracts/create/:templateId" element={<CreateContractPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
