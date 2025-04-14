"use client"
import Link from "next/link";

import { Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] font-montserrat text-white py-16">
      <div className="container mx-auto max-w-4xl xl:max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {/* Company Info */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <Image width={50} height={50} src="/logo.svg" alt="Arvan Logo" />
            </Link>
            <p className="text-[#999999] text-sm leading-relaxed">
              At The Arvan, we combine comfort and style. Our slippers elevate
              your day—whether you&apos;re relaxing, running errands, or just
              enjoying life—with the perfect balance of coziness and flair.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://twitter.com"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/thearvan.official?igsh=ZmlndGt0NGZ1bXF6"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-4">
              {["Home", "Products", "Track Order"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-[#999999] hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">SUPPORT</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="mailto:support@arvan.com"
                  className="text-[#999999] hover:text-white transition-colors"
                >
                  Email
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/thearvan.official?igsh=ZmlndGt0NGZ1bXF6"
                  target="_blank"
                  className="text-[#999999] hover:text-white transition-colors"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <p className="text-[#999999]">
                  Phone :{" "}
                  <Link
                    href="tel:917428637234"
                    className="hover:text-white transition-colors"
                  >
                    917428637234
                  </Link>
                </p>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div className="space-y-6">
            <h3 className="text-lg font-medium">NEWSLETTER</h3>
            <p className="text-[#999999] text-sm">
              Sign up for our newsletter and get the latest updates, news and
              product offers via email.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Email"
                className="rounded-r-none bg-[#1E1E1E] border-r-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                type="submit"
                className="rounded-l-none bg-white text-black hover:bg-white/90 px-4"
              >
                →
              </Button>
            </div>
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:justify-center items-center gap-8">
            <p className="text-sm text-[#999999]">
              © ARVAN | 2025 | ALL RIGHTS RESERVED
            </p>
            {/* <div className="flex items-center gap-8">
              <div className="flex gap-2"></div>
              <div className="text-sm text-[#999999]">
                MADE BY:{" "}
                <Link
                  href="https://webdrave.com"
                  className="text-white hover:text-[#999999] transition-colors"
                >
                  WEBDRAVE
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
