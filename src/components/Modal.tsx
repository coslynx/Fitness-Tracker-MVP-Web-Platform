'use client'

import React, { useState, useEffect } from 'react';
import { useModal } from '@/hooks/useModal';
import 'tailwindcss/tailwind.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  const [modalOpen, setModalOpen] = useModal(isOpen);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [modalOpen, onClose]);

  if (!modalOpen) {
    return null;
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${className}`}>
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {children}
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;