import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'ชื่อสินค้าห้ามว่าง'),
  price: z.number().min(1, 'ราคาต้องมากกว่า 0'),
  stock: z.number().min(0, 'Stock ห้ามติดลบ'),
  description: z.string().max(500, 'คำอธิบายห้ามเกิน 500 ตัวอักษร').optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
