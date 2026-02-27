
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Operations from './pages/Operations';
import Settings from './pages/Settings';
import RequestWorkflow from './pages/RequestWorkflow';
import Audit from './pages/Audit';
import Reports from './pages/Reports';
import { AppProvider } from './context/AppContext';

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-slate-400">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p>Chức năng đang được phát triển.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="requests" element={<RequestWorkflow />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="operations" element={<Operations />} />
            <Route path="audit" element={<Audit />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Navigate to="/settings" replace />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
