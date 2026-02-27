
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useApp } from '../context/AppContext';
import { RefreshCw, Menu, AlertTriangle, ExternalLink } from 'lucide-react';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isRefreshing, appSettings, isLoading, connectionError } = useApp();

  const appInitials = appSettings.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  if (connectionError) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-red-100 p-8 max-w-lg w-full text-center space-y-6 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border-4 border-red-100">
             <AlertTriangle size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800">Lỗi kết nối hệ thống</h2>
            <p className="text-slate-500 text-sm leading-relaxed">{connectionError}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cách khắc phục:</p>
             <ul className="text-xs text-slate-600 space-y-2 font-medium">
                <li className="flex items-start gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                   Kiểm tra và dán API Key thực tế vào file <code>lib/firebase.ts</code>.
                </li>
                <li className="flex items-start gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                   Đảm bảo Cloud Firestore API đã được bật trong Google Cloud Console.
                </li>
             </ul>
          </div>
          <div className="flex flex-col gap-2">
            <a 
              href="https://console.firebase.google.com/" 
              target="_blank" 
              className="w-full py-3 bg-primary text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2"
            >
              Mở Firebase Console <ExternalLink size={14} />
            </a>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition"
            >
              Thử tải lại trang
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="lg:hidden h-16 bg-primary text-white flex items-center justify-between px-4 shrink-0 shadow-md z-20">
          <div className="flex items-center gap-3">
             {appSettings.logo ? (
               <img src={appSettings.logo} alt="Logo" className="w-8 h-8 object-contain rounded" />
             ) : (
               <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-[10px] font-bold">
                 {appInitials || 'KV'}
               </div>
             )}
             <span className="font-bold tracking-tight truncate max-w-[150px]">{appSettings.name}</span>
          </div>
          
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8 pb-24 lg:pb-8">
           {isLoading || isRefreshing ? (
             <div className="h-full w-full flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm animate-in fade-in duration-300">
                <RefreshCw size={48} className="text-accent animate-spin mb-4" />
                <h3 className="text-xl font-bold text-slate-800">
                   {isLoading ? "Đang kết nối Cloud Firestore..." : "Đang đồng bộ dữ liệu..."}
                </h3>
                <p className="text-slate-500 font-medium">Hệ thống đang thiết lập môi trường vận hành an toàn.</p>
             </div>
           ) : (
             <div className="max-w-7xl mx-auto w-full">
                <Outlet />
             </div>
           )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
