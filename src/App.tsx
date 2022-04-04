import './app.css';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ConfigContextProvider } from './global/contexts/ConfigContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/utility/ProtectedRoute';
import Loading from './components/utility/Loading';
import Redirect from './components/utility/Redirect';
import { AuthContextProvider } from './global/contexts/AuthContext';
import { ColorModeContextProvider } from './global/contexts/ColorModeContext';
import { GlobalContextProvider } from './global/contexts/GlobalContext';
const Login = React.lazy(() => import('./components/login/Login'));
const NotFound = React.lazy(() => import('./components/error/NotFound'));
const UnAuthorized = React.lazy(() => import('./components/error/UnAuthorized'));
const PartyLayout = React.lazy(() => import('./components/party/ui/PartyLayout'));
const PartyForm = React.lazy(() => import('./components/party/ui/components/PartyForm'));
const Dashboard = React.lazy(() => import('./components/dashboard/ui/Dashboard'));

function App() {
  return (
    <ColorModeContextProvider>
      <ConfigContextProvider>
        <GlobalContextProvider>
          <AuthContextProvider>
            <Routes>
              <Route path="/login" element={<Suspense fallback={<Loading />}><Login /></Suspense>} />
              <Route path="/unauthorise" element={<Suspense fallback={<Loading />}><UnAuthorized /></Suspense>} />
              <Route element={<Layout />}>
                <Route element={<Suspense fallback={<Loading />}><ProtectedRoute allowedRoles={["admin", "sales", "guest"]} /></Suspense>}>
                  <Route path="/" element={<Redirect pathname="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/parties" element={<PartyLayout />} />
                  <Route path="/parties/create" element={<PartyForm isEdit={false} />} />
                  <Route path="/parties/update/:id" element={<PartyForm isEdit={true} />} />
                </Route>
              </Route>
              <Route path="*" element={<Suspense fallback={<Loading />}><NotFound /></Suspense>} />
            </Routes>
          </AuthContextProvider>
        </GlobalContextProvider>
      </ConfigContextProvider>
    </ColorModeContextProvider>
  );
}

export default App;
