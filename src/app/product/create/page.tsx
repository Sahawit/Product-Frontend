'use client';

import { useState } from 'react';
import { api } from '../../../lib/axios';
import { describe } from 'zod/v4/core';

export default function CreateProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (price === '' || stock === '') {
      setError('กรุณากรอกตัวเลขให้ครบ');
      return;
    }

    try {
      setLoading(true);
      await api.post('/products', {
        name,
        price: Number(price),
        stock: Number(stock),
        description: String(description),
      });
      window.location.href = '/product';
    } catch (err: any) {
      setError(err?.response?.data?.message || 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-800 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">➕ เพิ่มสินค้า</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700"
          placeholder="ชื่อสินค้า"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          min={0}
          max={1000000}
          className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700"
          placeholder="ราคา"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <input
          type="number"
          min={0}
          max={1000000}
          className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700"
          placeholder="จำนวน"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />

        <input
          type="text"
          maxLength={100}
          className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700"
          placeholder="คำอธิบาย"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
      </form>
    </div>
  );
}
