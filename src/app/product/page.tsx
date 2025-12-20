'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/axios';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products').then(res => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-center text-zinc-400">กำลังโหลด...</p>;
  }

  return (
    <div className="w-full px-10 py-6">
      <div className="flex justify-center items-center mb-10">
        <h1 className="text-4xl font-bold">📦 รายการสินค้า</h1>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(product => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="block bg-zinc-800 hover:bg-zinc-700 p-4 rounded-lg border border-zinc-700 transition"
          >
            <div className="flex justify-between items-center ">
              <div>
                <p className="font-semibold text-2xl">{product.name}</p>
                <p className="text-zinc-400 text-lg">
                  ราคา {product.price} บาท 
                </p>
                <p className="text-zinc-400 text-lg">คงเหลือ {product.stock}</p>

              </div>

              <span className="text-blue-400 text-lg font-medium transition-transform duration-300 hover:scale-90 origin-right">
                ดูรายละเอียด →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-zinc-400 mt-10">
          ยังไม่มีสินค้า
        </p>
      )}
    </div>
  );
}
