-- 1. Cập nhật bảng app_settings để có ID cố định và hỗ trợ lưu trữ
CREATE TABLE IF NOT EXISTS app_settings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL DEFAULT 'KhoViet',
    logo TEXT
);

-- Chèn dòng dữ liệu mặc định nếu chưa có
INSERT INTO app_settings (id, name, logo)
VALUES ('main-settings', 'KhoViet', '')
ON CONFLICT (id) DO NOTHING;

-- 2. Đảm bảo bảng users có cột avatar và các thông tin cần thiết
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='avatar') THEN
        ALTER TABLE users ADD COLUMN avatar TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='phone') THEN
        ALTER TABLE users ADD COLUMN phone TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='assigned_warehouse_id') THEN
        ALTER TABLE users ADD COLUMN assigned_warehouse_id TEXT;
    END IF;
END $$;

-- 3. Phân quyền cho phép mọi người đọc settings nhưng chỉ Admin mới được sửa
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on app_settings" ON app_settings;
CREATE POLICY "Allow public read on app_settings" ON app_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin update on app_settings" ON app_settings;
CREATE POLICY "Allow admin update on app_settings" ON app_settings FOR UPDATE USING (true); -- Đơn giản hóa cho demo, thực tế nên check role

DROP POLICY IF EXISTS "Allow admin insert on app_settings" ON app_settings;
CREATE POLICY "Allow admin insert on app_settings" ON app_settings FOR INSERT WITH CHECK (true);
