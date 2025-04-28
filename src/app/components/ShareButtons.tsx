"use client";

import { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaLink,
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-3">Share this article:</h3>
      <div className="flex flex-wrap gap-3">
        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity"
          aria-label="Share on Facebook"
        >
          <FaFacebook size={20} />
        </a>

        {/* Twitter/X */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:opacity-90 transition-opacity"
          aria-label="Share on X (Twitter)"
        >
          <FaTwitter size={20} />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#25D366] text-white rounded-full hover:opacity-90 transition-opacity"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp size={20} />
        </a>

        {/* Instagram - Opens Instagram, but doesn't directly share */}
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white rounded-full hover:opacity-90 transition-opacity"
          aria-label="Share on Instagram"
          title="Open Instagram (copy link to share)"
        >
          <FaInstagram size={20} />
        </a>

        {/* Threads */}
        <a
          href="https://www.threads.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:opacity-90 transition-opacity"
          aria-label="Share on Threads"
          title="Open Threads (copy link to share)"
        >
          <SiThreads size={20} />
        </a>

        {/* Copy URL */}
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-10 h-10 bg-gray-700 text-white rounded-full hover:opacity-90 transition-opacity relative"
          aria-label="Copy URL"
        >
          <FaLink size={18} />
          {copied && (
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
