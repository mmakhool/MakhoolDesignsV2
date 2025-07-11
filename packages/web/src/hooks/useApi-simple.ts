import { useState } from 'react';
import { contactApi } from '../services/api-simple';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Contact Form Hook
export const useSubmitContact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = async (data: ContactFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await contactApi.submitContact(data);
      setIsLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  return {
    submitContact,
    isLoading,
    error,
  };
};

// Simple toast hook
export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const prefix = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    console.log(`${prefix} ${message}`);
    
    // You can integrate with toast libraries later
    // For now, we'll just use console.log
  };
  
  return { showToast };
};
