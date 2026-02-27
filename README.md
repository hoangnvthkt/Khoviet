# KhoViet - Hệ thống Quản Lý Kho Doanh Nghiệp

## 1. Phân tích nghiệp vụ
Hệ thống được thiết kế để giải quyết bài toán quản lý dòng vật tư cho doanh nghiệp xây dựng/sản xuất, nơi có đặc thù:
- Nhiều kho bãi (Kho tổng, kho công trình).
- Vật tư đa dạng (Nguyên vật liệu, CCDC, Thành phẩm).
- Quy trình chặt chẽ: Yêu cầu -> Duyệt -> Xuất.

### Các thực thể chính:
- **Product (Vật tư)**: Định danh bằng SKU & Barcode/QR.
- **Warehouse (Kho)**: Nơi lưu trữ.
- **Transaction (Giao dịch)**: Ghi nhận mọi biến động (Nhập/Xuất/Chuyển/Kiểm kê).
- **User (Người dùng)**: Phân quyền RBAC (Admin, Thủ kho, Kế toán).

## 2. Kiến trúc hệ thống
Mô hình Client-Server hiện đại:
- **Frontend**: React (SPA), Tailwind CSS.
- **Backend (Giả lập)**: RESTful API design pattern.
- **Database (Giả lập)**: Quan hệ (Relational) - Users, Products, Transactions, Warehouses.

## 3. Quy trình (Flow)
1. **Nhập kho**: Tạo phiếu -> Scan vật tư -> Nhập số lượng -> Lưu nháp/Hoàn thành.
2. **Xuất kho**: Chọn kho xuất -> Chọn vật tư -> Kiểm tra tồn kho (Validation) -> Tạo phiếu.
3. **Kiểm kê**: Scan thực tế -> So sánh tồn lý thuyết -> Tạo phiếu điều chỉnh (Adjustment).

## 4. Công nghệ sử dụng trong Demo
- **React 18**: Core framework.
- **TypeScript**: Type safety.
- **Tailwind CSS**: Styling nhanh, mobile-first.
- **Recharts**: Biểu đồ báo cáo.
- **Context API**: Quản lý trạng thái toàn cục (thay thế Redux cho scope vừa phải).
- **Lucide React**: Icons.

## 5. Lộ trình phát triển (Roadmap)
1. **Phase 1 (MVP - Current)**: Quản lý danh mục, Nhập/Xuất cơ bản, Scan QR giả lập, Dashboard.
2. **Phase 2**: Backend thực tế (Node.js/Go), Auth (JWT), Real-time QR scanner (Zxing/Html5-qrcode).
3. **Phase 3**: Mobile App (React Native), Tích hợp ERP/Kế toán, AI dự báo tồn kho.
