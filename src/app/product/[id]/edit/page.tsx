'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '../../../../lib/axios';
import { set } from 'zod';

export default function EditProductPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [name, setName] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/products/${id}`).then(res => {
            setName(res.data.name);
            setPrice(res.data.price);
            setStock(res.data.stock);
            setDescription(res.data.description || '');
            setLoading(false);
        });
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await api.patch(`/products/${id}`, {
            name,
            price,
            stock,
        });

        router.push(`/product/${id}`);
    };

    if (loading) return <p className="text-center">กำลังโหลด...</p>;

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-zinc-800 p-6 rounded-xl space-y-4"
        >
            <h2 className="text-xl font-bold">แก้ไขสินค้า</h2>
            <div className="space-1">
                <p>ชื่อสินค้า</p>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-700 hover:bg-zinc-600 transition"
                    placeholder="ชื่อสินค้า"
                />
            </div>
            <div className="space-1">
                <p>ราคา</p>
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full p-2 rounded bg-zinc-700 hover:bg-zinc-600 transition"
                    placeholder="ราคา"
                />
            </div>
            <div className="space-1">
                <p>จำนวน</p>
                <input
                    type="number"
                    value={stock}
                    onChange={e => setStock(Number(e.target.value))}
                    className="w-full p-2 rounded bg-zinc-700 hover:bg-zinc-600 transition"
                    placeholder="จำนวน"
                />
            </div>
            <div className="space-y-1">
                <p>คำอธิบายสินค้า</p>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-700 hover:bg-zinc-600 transition"
                    placeholder="ระบุรายละเอียดสินค้า..."
                />
            </div>

            <button className="w-full bg-green-600 py-2 rounded hover:bg-green-700">
                บันทึก
            </button>
        </form>
    );
}
