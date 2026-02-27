import React, { useState, useEffect } from 'react';
import { X, Camera, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
}

const ScannerModal: React.FC<ScannerModalProps> = ({ isOpen, onClose, onScan }) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { items } = useApp();

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      setError(null);
    } else {
      setScanning(false);
    }
  }, [isOpen]);

  // Simulate scanning process
  useEffect(() => {
    if (!scanning || !isOpen) return;

    const timer = setTimeout(() => {
      // 80% chance to find an item, 20% fail for realism in demo
      const random = Math.random();
      if (items.length > 0) {
        // Pick a random existing item ID to return
        const randomItem = items[Math.floor(Math.random() * items.length)];
        onScan(randomItem.sku); // Return SKU
        setScanning(false);
        onClose();
      } else {
        setError("Không tìm thấy mã phù hợp.");
        setScanning(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [scanning, isOpen, items, onScan, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white z-10 bg-black/20 hover:bg-black/40 p-1 rounded-full backdrop-blur-md"
        >
          <X size={24} />
        </button>

        <div className="relative h-80 bg-black flex flex-col items-center justify-center">
          {scanning ? (
            <>
               {/* Camera Feed Simulation */}
               <div className="absolute inset-0 bg-slate-900">
                  <div className="w-full h-full opacity-30 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center"></div>
               </div>
               
               {/* Scanning Overlay UI */}
               <div className="relative z-10 w-48 h-48 border-2 border-accent rounded-lg flex items-center justify-center shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                 <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-accent -mt-1 -ml-1"></div>
                 <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-accent -mt-1 -mr-1"></div>
                 <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-accent -mb-1 -ml-1"></div>
                 <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-accent -mb-1 -mr-1"></div>
                 <div className="w-full h-0.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
               </div>
               <p className="absolute bottom-8 text-white font-medium bg-black/50 px-3 py-1 rounded-full">Đang quét mã QR...</p>
            </>
          ) : (
             <div className="text-center p-6">
                <p className="text-red-400 mb-4">{error}</p>
                <button 
                  onClick={() => setScanning(true)}
                  className="flex items-center justify-center mx-auto bg-white text-slate-900 px-4 py-2 rounded-full font-bold hover:bg-slate-200"
                >
                  <RefreshCw size={18} className="mr-2" /> Thử lại
                </button>
             </div>
          )}
        </div>

        <div className="p-6 bg-white">
           <h3 className="font-bold text-lg text-slate-800 mb-1">Quét mã sản phẩm</h3>
           <p className="text-slate-500 text-sm">Di chuyển camera đến mã QR trên sản phẩm hoặc kệ hàng để nhận diện tự động.</p>
           
           <div className="mt-4 flex gap-2">
             <button className="flex-1 bg-slate-100 hover:bg-slate-200 py-3 rounded-lg text-sm font-medium text-slate-700">
               Nhập tay
             </button>
             <button className="flex-1 bg-primary hover:bg-slate-800 py-3 rounded-lg text-sm font-medium text-white flex items-center justify-center">
               <Camera size={18} className="mr-2" /> Chụp ảnh
             </button>
           </div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-90px); opacity: 0.5; }
          50% { opacity: 1; }
          100% { transform: translateY(90px); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default ScannerModal;