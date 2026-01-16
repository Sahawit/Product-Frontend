import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-6">
        {/* ชื่อเว็บ */}
        <h1 className="text-5xl font-bold">
          📦 Product Manager
        </h1>

        {/* คำอธิบาย */}
        <p className="text-zinc-400 text-lg">
          เว็บสำหรับจัดการและแสดงรายการสินค้า
        </p>

        {/* ปุ่มไปหน้าสินค้า */}
        <Link
          href="/product"
          className="
            inline-block
            px-8
            py-3
            rounded-full
            bg-blue-600
            hover:bg-blue-400
            transition
            text-lg
            font-medium
          "
        >
          <div className="transition-transform duration-300 hover:scale-90 origin-right">
            ดูรายการสินค้า →
          </div>
        </Link>
      </div>
    </div>
  );
}
