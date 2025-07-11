import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contactApi, projectsApi, reviewsApi } from '../services/api';
import { type ContactFormData } from '@makhool-designs/shared';

// Contact Form Hook
export const useSubmitContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ContactFormData) => contactApi.submitContact(data),
    onSuccess: () => {
      // Invalidate and refetch any contact-related queries if needed
      queryClient.invalidateQueries({ queryKey: ['contact'] });
    },
    onError: (error: Error) => {
      console.error('Failed to submit contact form:', error);
    },
  });
};

// Projects Hooks
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsApi.getProject(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Reviews Hook
export const useReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: reviewsApi.getReviews,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Custom hook for handling API errors
export const useApiError = () => {
  const handleError = (error: Error) => {
    let message = 'An unexpected error occurred';
    
    if ('response' in error && error.response && typeof error.response === 'object') {
      const response = error.response as { data?: { message?: string } };
      if (response.data?.message) {
        message = response.data.message;
      }
    } else if (error.message) {
      message = error.message;
    }
    
    return message;
  };
  
  return { handleError };
};

// Custom hook for toast notifications (can be extended with a toast library)
export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    // For now, using console.log - can be replaced with a proper toast library
    const prefix = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    console.log(`${prefix} ${message}`);
    
    // You can integrate with libraries like react-hot-toast, react-toastify, etc.
    // toast[type](message);
  };
  
  return { showToast };
};
