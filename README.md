# 📓 Bí kỹ cá nhân của Dz

Website tối giản phong cách **Notion** dùng để lưu trữ và tra cứu nhanh các mẹo đời sống, ẩm thực, sức khỏe đã được kiểm chứng thực tế sau khi trao đổi cùng AI.

---

## 🌟 Điểm nổi bật
- **Search-First UX**: Thanh tìm kiếm tức thì ngay đầu trang, gõ từ khóa (ví dụ: *nấu canh rau, rau ngót, rửa rau...*) là bài viết hiện ra ngay lập tức, không qua menu rườm rà.
- **Phong cách Notion**: Thiết kế sạch sẽ, font chữ chuẩn đọc, có các khối highlight tóm tắt nhanh (Quick Takeaways), cảnh báo thực tế và bảng tra cứu trực quan.
- **Dark/Light Mode**: Hỗ trợ chuyển đổi giao diện sáng/tối tự động lưu vào bộ nhớ trình duyệt.
- **Astro Content Collections**: Chuẩn SEO, tốc độ tải trang gần như tức thì (Zero JS runtime khi không cần thiết).

---

## 📂 Cấu trúc thư mục nội dung

```text
d:\3.Web_Curated\
├── content/
│   └── raw/               <-- NƠI BẠN ĐẶT CÁC FILE GHI CHÚ THÔ (MARKDOWN DÀI) VÀO ĐÂY
│       └── ve-cac-loai-rau.md
├── src/
│   ├── content/
│   │   └── tips/          <-- NƠI LƯU CÁC BÀI ĐÃ ĐƯỢC TINH CHỈNH ĐỂ HIỂN THỊ TRÊN WEB
│   │       ├── ve-cac-loai-rau.md
│   │       └── ca-phe-va-giac-ngu.md
│   ├── components/        <-- Giao diện tìm kiếm, danh sách bài viết
│   ├── layouts/           <-- Khung trang web chuẩn Notion
│   └── pages/             <-- Trang chủ và trang đọc chi tiết
```

---

## 🤖 Luồng làm việc: Thêm bài mới bằng AI Agent

1. **Bước 1:** Bạn lưu hoặc copy file markdown dài bất kỳ vào thư mục `content/raw/`.
2. **Bước 2:** Trong cửa sổ Antigravity, bạn chỉ cần gõ yêu cầu:
   > *"Tôi vừa bỏ file `ten-file.md` vào `content/raw/`, hãy tinh chỉnh và đưa nó lên web giúp tôi!"*
3. **Bước 3:** AI sẽ tự động đọc hiểu, lược bỏ phần thừa, sinh tóm tắt nhanh (Quick Takeaways), chọn emoji phù hợp, gắn tag & danh mục, sau đó tạo file chuẩn vào `src/content/tips/`.

---

## 🚀 Hướng dẫn chạy trên máy tính (Local)

Trong terminal tại thư mục này:
```bash
# Chạy môi trường phát triển (xem thử trên máy tại http://localhost:4321)
npm run dev

# Hoặc kiểm tra đóng gói tĩnh:
npm run build
```

---

## 🌐 Hướng dẫn đưa lên Online qua Vercel (Miễn phí 100%)

1. **Đưa mã nguồn lên GitHub:**
   - Mở terminal chạy các lệnh:
     ```bash
     git init
     git add .
     git commit -m "Khoi tao website Bi ky ca nhan cua Dz"
     git branch -M main
     ```
   - Tạo một repository mới trên GitHub (ví dụ: `bi-ky-ca-nhan-cua-dz`).
   - Kết nối và push lên:
     ```bash
     git remote add origin https://github.com/<tai-khoan-cua-ban>/bi-ky-ca-nhan-cua-dz.git
     git push -u origin main
     ```

2. **Kết nối Vercel:**
   - Truy cập [vercel.com](https://vercel.com) (đăng nhập bằng tài khoản GitHub).
   - Bấm **Add New...** -> **Project**.
   - Chọn repository `bi-ky-ca-nhan-cua-dz` từ GitHub.
   - Framework preset: Vercel sẽ tự động nhận diện là **Astro**.
   - Bấm **Deploy**.
   - Chỉ sau khoảng 1 phút, bạn sẽ có link web online dạng: `https://bi-ky-ca-nhan-cua-dz.vercel.app`!
   - Kể từ đây, mỗi khi bạn hoặc Agent thêm bài mới và push lên GitHub, Vercel sẽ tự động cập nhật website sau 30 giây.
