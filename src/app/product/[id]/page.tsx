'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '../../../lib/axios';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  color: string;
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setError('ไม่พบสินค้า'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า?')) return;

    await api.delete(`/products/${id}`);
    router.push('/product');
  };

  if (loading) return <p className="text-center">กำลังโหลด...</p>;

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button onClick={() => router.push('/product')} className="underline">
          กลับ
        </button>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-md mx-auto bg-zinc-800 p-6 rounded-xl">
      <h2 className="text-4xl font-bold mb-4">รายละเอียดสินค้า</h2>

      <p className='text-2xl'>ชื่อสินค้า:</p>
      <p className='text-2xl text-blue-300'>{product.name}</p>
      <p className='text-2xl'>ราคาสินค้า:</p>
      <p className='text-2xl text-green-300'>{product.price} ฿ </p>
      <div className="flex items-center gap-3 text-2xl text-zinc-400">
        <span>สีของสินค้า:</span>

        <div
          className="w-8 h-8 rounded-full border border-white"
          style={{ backgroundColor: product.color }}
          title={product.color}
        />
      </div>

      <p className='text-2xl text-orange-300'>{product.stock} ชิ้น</p>
      <p className='text-2xl'>คำอธิบาย:</p>
      <p className='text-2xl text-violet-300'>{product.description}</p>
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => router.push(`/product/${id}/edit`)}
          className="flex-1 bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          แก้ไข
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 bg-red-600 py-2 rounded hover:bg-red-700"
        >
          ลบ
        </button>
      </div>
    </div>
  );
}
