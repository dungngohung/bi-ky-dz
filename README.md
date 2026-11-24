# 📓 Bí kỹ cá nhân của Dz (v2.0 - Clean & Fresh)

Website lưu trữ cẩm nang đời sống & nhà bếp thực chiến. Thiết kế tối giản, siêu nhẹ, không phụ thuộc framework phức tạp.

---

## 🌟 Điểm nổi bật
- **Siêu nhẹ & Tốc độ cao**: Loại bỏ Astro cồng kềnh, chỉ sử dụng 1 file script `build.js` thuần Node.js. Thời gian build toàn bộ trang web chỉ mất **~50 mili-giây** (0.05 giây)!
- **Bố cục theo Cụm chủ đề (Topic Clusters)**: Thay vì thanh tìm kiếm thừa thãi, trang chủ được gom nhóm mạch lạc theo từng chuyên mục rõ ràng (Ẩm thực & Nhà bếp, Đồ dùng & An toàn bếp...).
- **Giao diện Clean & Fresh**: Tone màu sáng dịu mắt, điểm xuyết màu xanh ngọc (Emerald / Mint) tươi mới, typography chuẩn đọc, hỗ trợ Dark/Light mode tự động lưu.
- **Tương thích 100% Vercel**: Đã có sẵn file `vercel.json`, Vercel tự động build và deploy sau mỗi lần push Git.

---

## 📂 Cấu trúc thư mục

```text
d:\3.Web_Curated\
├── content/
│   ├── raw/               <-- Nơi bạn bỏ file ghi chú dài thô
│   └── tips/              <-- Nơi lưu các bài đã được tinh chỉnh
├── templates/
│   └── style.css          <-- File CSS duy nhất phong cách Clean & Fresh
├── dist/                  <-- Thư mục HTML tĩnh xuất ra sau khi build
├── build.js               <-- Script biên dịch tĩnh siêu nhẹ (~50ms)
├── vercel.json            <-- Cấu hình tự động cho Vercel
└── package.json           <-- Chỉ 2 thư viện nhỏ: marked & gray-matter
```

---

## 🤖 Luồng làm việc khi có bài mới

1. Bỏ file thô vào `content/raw/ten-file.md`.
2. Bảo Agent: *"Xử lý file content/raw/ten-file.md"*.
3. Agent sẽ đọc, chắt lọc và tạo file `content/tips/ten-file.md`.
4. Chạy lệnh hoặc để Agent chạy: `node build.js`.
5. Đẩy lên GitHub: `git push origin main` -> Vercel tự động cập nhật online.

---

## 🚀 Lệnh chạy trên máy

```bash
# Biên dịch tĩnh tức thì (< 50ms)
node build.js

# Hoặc dùng npm:
npm run build
```
