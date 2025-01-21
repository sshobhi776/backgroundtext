export async function convertHeicToJpeg(file: File): Promise<File> {
  try {
    const heic2any = (await import('heic2any')).default;
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.8
    });
    
    const jpegFile = new File(
      [convertedBlob instanceof Blob ? convertedBlob : convertedBlob[0]], 
      file.name.replace(/\.(heic|heif)$/i, '.jpg'),
      { type: 'image/jpeg' }
    );
    
    return jpegFile;
  } catch (error) {
    console.error('Error converting HEIC to JPEG:', error);
    throw new Error('Failed to convert HEIC image');
  }
}
