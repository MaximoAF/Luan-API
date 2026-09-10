import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const PERFUME_IMAGES_DIR = join(process.cwd(), 'uploads', 'perfumes');

if (!existsSync(PERFUME_IMAGES_DIR)) {
  mkdirSync(PERFUME_IMAGES_DIR, { recursive: true });
}

export const perfumeImageStorage = diskStorage({
  destination: PERFUME_IMAGES_DIR,
  filename: (req, file, callback) => {
    const id = (req.params as { id: string }).id;
    const ext = extname(file.originalname).toLowerCase();
    callback(null, `perfume-${id}-${Date.now()}${ext}`);
  },
});