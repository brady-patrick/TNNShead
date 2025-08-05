'use client';

import { useState, useRef, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import * as Alerts from "@/components/application/alerts";

export default function SettingsPage() {
  const { playerProfile, updatePlayerProfile } = useUser();
  const [formData, setFormData] = useState(playerProfile);
  const [avatarImage, setAvatarImage] = useState(playerProfile.avatarImage || "");
  const [headerImage, setHeaderImage] = useState(playerProfile.headerImage || "");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const headerFileInputRef = useRef<HTMLInputElement>(null);

  // Update form data when playerProfile changes
  useEffect(() => {
    setFormData(playerProfile);
    setAvatarImage(playerProfile.avatarImage || "");
    setHeaderImage(playerProfile.headerImage || "");
  }, [playerProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setAvatarImage(imageUrl);
        setFormData(prev => ({
          ...prev,
          avatarImage: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeaderImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setHeaderImage(imageUrl);
        setFormData(prev => ({
          ...prev,
          headerImage: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAvatarUpload = () => {
    avatarFileInputRef.current?.click();
  };

  const triggerHeaderUpload = () => {
    headerFileInputRef.current?.click();
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use a reverse geocoding service to get city and state
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch location data');
          }

          const data = await response.json();
          const address = data.address;
          
          // Extract city and state
          const city = address.city || address.town || address.village || address.county || 'Unknown City';
          const state = address.state || 'Unknown State';
          
          const locationString = `${city}, ${state}`;
          
          setFormData(prev => ({
            ...prev,
            location: locationString
          }));
        } catch (error) {
          console.error('Error getting location:', error);
          alert('Unable to get your current location. Please enter it manually.');
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to get your current location.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access was denied. Please enable location services and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        alert(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlayerProfile(formData);
    console.log("Profile updated:", formData);
    
    // Show success banner
    setShowSuccessBanner(true);
    
    // Auto-hide banner after 5 seconds
    setTimeout(() => {
      setShowSuccessBanner(false);
    }, 5000);
  };

  const quickActions = [
    { label: '📊 Export Data', action: 'export' },
    { label: '🔒 Privacy Policy', action: 'privacy' },
    { label: '📋 Terms of Service', action: 'terms' },
    { label: '❓ Help & Support', action: 'help' }
  ];

  return (
    <div className="py-8 px-6 lg:px-8">
      {/* Success Banner - Fixed over main content only */}
      {showSuccessBanner && (
        <div className="fixed top-[60px] left-64 right-0 z-50 p-[60px]">
          <div className="max-w-7xl mx-auto">
            <Alerts.AlertFullWidth
              color="success"
              title="Successfully updated profile"
              description={
                <>
                  Your profile information has been saved successfully.{" "}
                  <a href="#" className="underline-offset-3">
                    View changes
                  </a>
                  .
                </>
              }
              confirmLabel="View changes"
              onClose={() => setShowSuccessBanner(false)}
            />
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h3>
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {/* Profile Images */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Profile Images</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Avatar Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={avatarImage || "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"}
                            alt="Avatar"
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={triggerAvatarUpload}
                            className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-1 hover:bg-indigo-700 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={triggerAvatarUpload}
                            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                          >
                            Change Photo
                          </button>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                        </div>
                      </div>
                      <input
                        ref={avatarFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarImageUpload}
                        className="hidden"
                      />
                    </div>

                    {/* Header Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cover Photo</label>
                      <div className="space-y-2">
                        <div 
                          className="w-full h-24 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 relative cursor-pointer overflow-hidden"
                          onClick={triggerHeaderUpload}
                          style={{
                            backgroundImage: headerImage ? `url(${headerImage})` : undefined,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          {!headerImage && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                              <span className="text-white text-sm font-medium">Click to upload cover photo</span>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={triggerHeaderUpload}
                          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Change Cover Photo
                        </button>
                        <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 5MB.</p>
                      </div>
                      <input
                        ref={headerFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleHeaderImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Personal Information</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="City, State"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={getCurrentLocation}
                          disabled={isGettingLocation}
                          className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGettingLocation ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                          {isGettingLocation ? 'Getting Location...' : 'Use Current'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Tell us about yourself..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates about events and sessions</p>
                  </div>
                  <button className="bg-indigo-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" role="switch" aria-checked="true">
                    <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Get text messages for urgent updates</p>
                  </div>
                  <button className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" role="switch" aria-checked="false">
                    <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive push notifications in the app</p>
                  </div>
                  <button className="bg-indigo-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" role="switch" aria-checked="true">
                    <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy & Security</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="pt-4">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Plan</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">Pro</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Next Billing</span>
                  <span className="text-sm font-medium text-gray-900">March 15, 2024</span>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-red-900 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 