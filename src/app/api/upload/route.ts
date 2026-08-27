import { NextRequest, NextResponse } from 'next/server';
import { uploadToImageKit, isImageKitConfigured } from '@/lib/imagekit';
import { isAdminAuthenticated } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
  }

  try {
    const contentType = req.headers.get('content-type') || '';
    let fileBase64 = '';
    let fileName = `upload-${Date.now()}.png`;
    let folder = '/affiliate-assets';

    if (contentType.includes('application/json')) {
      const body = await req.json();
      fileBase64 = body.file;
      fileName = body.fileName || fileName;
      folder = body.folder || folder;
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        fileBase64 = buffer.toString('base64');
        fileName = file.name;
      }
    }

    if (!fileBase64) {
      return NextResponse.json({ error: 'Không tìm thấy dữ liệu tệp tải lên' }, { status: 400 });
    }

    if (!isImageKitConfigured) {
      // In development or when ImageKit keys are not set, return a data URI or placeholder
      // and notify the user
      return NextResponse.json({
        success: true,
        url: fileBase64.startsWith('data:')
          ? fileBase64
          : `data:image/png;base64,${fileBase64}`,
        warning: 'ImageKit chưa được cấu hình trong .env.local (IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT). Đang dùng Base64 tạm thời.',
      });
    }

    const result = await uploadToImageKit(fileBase64, fileName, folder);
    return NextResponse.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Lỗi không xác định khi upload ảnh';
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
