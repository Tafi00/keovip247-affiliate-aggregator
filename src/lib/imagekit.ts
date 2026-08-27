import ImageKit from 'imagekit';

const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

export const isImageKitConfigured = Boolean(publicKey && privateKey && urlEndpoint);

export const imagekit = isImageKitConfigured
  ? new ImageKit({
      publicKey: publicKey!,
      privateKey: privateKey!,
      urlEndpoint: urlEndpoint!,
    })
  : null;

export async function uploadToImageKit(
  fileBase64: string,
  fileName: string,
  folder: string = '/affiliate-assets'
): Promise<{ url: string; fileId?: string }> {
  if (!imagekit) {
    throw new Error('ImageKit credentials are not configured in environment variables.');
  }

  const response = await imagekit.upload({
    file: fileBase64,
    fileName,
    folder,
    useUniqueFileName: true,
  });

  return {
    url: response.url,
    fileId: response.fileId,
  };
}
