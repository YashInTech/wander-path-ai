import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import './index.css';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/custom/header.jsx';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Lazy load heavy components
const CreateTrip = lazy(() => import('./create-trip/index.jsx'));
const ViewTrip = lazy(() => import('./view-trip/[tripId]/index.jsx'));
const MyTrips = lazy(() => import('./my-trips/index.jsx'));

// Optimized loading component
const LoadingSpinner = () => (
  <div className='flex items-center justify-center min-h-screen'>
    <div className='animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent'></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <CreateTrip />
      </Suspense>
    ),
  },
  {
    path: '/view-trip/:tripId',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ViewTrip />
      </Suspense>
    ),
  },
  {
    path: '/my-trips',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MyTrips />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
    <Header />
    <Toaster />
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
