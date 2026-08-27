import { Brand, Article, FAQ, SiteSettings } from './types';

export const INITIAL_BRANDS: Brand[] = [
  {
    id: 'brand-1',
    name: 'BK8',
    slug: 'bk8',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    foundedYear: 2015,
    badge: 'Tặng 200% Nạp Đầu + 199K',
    license: 'GC-Gaming Curacao, BMM Testlabs',
    withdrawalSpeed: '3 - 5 Phút',
    minDeposit: '50.000 VNĐ',
    bonus: 'Thưởng chào mừng tân thủ 200% lên tới 6.800.000 VNĐ + 199k cược thử',
    pros: [
      'Đại sứ thương hiệu danh thủ bóng đá quốc tế',
      'Nạp rút tự động đa kênh: USDT, Quét mã QR, Momo, Thẻ cào',
      'Tỷ lệ hoàn trả Thể thao & Casino cao nhất thị trường (1.2%)',
      'Bảo mật SSL 256-bit và xác thực 2 lớp OTP',
    ],
    cons: [
      'Giờ cao điểm cuối tuần cần xác minh nếu rút số tiền lớn trên 500 triệu',
    ],
    affiliateUrl: 'https://example.com/aff/bk8?utm_source=keovip247',
    reviewSlug: 'danh-gia-nha-cai-bk8',
    category: 'nha-cai',
    order: 1,
    clickCount: 1420,
    isFeatured: true,
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'brand-2',
    name: 'W88',
    slug: 'w88',
    logo: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    foundedYear: 2013,
    badge: 'Tặng 100% Nạp Đầu + 90K Xác Minh',
    license: 'First Cagayan, Isle of Man GSC',
    withdrawalSpeed: '5 - 10 Phút',
    minDeposit: '100.000 VNĐ',
    bonus: '100% nạp đầu lên tới 6.150.000 VNĐ + 90K khi xác thực tài khoản thành công',
    pros: [
      'Thương hiệu gạo cội hơn 10 năm hoạt động tại thị trường châu Á',
      'Giao diện trực quan, app mượt mà trên iOS và Android',
      'Hệ thống sảnh Live Casino người thật đa dạng (Club W, Massimo)',
      'Hỗ trợ khách hàng chuyên nghiệp trực tiếp 24/7',
    ],
    cons: [
      'Mức nạp tối thiểu cao hơn một số cổng game khác (100k)',
    ],
    affiliateUrl: 'https://example.com/aff/w88?utm_source=keovip247',
    reviewSlug: 'danh-gia-nha-cai-w88',
    category: 'nha-cai',
    order: 2,
    clickCount: 1280,
    isFeatured: true,
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'brand-3',
    name: 'FUN88',
    slug: 'fun88',
    logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    foundedYear: 2008,
    badge: 'Tặng 150% Thể Thao + Áo Đấu VIP',
    license: 'PAGCOR Philippines, Gaming Associates',
    withdrawalSpeed: '5 - 15 Phút',
    minDeposit: '50.000 VNĐ',
    bonus: 'Thưởng 150% sảnh Thể Thao lên đến 6.000.000 VNĐ + Tặng áo đấu CLB đối tác',
    pros: [
      'Đối tác chính thức của Newcastle United & Tottenham Hotspur',
      'Kèo cược bóng đá sớm và tỷ lệ Odds ăn cao',
      'Đầy đủ các giải đấu từ Ngoại Hạng Anh đến V-League',
      'Hệ thống điểm thưởng tích lũy đổi quà hiện vật giá trị',
    ],
    cons: [
      'Thời gian cập nhật khuyến mãi vào đầu tháng có thể hơi chậm',
    ],
    affiliateUrl: 'https://example.com/aff/fun88?utm_source=keovip247',
    reviewSlug: 'danh-gia-nha-cai-fun88',
    category: 'nha-cai',
    order: 3,
    clickCount: 1105,
    isFeatured: true,
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'brand-4',
    name: 'SUNWIN',
    slug: 'sunwin',
    logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    foundedYear: 2018,
    badge: 'Cổng Game Bài Đổi Thưởng #1',
    license: 'Tập đoàn Suncity Group Macao',
    withdrawalSpeed: '1 - 3 Phút',
    minDeposit: '20.000 VNĐ',
    bonus: 'Tặng Code Tân Thủ 50K - 100K + Hoàn tiền cược Tài Xỉu mỗi ngày',
    pros: [
      'Cổng game bài có lượng người chơi Tài Xỉu và Nổ Hũ đông đảo nhất',
      'Rút tiền 1:1 siêu tốc qua mọi ngân hàng và ví điện tử, không mất phí',
      'Thuật toán MD5 kiểm tra tính minh bạch và công bằng 100%',
      'Cài đặt ứng dụng nhẹ, không nóng máy, chống giật lag',
    ],
    cons: [
      'Thường xuyên bị nhà mạng chặn link, cần cập nhật domain mới định kỳ',
    ],
    affiliateUrl: 'https://example.com/aff/sunwin?utm_source=keovip247',
    reviewSlug: 'danh-gia-cong-game-sunwin',
    category: 'cong-game',
    order: 4,
    clickCount: 1890,
    isFeatured: true,
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'brand-5',
    name: 'GO88',
    slug: 'go88',
    logo: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    foundedYear: 2019,
    badge: 'Thiên Đường Game Bài Đại Gia',
    license: 'Isle of Man Gambling License',
    withdrawalSpeed: '2 - 5 Phút',
    minDeposit: '20.000 VNĐ',
    bonus: 'Kích hoạt số điện thoại nhận ngay 50k trải nghiệm miễn phí',
    pros: [
      'Giao diện mô phỏng sòng bài Las Vegas sang trọng đỉnh cao',
      'Hàng chục mini game hot: Tài xỉu, Bắn cá, Tiến lên miền Nam, Xóc đĩa',
      'Hệ thống nạp tiền tự động CodePay nhận tiền sau 30 giây',
      'Kênh Telegram phát giftcode miễn phí mỗi ngày',
    ],
    cons: [
      'Kênh livechat hỗ trợ vào giờ cao điểm (20h - 23h) có thể phải chờ hàng đợi',
    ],
    affiliateUrl: 'https://example.com/aff/go88?utm_source=keovip247',
    reviewSlug: 'danh-gia-cong-game-go88',
    category: 'cong-game',
    order: 5,
    clickCount: 1640,
    isFeatured: true,
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'brand-6',
    name: 'FB88',
    slug: 'fb88',
    logo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80',
    rating: 4.7,
    foundedYear: 2016,
    badge: 'Thưởng Nạp Đầu 2 Triệu + 38% Chuyển Quỹ',
    license: 'PAGCOR Philippines & GamCare',
    withdrawalSpeed: '5 - 10 Phút',
    minDeposit: '50.000 VNĐ',
    bonus: 'Thưởng 100% nạp đầu lên tới 2.000.000 VNĐ + 38% cho lần chuyển tiền đầu tiên',
    pros: [
      'Giao diện tông màu xanh lá đặc trưng, hiển thị bảng kèo rất dễ nhìn',
      'Phát sóng trực tiếp các trận đấu bóng đá HD miễn phí bản quyền',
      'Khuyến mãi đa dạng cho cả Thể thao, Casino và Bắn cá',
    ],
    cons: [
      'Yêu cầu vòng cược khuyến mãi thể thao ở mức trung bình (khoảng 20 vòng)',
    ],
    affiliateUrl: 'https://example.com/aff/fb88?utm_source=keovip247',
    reviewSlug: 'danh-gia-nha-cai-fb88',
    category: 'nha-cai',
    order: 6,
    clickCount: 890,
    isFeatured: false,
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'brand-7',
    name: '88BET',
    slug: '88bet',
    logo: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=150&auto=format&fit=crop&q=80',
    rating: 4.7,
    foundedYear: 2017,
    badge: 'Nạp Rút USDT 0% Phí',
    license: 'Curaçao eGaming #8048/JAZ',
    withdrawalSpeed: '3 - 5 Phút',
    minDeposit: '50.000 VNĐ',
    bonus: 'Tặng 150% nạp đầu và bảo hiểm cược thua đầu tiên 100%',
    pros: [
      'Hỗ trợ nạp rút tiền qua tiền mã hóa Crypto (USDT, BTC, ETH) bảo mật ẩn danh',
      'Không bao giờ bị kiểm soát hay giữ tiền của người chơi',
      'Sảnh thể thao ảo và eSports đa dạng',
    ],
    cons: [
      'Chưa hỗ trợ nhiều ngân hàng địa phương nhỏ',
    ],
    affiliateUrl: 'https://example.com/aff/88bet?utm_source=keovip247',
    reviewSlug: 'danh-gia-nha-cai-88bet',
    category: 'nha-cai',
    order: 7,
    clickCount: 780,
    isFeatured: false,
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'brand-8',
    name: 'RIKVIP',
    slug: 'rikvip',
    logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&auto=format&fit=crop&q=80',
    rating: 4.6,
    foundedYear: 2020,
    badge: 'Tặng 100K Tân Thủ Code Mỹ',
    license: 'Gaming Curacao License',
    withdrawalSpeed: '3 - 7 Phút',
    minDeposit: '20.000 VNĐ',
    bonus: 'Tặng 100k trải nghiệm kiểu Mỹ khi hoàn thành nhiệm vụ tân thủ',
    pros: [
      'Đồ họa phong cách hoạt hình Mỹ cá tính, âm thanh sống động',
      'Sảnh Nổ Hũ Jackpot hàng tỷ đồng nổ liên tục',
      'Bảo mật mã hóa đa tầng cho người chơi',
    ],
    cons: [
      'Hệ thống nhiệm vụ đòi hỏi phải tương tác nhiều',
    ],
    affiliateUrl: 'https://example.com/aff/rikvip?utm_source=keovip247',
    reviewSlug: 'danh-gia-cong-game-rikvip',
    category: 'cong-game',
    order: 8,
    clickCount: 650,
    isFeatured: false,
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Top 10 Nhà Cái Uy Tín Nhất Việt Nam 2026 (Đã Kiểm Định Giấy Phép & Tốc Độ Rút Tiền)',
    slug: 'top-10-nha-cai-uy-tin-nhat-viet-nam',
    category: 'top-nha-cai',
    thumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80',
    summary: 'Tổng hợp và đánh giá chi tiết bảng xếp hạng 10 nhà cái uy tín số 1 Việt Nam hiện nay với giấy phép PAGCOR, tốc độ rút tiền dưới 5 phút và khuyến mãi tân thủ hấp dẫn.',
    author: 'Chuyên gia Kèo VIP',
    views: 12850,
    seo: {
      metaTitle: 'Top 10 Nhà Cái Uy Tín Nhất Việt Nam 2026 - Bảng Xếp Hạng Chuẩn',
      metaDescription: 'Đánh giá Top 10 nhà cái uy tín nhất hiện nay tại Việt Nam. Kiểm định tốc độ nạp rút, giấy phép quốc tế và link cược an toàn tặng thưởng 100%.',
      keywords: 'top 10 nha cai uy tin, nha cai uy tin nhat viet nam, danh gia nha cai, link nha cai moi nhat',
    },
    createdAt: '2026-08-01T08:00:00.000Z',
    updatedAt: '2026-08-20T14:30:00.000Z',
    status: 'published',
    content: `
## 1. Tiêu chí chọn lọc nhà cái uy tín tại KEOVIP247

Để được xếp hạng trong danh sách **Top Nhà Cái Uy Tín**, mỗi thương hiệu cá cược đều phải vượt qua quy trình kiểm định 6 bước nghiêm ngặt của đội ngũ chuyên gia:

1. **Giấy phép hoạt động hợp pháp**: Bắt buộc sở hữu giấy phép từ các cơ quan giám sát cờ bạc quốc tế như PAGCOR (Philippines), Isle of Man GSC, Malta Gaming Authority (MGA) hoặc Curacao eGaming.
2. **Tốc độ thanh khoản (Nạp/Rút)**: Cam kết xử lý nạp tiền tức thì (dưới 2 phút) và rút tiền về tài khoản ngân hàng dưới 15 phút.
3. **Bảo mật và Mã hóa**: Ứng dụng công nghệ SSL 256-bit kết hợp bảo vệ quyền riêng tư người chơi.
4. **Hệ sinh thái cá cược phong phú**: Đầy đủ Thể thao (Kèo bóng đá, bóng rổ, tennis), Sòng bạc trực tuyến (Live Casino với Dealer người thật), Game bài, Slot nổ hũ, Bắn cá, eSports.
5. **Khuyến mãi minh bạch**: Điều kiện vòng cược (Doanh thu cược) rõ ràng, không gài bẫy người chơi.
6. **Chăm sóc khách hàng 24/7**: Đội ngũ hỗ trợ nhiệt tình, giải quyết thắc mắc bằng tiếng Việt qua Livechat, Hotline và Telegram.

---

## 2. Bảng so sánh nhanh Top 3 Nhà cái hàng đầu

| Tiêu chí | BK8 | W88 | FUN88 |
| :--- | :--- | :--- | :--- |
| **Xếp hạng** | ⭐⭐⭐⭐⭐ (4.9/5) | ⭐⭐⭐⭐⭐ (4.9/5) | ⭐⭐⭐⭐⭐ (4.8/5) |
| **Giấy phép** | Curacao, BMM | Isle of Man, First Cagayan | PAGCOR, Gaming Assoc. |
| **Rút tiền** | 3 - 5 Phút | 5 - 10 Phút | 5 - 15 Phút |
| **Khuyến mãi** | 200% nạp đầu + 199K | 100% nạp đầu + 90K | 150% Thể thao 6 Triệu |
| **Nạp tối thiểu** | 50.000 VNĐ | 100.000 VNĐ | 50.000 VNĐ |

---

## 3. Đánh giá chi tiết từng thương hiệu

### 3.1. BK8 - Đỉnh cao công nghệ cá cược thể thao & Casino
BK8 luôn nằm trong top đầu những nhà cái có tốc độ phát triển mạnh mẽ nhất châu Á. Nhà cái này liên tục tài trợ cho các giải đấu và hợp tác cùng nhiều danh thủ bóng đá thế giới.
- **Ưu điểm lớn nhất**: Tốc độ nạp rút qua mã QR Ngân hàng và Crypto USDT siêu nhanh, không giới hạn hạn mức nạp rút trong ngày.
- **Trò chơi nổi bật**: Sảnh thể thao CMD368, Saba Sports, Live Casino Evolution, Sexy Baccarat.

### 3.2. W88 - Biểu tượng uy tín vững chắc hơn 10 năm
Không cần nói quá nhiều về W88, đây là nhà cái lâu đời và quen thuộc nhất với cộng đồng cược thủ Việt Nam.
- **Ưu điểm**: Ứng dụng mượt mà, độ ổn định cực cao khi có các trận cầu đinh như World Cup, Euro, Champions League.
- **CSKH**: Phục vụ 24/7 với tác phong chuẩn mực.

---

## 4. Hướng dẫn tham gia cược an toàn không bị chặn

Để truy cập vào các nhà cái mà không lo bị chặn bởi các nhà mạng viễn thông tại Việt Nam, bạn có thể thực hiện theo các cách sau:
- **Cách 1**: Sử dụng link chuyển hướng thông minh chính thức từ KEOVIP247 (luôn được tự động cập nhật domain mới nhất).
- **Cách 2**: Tải ứng dụng 1.1.1.1 (Cloudflare WARP) trên điện thoại hoặc máy tính để đổi DNS bảo mật.
- **Cách 3**: Tải trực tiếp app chính thức của nhà cái về điện thoại di động (hỗ trợ cả iOS và Android).

> **Lời khuyên**: Hãy luôn đặt ra giới hạn ngân sách cược hàng ngày và chỉ chơi với số tiền nhàn rỗi để đảm bảo trải nghiệm giải trí lành mạnh nhất.
    `,
  },
  {
    id: 'art-2',
    title: 'Đánh Giá Chi Tiết Nhà Cái BK8: Khuyến Mãi 200%, Nạp Rút USDT Siêu Tốc',
    slug: 'danh-gia-nha-cai-bk8',
    category: 'top-nha-cai',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    summary: 'Review chân thực từ trải nghiệm thực tế về nhà cái BK8: giấy phép pháp lý, các sảnh cược Thể Thao - Casino, tỷ lệ kèo và hướng dẫn nhận trọn gói thưởng tân thủ 200%.',
    author: 'Admin Review',
    brandId: 'brand-1',
    views: 8940,
    seo: {
      metaTitle: 'Đánh Giá Nhà Cái BK8 2026: Có Uy Tín Không? Link Đăng Ký Mới Nhất',
      metaDescription: 'Review chi tiết nhà cái BK8. Phân tích ưu nhược điểm, độ uy tín, tốc độ nạp rút và link vào BK8 chính thức không bị chặn.',
      keywords: 'danh gia bk8, review bk8, nha cai bk8 co uy tin khong, link vao bk8',
    },
    createdAt: '2026-08-05T09:00:00.000Z',
    updatedAt: '2026-08-22T10:00:00.000Z',
    status: 'published',
    content: `
## 1. Giới thiệu tổng quan về nhà cái BK8

BK8 được thành lập vào năm 2015, có trụ sở chính tại Malta và được cấp phép hoạt động hợp pháp bởi chính phủ Curacao. Sau hơn 10 năm phát triển, BK8 đã khẳng định vị thế là một trong những nhà cái trực tuyến hàng đầu tại khu vực châu Á, đặc biệt là tại Việt Nam, Thái Lan, Malaysia và Indonesia.

---

## 2. Giấy phép pháp lý và độ tin cậy

BK8 sở hữu hệ thống giấy phép cờ bạc minh bạch:
- Giấy phép số **GC-Gaming Curacao** cấp phép dịch vụ cá cược quốc tế.
- Chứng chỉ kiểm định thuật toán game độc lập từ **BMM Testlabs** và **iTech Labs**, đảm bảo mọi kết quả cược đều ngẫu nhiên (RNG) và không có sự can thiệp từ bên thứ 3.

---

## 3. Khám phá các sảnh cược đỉnh cao tại BK8

### 3.1. Cá cược Thể thao đẳng cấp
- Tích hợp 4 sảnh cược lớn: **BK8 Thể thao, Saba Sports, CMD368, SBOBET**.
- Đầy đủ kèo châu Á (Handicap), kèo châu Âu (1x2), Tài Xỉu (Over/Under), Kèo góc, Kèo thẻ phạt.
- Tỉ lệ trả thưởng (Odds) luôn nằm trong top cạnh tranh nhất.

### 3.2. Sòng bạc trực tuyến (Live Casino)
- Trải nghiệm cảm giác như ngồi tại sòng bạc Las Vegas hay Macau với các Dealer xinh đẹp người thật.
- Các sảnh casino hàng đầu: Evolution Gaming, Sexy Baccarat, Pragmatic Play Live, WM Casino.

---

## 4. Hướng dẫn nạp và rút tiền tại BK8

1. **Nạp tiền qua Quét mã QR Ngân hàng (VietQR)**: Tiền vào tài khoản ngay sau 30 giây.
2. **Nạp tiền qua Ví điện tử**: Momo, ZaloPay, ViettelPay.
3. **Nạp rút Crypto (USDT TRC20 / ERC20)**: Tối đa hóa tính ẩn danh và bảo mật, không để lại sao kê ngân hàng.

---

## 5. Kết luận & Đánh giá chung

BK8 xứng đáng là sự lựa chọn số 1 cho người chơi cá cược trực tuyến tại Việt Nam năm 2026. Với giao diện hiện đại, hệ thống nạp rút linh hoạt và chính sách bảo vệ người dùng tuyệt đối, bạn hoàn toàn có thể yên tâm trải nghiệm.
    `,
  },
  {
    id: 'art-3',
    title: 'Review Cổng Game Sunwin: Link Tải Sunwin Chính Hãng Cho iOS / Android / APK',
    slug: 'danh-gia-cong-game-sunwin',
    category: 'cong-game',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    summary: 'Cổng game bài Sunwin thuộc tập đoàn Suncity Macao với hàng triệu người chơi. Tìm hiểu link tải Sunwin chuẩn, mẹo chơi Tài Xỉu MD5 thắng đậm và cách đổi thưởng 1:1 không mất phí.',
    author: 'Game Master',
    brandId: 'brand-4',
    views: 15400,
    seo: {
      metaTitle: 'Đánh Giá Cổng Game Sunwin - Link Tải Sunwin Mới Nhất 2026',
      metaDescription: 'Review Sunwin - Cổng game bài đổi thưởng số 1. Link tải Sunwin iOS, Android, APK chính hãng không bị chặn, đổi thưởng 1:1 siêu tốc.',
      keywords: 'tai sunwin, danh gia sunwin, link sunwin chuan, cong game sunwin, tai xiu sunwin',
    },
    createdAt: '2026-08-10T11:00:00.000Z',
    updatedAt: '2026-08-25T16:00:00.000Z',
    status: 'published',
    content: `
## 1. Sunwin là gì? Nguồn gốc xuất xứ của cổng game

Sunwin là cổng game bài đổi thưởng trực tuyến trực thuộc tập đoàn cá cược hàng đầu Ma Cao - **Suncity Group**. Ra mắt tại thị trường Việt Nam từ năm 2018, Sunwin nhanh chóng chiếm lĩnh vị trí số 1 nhờ sự đầu tư đồng bộ về giao diện, thuật toán công bằng và hệ thống thanh toán siêu tốc.

---

## 2. Những ưu điểm vượt trội chỉ có tại Sunwin

- **Tài Xỉu MD5 siêu minh bạch**: Cho phép người chơi tự sao chép chuỗi mã hóa MD5 trước và sau phiên để kiểm tra kết quả không hề bị can thiệp.
- **Tốc độ rút tiền 1:1**: Rút tiền trực tiếp về tài khoản ngân hàng hoặc đổi thẻ cào chỉ mất từ 1 đến 3 phút mà không qua trung gian đại lý.
- **Bảo mật OTP điện thoại**: Mọi giao dịch chuyển tiền, rút tiền đều yêu cầu mã xác nhận OTP SMS hoặc Telegram.

---

## 3. Kho game phong phú tại Sunwin

1. **Game bài truyền thống**: Tiến lên miền Nam, Phỏm (Tá lả), Mậu binh, Liêng, Xì dách, Poker.
2. **Mini game nhanh**: Tài Xỉu, Kim Cương, Mini Poker, Trên Dưới.
3. **Slots Nổ Hũ Jackpot**: Thần Tài, Tây Du Ký, Thủy Hử, Pirate King với hũ thưởng lên tới hàng tỷ đồng.

---

## 4. Hướng dẫn tải và cài đặt Sunwin an toàn

Hiện nay có rất nhiều trang web giả mạo Sunwin nhằm lừa đảo tiền nạp của người chơi. Hãy luôn kiểm tra link tải chính hãng:
- **Dành cho Android**: Tải file APK trực tiếp từ trang chủ đối tác được KEOVIP247 xác thực.
- **Dành cho iPhone / iPad (iOS)**: Tải qua ứng dụng cấu hình hoặc chơi trực tiếp trên nền tảng Web Safari.
    `,
  },
  {
    id: 'art-4',
    title: 'Tổng Hợp Top Khuyến Mãi Tân Thủ Nhà Cái Tặng Tiền Trải Nghiệm 2026',
    slug: 'tong-hop-khuyen-mai-tan-thu-tang-tien',
    category: 'khuyen-mai',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    summary: 'Cập nhật danh sách các chương trình khuyến mãi nhà cái tặng tiền cược miễn phí khi đăng ký, thưởng nạp 100% - 200% và hoàn trả cược thể thao không giới hạn.',
    author: 'Săn Khuyến Mãi',
    views: 7420,
    seo: {
      metaTitle: 'Khuyến Mãi Nhà Cái 2026 - Tặng Tiền Cược Miễn Phí Khi Đăng Ký',
      metaDescription: 'Tổng hợp các gói khuyến mãi tân thủ tốt nhất: Tặng 100k - 200k trải nghiệm, thưởng nạp lần đầu lên tới 10 triệu đồng tại các nhà cái uy tín.',
      keywords: 'khuyen mai nha cai, nha cai tang tien cuoc mien phi, code tan thu, thuong nap dau',
    },
    createdAt: '2026-08-12T07:30:00.000Z',
    updatedAt: '2026-08-24T09:15:00.000Z',
    status: 'published',
    content: `
## 1. Phân loại các hình thức khuyến mãi phổ biến

Khi tham gia cá cược trực tuyến, người chơi có thể tận dụng nhiều gói ưu đãi hấp dẫn để gia tăng vốn cược:

### 1.1. Thưởng tiền cược miễn phí (Freebet Tân Thủ)
Chỉ cần đăng ký tài khoản và hoàn tất xác thực số điện thoại / email, bạn sẽ nhận được một khoản tiền cược trải nghiệm (từ 50K đến 200K) mà không cần nạp tiền trước.

### 1.2. Thưởng nạp tiền lần đầu (First Deposit Bonus)
- **100% đến 200% giá trị nạp**: Ví dụ nạp 1.000.000 VNĐ sẽ được tặng thêm 1.000.000 VNĐ hoặc 2.000.000 VNĐ.
- Yêu cầu hoàn thành số vòng cược nhất định (thường từ 15 đến 25 vòng) trước khi có thể rút tiền.

### 1.3. Hoàn trả tiền cược hàng ngày (Cashback)
Dù thắng hay thua, nhà cái sẽ tự động hoàn trả từ **0.8% đến 1.5%** tổng doanh thu cược vào tài khoản mỗi ngày.

---

## 2. Bảng tổng hợp khuyến mãi Hot nhất tháng 8/2026

| Nhà cái / Cổng game | Gói khuyến mãi nổi bật | Yêu cầu vòng cược | Link nhận |
| :--- | :--- | :--- | :--- |
| **BK8** | Thưởng 200% nạp đầu + 199k Freebet | 18 vòng | [Nhận Ngay](/go/bk8) |
| **W88** | 100% lên tới 6.150.000 VNĐ + 90K | 20 vòng | [Nhận Ngay](/go/w88) |
| **FUN88** | 150% Thể Thao lên tới 6 Triệu | 15 vòng | [Nhận Ngay](/go/fun88) |
| **SUNWIN** | Tặng Code 50K Tân Thủ qua Telegram | 1 vòng | [Nhận Ngay](/go/sunwin) |
| **GO88** | Kích hoạt SĐT nhận ngay 50K | 1 vòng | [Nhận Ngay](/go/go88) |
    `,
  },
  {
    id: 'art-5',
    title: 'Bí Quyết Soi Kèo Bóng Đá Châu Á (Asian Handicap) Luôn Thắng Cho Người Mới',
    slug: 'bi-quyet-soi-keo-bong-da-chau-a',
    category: 'soi-keo',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    summary: 'Hướng dẫn đọc và phân tích bảng kèo châu Á chuẩn xác từ các cao thủ: cách nhận biết kèo bẫy của nhà cái, thời điểm vàng để vào kèo và quản lý vốn cược hiệu quả.',
    author: 'Chuyên gia Kèo VIP',
    views: 9630,
    seo: {
      metaTitle: 'Bí Quyết Soi Kèo Bóng Đá Châu Á - Kinh Nghiệm Cược Luôn Thắng',
      metaDescription: 'Học cách đọc kèo bóng đá châu Á (Handicap), cách nhận biết biến động odds và mẹo soi kèo bóng đá hiệu quả từ chuyên gia cá cược thể thao.',
      keywords: 'soi keo bong da, keo chau a, kinh nghiem bat keo, doc keo handicap',
    },
    createdAt: '2026-08-15T14:00:00.000Z',
    updatedAt: '2026-08-25T11:20:00.000Z',
    status: 'published',
    content: `
## 1. Kèo Châu Á (Asian Handicap) là gì?

Kèo châu Á là hình thức cược bóng đá phổ biến nhất tại Việt Nam và châu Á. Trong đó, nhà cái sẽ đưa ra một tỷ lệ chấp giữa đội mạnh (cửa trên) và đội yếu (cửa dưới) nhằm tạo ra sự cân bằng về mặt xác suất thắng cược.

---

## 2. Các tỷ lệ chấp phổ biến và cách đọc

- **Kèo Đồng Banh (0:0)**: Đội bạn chọn thắng thì ăn tiền, hòa thì về tiền (hoàn vốn).
- **Kèo Chấp Nửa Trái (0.5 hoặc 1/2)**: Đội cửa trên phải thắng cách biệt từ 1 bàn trở lên thì người chọn cửa trên mới ăn trọn tiền. Nếu hòa hoặc thua, người chọn cửa dưới ăn tiền.
- **Kèo Chấp Nửa Một (0.75 hoặc 3/4)**: Cửa trên thắng 1 bàn thì ăn nửa tiền; thắng từ 2 bàn trở lên ăn cả tiền; hòa hoặc thua thì mất cả tiền.
- **Kèo Chấp 1 Trái (1.0)**: Cửa trên thắng 1 bàn thì hòa tiền; thắng 2 bàn ăn cả tiền.

---

## 3. Ba nguyên tắc vàng khi soi kèo

1. **Phân tích biến động kèo 2 giờ trước trận đấu**: Nếu tỷ lệ chấp giảm nhưng tiền ăn (Odds) tăng đột biến, đó có thể là dấu hiệu nhà cái đang dụ người chơi dồn vốn vào cửa đó.
2. **Theo dõi tin tức lực lượng chấn thương & thẻ phạt**: Sự vắng mặt của các tiền đạo chủ lực hoặc thủ môn số 1 có thể làm thay đổi cục diện trận đấu.
3. **Tuyệt đối không tất tay (All-in)**: Mỗi trận đấu chỉ nên vào tối đa 5% - 10% tổng ngân sách vốn để duy trì sự bền vững.
    `,
  },
  {
    id: 'art-6',
    title: 'Hướng Dẫn Nạp Rút Tiền Bằng USDT Tại Các Nhà Cái: Bảo Mật, Không Bị Chặn',
    slug: 'huong-dan-nap-rut-tien-bang-usdt',
    category: 'huong-dan',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    summary: 'Cách nạp rút tiền cá cược bằng tiền mã hóa USDT (mạng TRC20 / ERC20) qua sàn Binance, Remitano hoặc ví Trust Wallet. Đảm bảo an toàn tuyệt đối và bảo mật danh tính.',
    author: 'Chuyên gia Kèo VIP',
    views: 6120,
    seo: {
      metaTitle: 'Hướng Dẫn Nạp Rút Tiền Nhà Cái Bằng USDT - An Toàn & Ẩn Danh',
      metaDescription: 'Cách mua USDT và nạp tiền vào nhà cái trực tuyến chi tiết từng bước. Rút tiền nhanh chóng không bị kiểm soát sao kê tài khoản ngân hàng.',
      keywords: 'nap tien nha cai bang usdt, rut tien usdt, nap tien crypto, choi ca cuoc an danh',
    },
    createdAt: '2026-08-18T10:00:00.000Z',
    updatedAt: '2026-08-26T08:45:00.000Z',
    status: 'published',
    content: `
## 1. Vì sao nên chọn nạp rút tiền bằng USDT?

Trong bối cảnh các ngân hàng thương mại ngày càng siết chặt các giao dịch liên quan đến cờ bạc trực tuyến, việc sử dụng tiền mã hóa (Cryptocurrency), đặc biệt là đồng **USDT (Tether)**, đang trở thành xu hướng hàng đầu:

- **Bảo mật danh tính 100%**: Không để lại lịch sử giao dịch sao kê liên quan đến nhà cái trên tài khoản ngân hàng cá nhân.
- **Tốc độ xử lý siêu tốc**: Mạng lưới TRON (TRC20) chỉ mất từ 30 giây đến 1 phút để hoàn thành một giao dịch.
- **Không giới hạn hạn mức**: Bạn có thể nạp hoặc rút từ vài triệu đến hàng tỷ đồng mà không gặp bất kỳ rào cản nào.

---

## 2. Quy trình nạp tiền USDT từng bước

1. **Bước 1**: Mở tài khoản ví cá nhân trên sàn giao dịch uy tín (ví dụ: Binance, Bybit, Remitano) hoặc ví phi tập trung (Trust Wallet, SafePal).
2. **Bước 2**: Mua USDT bằng chuyển khoản ngân hàng qua kênh P2P trên Binance.
3. **Bước 3**: Tại trang Nạp Tiền của Nhà cái, chọn phương thức **USDT (TRC20)** và sao chép địa chỉ ví đích.
4. **Bước 4**: Mở ứng dụng ví của bạn, chọn **Rút tiền / Gửi (Withdraw)** -> dán địa chỉ ví nhà cái và chọn đúng mạng **TRC20**.
5. **Bước 5**: Xác nhận giao dịch. Tiền sẽ được quy đổi tự động sang điểm cược (VND) sau vài giây.
    `,
  },
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Làm thế nào để nhận biết một nhà cái uy tín và không lừa đảo?',
    answer: 'Một nhà cái uy tín bắt buộc phải có giấy phép hoạt động hợp pháp từ các tổ chức cờ bạc quốc tế (PAGCOR, Isle of Man, Curacao), hoạt động tối thiểu trên 3 năm, có hệ thống nạp rút tiền minh bạch dưới 15 phút và hỗ trợ khách hàng 24/7 bằng tiếng Việt.',
    order: 1,
  },
  {
    id: 'faq-2',
    question: 'Tham gia cá cược trực tuyến tại các nhà cái này có an toàn không?',
    answer: 'Các nhà cái trong bảng xếp hạng của KEOVIP247 đều ứng dụng công nghệ bảo mật SSL 256-bit cao cấp nhất, máy chủ đặt tại nước ngoài và cam kết không chia sẻ dữ liệu người dùng cho bất kỳ bên thứ ba nào.',
    order: 2,
  },
  {
    id: 'faq-3',
    question: 'Thời gian nạp và rút tiền về tài khoản ngân hàng mất bao lâu?',
    answer: 'Thông thường thời gian nạp tiền xử lý tự động từ 30 giây đến 2 phút qua quét mã QR hoặc USDT. Thời gian rút tiền về tài khoản ngân hàng chính chủ dao động từ 3 đến 10 phút tùy theo từng ngân hàng.',
    order: 3,
  },
  {
    id: 'faq-4',
    question: 'Làm sao để nhận tiền cược miễn phí (Freebet) khi đăng ký tài khoản?',
    answer: 'Sau khi đăng ký qua link cược chính thức trên KEOVIP247, bạn chỉ cần liên kết số điện thoại và xác minh tài khoản, sau đó liên hệ CSKH hoặc kiểm tra hòm thư khuyến mãi để nhận ngay mã giftcode hoặc tiền cược trải nghiệm.',
    order: 4,
  },
  {
    id: 'faq-5',
    question: 'Nếu link truy cập nhà cái bị chặn thì phải làm sao?',
    answer: 'Bạn chỉ cần truy cập vào KEOVIP247 và bấm nút "Cược Ngay" hoặc "Link Mới Nhất", hệ thống định tuyến thông minh của chúng tôi sẽ tự động chuyển bạn đến đường link dự phòng chính thức mới nhất không bị chặn.',
    order: 5,
  },
  {
    id: 'faq-6',
    question: 'Tôi có thể chơi game trên điện thoại di động (iOS / Android) được không?',
    answer: 'Tất cả các nhà cái và cổng game trong danh sách đều hỗ trợ ứng dụng chuyên biệt tải về trên cả iOS và Android, hoặc bạn có thể trải nghiệm trực tiếp mượt mà trên trình duyệt di động (Safari, Chrome).',
    order: 6,
  },
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'KEOVIP247',
  siteTitle: 'KEOVIP247 - Top 10 Nhà Cái Uy Tín Nhất Việt Nam 2026',
  siteDescription: 'Chuyên trang đánh giá & xếp hạng nhà cái, cổng game bài uy tín số 1 Việt Nam. Cập nhật khuyến mãi tân thủ, link vào mới nhất không bị chặn và mẹo soi kèo chuẩn xác.',
  logo: '/images/logo.png',
  hotline: '0988.888.247',
  telegram: 'https://t.me/keovip247_support',
  zalo: 'https://zalo.me/keovip247',
  email: 'contact@keovip247.com',
  footerDisclaimer: 'Cảnh báo trách nhiệm: Các trò chơi cá cược trực tuyến chỉ dành cho người từ đủ 18 tuổi trở lên. Hãy tham gia cá cược có trách nhiệm và xem đây là hình thức giải trí có chừng mực.',
  announcementBar: '🔥 Chào mừng tân thủ: Nhận ngay 199K cược thử miễn phí khi đăng ký qua KEOVIP247 hôm nay!',
  heroTitle: 'BẢNG XẾP HẠNG NHÀ CÁI UY TÍN SỐ 1 VIỆT NAM 2026',
  heroSubtitle: 'Kiểm định độc lập hơn 50+ nhà cái & cổng game. Cập nhật link vào mới nhất, bảo đảm an toàn, rút tiền siêu tốc 3 phút.',
};
