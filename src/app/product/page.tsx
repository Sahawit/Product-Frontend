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
    <div className="px-10 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        📦 รายการสินค้า
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="bg-zinc-800 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between"
          >
            {/* ชื่อสินค้า */}
            <h2 className="text-2xl font-bold mb-4 text-white">
              {product.name}
            </h2>

            {/* ราคา */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full w-fit mb-3">
              ราคาสินค้า {product.price} ฿
            </div>

            {/* คงเหลือ */}
            <p className="inline-flex items-center gap-2 bg-orange-100 text-orange-500 px-4 py-1 rounded-full w-fit mb-3">
              สินค้าคงเหลือ : {product.stock} ชิ้น
            </p>

            {/* ลิงก์ดูรายละเอียด */}
            <span
              className=" text-white font-medium mt-auto self-end transition-transform duration-200 hover:scale-90 origin-right"
            >
              ดูรายละเอียด →
            </span>
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
