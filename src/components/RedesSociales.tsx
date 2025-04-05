// components/RedesSociales.tsx
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FaWhatsapp, FaX } from 'react-icons/fa6';
import Link from 'next/link';
import { FC } from 'react';

interface RedesSocialesProps {
  className?: string;
}

const RedesSociales: FC<RedesSocialesProps> = ({ className = '' }) => {
  return (
    <div className={`fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 p-3 rounded-l-lg z-50 bg-white ${className}`}>
      <Link href="https://wa.me/your-number" aria-label="WhatsApp" className="block" target='_blank'>
        <div className="p-2 rounded-2xl transition-colors hover:bg-green-500/20">
          <FaWhatsapp className="w-8 h-8 text-green-500" />
        </div>
      </Link>
      <Link href="https://facebook.com/your-page" aria-label="Facebook" className="block" target='_blank'>
        <div className="p-2 rounded-2xl transition-colors hover:bg-blue-600/20">
          <FaFacebook className="w-8 h-8 text-blue-600" />
        </div>
      </Link>
      <Link href="https://instagram.com/your-profile" aria-label="Instagram" className="block" target='_blank'>
        <div className="p-2 rounded-2xl transition-colors hover:bg-pink-600/20">
          <FaInstagram className="w-8 h-8 text-pink-600" />
        </div>
      </Link>
      <Link href="https://tiktok.com/@your-account" aria-label="TikTok" className="block" target='_blank'>
        <div className="p-2 rounded-2xl transition-colors hover:bg-black/30">
          <FaTiktok className="w-8 h-8 text-black" />
        </div>
      </Link>
      <Link href="https://x.com/your-handle" aria-label="Twitter" className="block" target='_blank'>
        <div className="p-2 rounded-2xl transition-colors hover:bg-black/20">
          <FaX className="w-8 h-8 text-black" />
        </div>
      </Link>
      <Link href="https://youtube.com/your-channel" aria-label="YouTube" className="block" target='_blank'>
        <div className="p-2 rounded-2xl transition-colors hover:bg-red-600/20">
          <FaYoutube className="w-8 h-8 text-red-600" />
        </div>
      </Link>
    </div>
  );
};

export default RedesSociales;
