import { SWRConfig } from 'swr';

// Default fetcher for SWR using the native fetch API
export const defaultFetcher = async (url: string) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.name = 'FetchError';
    throw error;
  }
  
  return response.json();
};

// Global SWR configuration options
export const swrOptions = {
  fetcher: defaultFetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 10000, // Dedupe requests with the same key in this time span (ms)
};
