'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/axios';
import { API_URL } from '@/src/lib/config';

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // --- ส่วนที่เพิ่มใหม่: State สำหรับ Search & Filter ---
  const [searchName, setSearchName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('desc'); // ค่าเริ่มต้น: ราคาแพงไปถูก

  // ฟังก์ชันดึงข้อมูลแบบใส่เงื่อนไข
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products', {
        params: {
          name: searchName,
          minPrice: minPrice,
          maxPrice: maxPrice,
          sort: sort
        }
      });
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // โหลดครั้งแรก

  if (loading) {
    return <p className="text-center text-zinc-400">กำลังโหลด...</p>;
  }

  return (
    <div className="px-10 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">📦 รายการสินค้า</h1>

      {/* --- ส่วนที่เพิ่มใหม่: UI สำหรับการค้นหา --- */}
      <div className="bg-zinc-900 p-6 rounded-2xl mb-10 flex flex-wrap gap-4 items-end justify-center border border-zinc-800">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">ชื่อสินค้า</label>
          <input
            type="text"
            placeholder="ค้นหาชื่อ..."
            className="bg-zinc-800 text-white p-2 rounded-lg border border-zinc-700 w-48"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">ราคา (ต่ำสุด - สูงสุด)</label>
          <div className="flex gap-2">
            <input
              type="number" placeholder="10"
              className="bg-zinc-800 text-white p-2 rounded-lg border border-zinc-700 w-24"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number" placeholder="5000"
              className="bg-zinc-800 text-white p-2 rounded-lg border border-zinc-700 w-24"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">เรียงตามราคา</label>
          <select
            className="bg-zinc-800 text-white p-2 rounded-lg border border-zinc-700"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="desc">แพง - ถูก</option>
            <option value="asc">ถูก ไป แพง</option>
          </select>
        </div>
        <button
          onClick={fetchProducts}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold transition"
        >
          ค้นหา
        </button>
      </div>

      {/* รายการสินค้า (เหมือนเดิมแต่เปลี่ยน id เป็น _id) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <Link
            key={product._id}
            href={`/product/${product._id}`}
            className="bg-zinc-800 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col border border-zinc-700"
          >
            {/* รูปสินค้า */}
            <img
              src={`${API_URL}/uploads/${product.imageUrl}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold mb-2 text-white">
              {product.name}
            </h2>

            <div className="inline-flex items-center gap-2 bg-green-900/30 text-green-400 px-4 py-1 rounded-full w-fit mb-3 border border-green-800">
              {product.price.toLocaleString()} ฿
            </div>

            <p className="text-zinc-400 text-sm mb-4">
              สินค้าคงเหลือ: {product.stock} ชิ้น
            </p>

            <span className="text-blue-400 font-medium self-end">
              ดูรายละเอียด →
            </span>
          </Link>
        ))}

      </div>
    </div>
  );
}