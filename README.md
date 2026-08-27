# 🏆 KEOVIP247 - Website Đánh Giá & Xếp Hạng Nhà Cái / Cổng Game (Affiliate Aggregator)

Một nền tảng Affiliate Review Aggregator hoàn chỉnh, hiện đại, tối ưu SEO và Mobile chuẩn quốc tế được xây dựng bằng **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Upstash Redis** và **ImageKit**.

---

## 🌟 1. Tính Năng Nổi Bật

### A. Giao diện Người dùng (Frontend)
- **Trang chủ Aggregator**:
  - Hero banner với số liệu uy tín (100% Giấy phép, < 5 phút rút tiền, 50.000+ thành viên).
  - Bộ lọc nhanh: *Tất cả, Top Nhà Cái, Cổng Game, Rút Tiền Siêu Tốc, Tặng Tiền Tân Thủ*.
  - Thẻ nhà cái VIP với huy hiệu Top 1, 2, 3 mạ vàng/bạc/đồng, đánh giá sao, ưu điểm checklist và nút CTA chuyển đổi cao.
  - **Bảng xếp hạng so sánh Top 10**: Giấy phép, tốc độ rút, nạp tối thiểu, khuyến mãi, nút cược nhanh.
  - Khối Hỏi & Đáp (FAQ Accordion) có nhúng **Schema.org JSON-LD (FAQPage)** hỗ trợ hiển thị Rich Snippets trên Google.
  - Khối nội dung chuẩn SEO hướng dẫn tiêu chí chọn lọc nhà cái.
- **Trang Chuyên Mục & Danh Mục (`/[category]`)**:
  - `/top-nha-cai`: Top nhà cái uy tín.
  - `/cong-game`: Cổng game bài đổi thưởng (Sunwin, Go88, Rikvip...).
  - `/khuyen-mai`: Săn tiền cược miễn phí, code trải nghiệm.
  - `/soi-keo`: Kinh nghiệm soi kèo bóng đá châu Á (Handicap).
  - `/huong-dan`: Cẩm nang nạp rút tiền an toàn qua USDT & Ngân hàng.
- **Trang Chi Tiết Review & Bài Viết (`/review/[slug]` & `/bai-viet/[slug]`)**:
  - Tự động sinh **Mục Lục Bài Viết (Table of Contents - TOC)** có nút thu gọn/mở rộng và nhảy đến từng mục.
  - **Bảng Điểm Thẩm Định (Score Widget)**: Chấm điểm Pháp lý, Tốc độ rút tiền, Sảnh cược, CSKH.
  - Bảng so sánh trực quan **Ưu Điểm (Pros) & Nhược Điểm (Cons)**.
  - Trình bày bài viết Markdown phong phú (Bảng biểu, Callout, Danh sách, Liên kết).
  - Gợi ý Top 3 nhà cái thay thế ở Sidebar.
  - **Sticky Mobile Bottom Bar**: Thanh CTA ghim đáy màn hình trên điện thoại hiển thị Logo + Khuyến mãi + Nút "Cược Ngay" giúp tối đa hóa tỷ lệ click affiliate.
- **Hệ Thống Link Cloaking & Click Tracking (`/go/[brandSlug]`)**:
  - Tự động đếm và cộng dồn lượt click của từng nhà cái vào Database/Redis.
  - Redirect 307 an toàn với cờ `X-Robots-Tag: noindex, nofollow`, bảo vệ SEO và chuyển hướng người dùng đến đúng link đối tác.

---

### B. Hệ Thống Quản Trị CMS (`/admin`)
- **Bảo mật**: Xác thực an toàn bằng mật khẩu quản trị (`ADMIN_PASSWORD`) hoặc Token bí mật (`ADMIN_SECRET`), lưu session qua HTTP-only cookie.
- **Dashboard Tổng Quan**: Biểu đồ/bảng theo dõi tổng lượt click affiliate, top 5 nhà cái chuyển đổi cao nhất, tổng số bài viết, câu hỏi FAQ.
- **Quản lý Nhà cái (`/admin/brands`)**: Thêm/Sửa/Xóa/Sắp xếp thứ tự, upload logo qua ImageKit (hoặc nhập URL), cập nhật link affiliate, badge khuyến mãi, ưu nhược điểm.
- **Quản lý Bài viết (`/admin/articles`)**: Trình soạn thảo Markdown chuyên nghiệp với Toolbar chèn thẻ (H2, H3, Bảng, Callout), xem trước trực tiếp (Live Preview), upload thumbnail qua ImageKit, cấu hình SEO (Title, Slug, Meta Description, Keywords).
- **Quản lý FAQ (`/admin/faqs`)**: Thêm, sửa, xóa các câu hỏi và câu trả lời thường gặp.
- **Cài đặt Website (`/admin/settings`)**: Cấu hình hotline, link Telegram, Zalo, email, tiêu đề trang chủ, thanh thông báo đầu trang và bản quyền chân trang.

---

## 🛠️ 2. Cài Đặt & Chạy Môi Trường Local

```bash
# 1. Cài đặt dependencies
npm install

# 2. Tạo file cấu hình môi trường
cp .env.example .env.local

# 3. Chạy server phát triển
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

- **Trang chủ người dùng**: `http://localhost:3000`
- **Trang Quản trị Admin CMS**: `http://localhost:3000/admin`
  - Mật khẩu mặc định: `admin123456`

---

## ⚙️ 3. Hướng Dẫn Cấu Hình Biến Môi Trường (`.env.local`)

| Biến Môi Trường | Mô Tả | Mặc Định / Nơi Lấy |
| :--- | :--- | :--- |
| `ADMIN_PASSWORD` | Mật khẩu truy cập trang `/admin` | `admin123456` |
| `ADMIN_SECRET` | Khóa bí mật mã hóa cookie admin | `keovip-super-secret-key-2026` |
| `UPSTASH_REDIS_REST_URL` | URL kết nối Upstash Redis | Lấy tại [Upstash Console](https://console.upstash.com) |
| `UPSTASH_REDIS_REST_TOKEN` | Token kết nối Upstash Redis | Lấy tại [Upstash Console](https://console.upstash.com) |
| `IMAGEKIT_PUBLIC_KEY` | Public Key của ImageKit | Lấy tại [ImageKit Developer](https://imagekit.io) |
| `IMAGEKIT_PRIVATE_KEY` | Private Key của ImageKit | Lấy tại [ImageKit Developer](https://imagekit.io) |
| `IMAGEKIT_URL_ENDPOINT` | URL Endpoint của ImageKit | `https://ik.imagekit.io/your_id` |

> 💡 **Lưu ý**: Website đã được tích hợp **cơ chế tự động fallback**. Nếu bạn chưa cấu hình Upstash Redis hoặc ImageKit, website vẫn chạy mượt mà 100% với dữ liệu mẫu chất lượng cao và hỗ trợ nhập URL ảnh trực tiếp.

---

## 🚀 4. Hướng Dẫn Deploy Lên Vercel

1. Đẩy mã nguồn lên GitHub/GitLab:
   ```bash
   git add .
   git commit -m "feat: complete betting review aggregator platform"
   git push origin main
   ```
2. Truy cập [Vercel Dashboard](https://vercel.com) -> **Add New Project** -> Chọn repository vừa tạo.
3. Trong phần **Environment Variables**, điền các biến từ file `.env.example`.
4. Bấm **Deploy**. Website sẽ được build và live toàn cầu sau ~1 phút.

---

## 📁 5. Cấu Trúc Thư Mục

```
src/
├── app/
│   ├── layout.tsx              # Root Layout (SEO, Meta, Schema, Header, Footer)
│   ├── page.tsx                # Trang chủ Aggregator
│   ├── [category]/page.tsx     # Trang chuyên mục
│   ├── review/[slug]/page.tsx  # Trang chi tiết Review Nhà cái (TOC, Score, Pros/Cons)
│   ├── bai-viet/[slug]/page.tsx# Trang chi tiết Bài viết / Cẩm nang
│   ├── go/[slug]/route.ts      # Link Cloaking & Affiliate Click Tracker (307 Redirect)
│   ├── sitemap.ts              # Dynamic sitemap.xml
│   ├── robots.ts               # Robots.txt
│   ├── admin/                  # Hệ thống Admin CMS
│   └── api/                    # REST API Endpoints (Brands, Articles, FAQs, Upload, Auth)
├── components/
│   ├── layout/                 # Header, Footer, AnnouncementBar, MobileNav
│   ├── brands/                 # BrandCard, BrandRankingTable, BrandFilter
│   ├── review/                 # TableOfContents, ScoreWidget, ProsCons, StickyMobileCTA
│   ├── articles/               # ArticleCard, MarkdownRenderer
│   ├── faq/                    # FAQAccordion (với Schema JSON-LD)
│   └── admin/                  # AdminSidebar, AdminHeader, StatsCard, ImageUploader
└── lib/
    ├── db.ts                   # Upstash Redis & Fallback Storage Service
    ├── imagekit.ts             # ImageKit SDK Client
    ├── auth.ts                 # Admin Session & Token Verification
    ├── types.ts                # TypeScript Interfaces
    ├── initial-data.ts         # Dữ liệu Mock chuẩn thực tế
    └── utils.ts                # Utilities (slugify, extractTOC, formatDate)
```
