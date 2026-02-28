
import React, { useState, useEffect } from 'react';
import { X, User as UserIcon, Mail, Phone, Shield, Building, Save } from 'lucide-react';
import { Role, User, Warehouse } from '../types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  userToEdit?: User | null;
  warehouses: Warehouse[];
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, userToEdit, warehouses }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    phone: '',
    role: Role.EMPLOYEE,
    assignedWarehouseId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (userToEdit) {
      setFormData(userToEdit);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: Role.EMPLOYEE,
        assignedWarehouseId: '',
      });
    }
    setErrors({});
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!formData.email?.trim()) newErrors.email = 'Vui lòng nhập email';
    if (!formData.role) newErrors.role = 'Vui lòng chọn chức vụ';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setFormData({ ...formData, avatar: event.target?.result as string });
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const finalUser: User = {
      id: userToEdit?.id || `u-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      role: formData.role as Role,
      avatar: formData.avatar || `https://i.pravatar.cc/150?u=${formData.email}`,
      assignedWarehouseId: formData.assignedWarehouseId || undefined,
    };

    onSave(finalUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-lg text-slate-800">
            {userToEdit ? 'Cập nhật nhân sự' : 'Thêm nhân sự mới'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3 pb-4 border-b border-slate-50">
            <div className="relative group">
              <img 
                src={formData.avatar || `https://i.pravatar.cc/150?u=${formData.email || 'default'}`} 
                alt="Avatar" 
                className="w-20 h-20 rounded-full object-cover border-4 border-slate-100 group-hover:opacity-75 transition-opacity" 
              />
              <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/50 p-2 rounded-full text-white">
                  <Save size={16} />
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
              </label>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Nhấp vào ảnh để đổi Avatar</p>
          </div>

          {/* Họ tên */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
              <UserIcon size={12} className="mr-1" /> Họ và tên
            </label>
            <input 
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-accent ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
              placeholder="Nguyễn Văn A"
            />
            {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                <Mail size={12} className="mr-1" /> Email
              </label>
              <input 
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-accent ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                placeholder="example@khoviet.com"
              />
              {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email}</p>}
            </div>

            {/* SĐT */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                <Phone size={12} className="mr-1" /> Số điện thoại
              </label>
              <input 
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-accent"
                placeholder="09xx xxx xxx"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chức vụ */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                <Shield size={12} className="mr-1" /> Chức vụ
              </label>
              <select 
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value as Role })}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-accent bg-white"
              >
                <option value={Role.ADMIN}>Quản trị viên (Toàn quyền)</option>
                <option value={Role.ACCOUNTANT}>Kế toán</option>
                <option value={Role.KEEPER}>Thủ kho</option>
                <option value={Role.EMPLOYEE}>Nhân viên</option>
              </select>
            </div>

            {/* Công trình/Kho */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                <Building size={12} className="mr-1" /> Làm việc tại
              </label>
              <select 
                value={formData.assignedWarehouseId || ''}
                onChange={e => setFormData({ ...formData, assignedWarehouseId: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-accent bg-white"
              >
                <option value="">Toàn hệ thống (Admin/General)</option>
                {warehouses.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic">
            (*) Admin có quyền xem/sửa toàn hệ thống. Thủ kho chỉ có quyền tại kho được phân công.
          </p>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit"
              className="flex-1 py-2.5 bg-accent text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg shadow-blue-500/30"
            >
              <Save size={18} className="mr-2" /> Lưu thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
