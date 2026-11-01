"use client";

import { QRCodeSVG } from "qrcode.react";

export interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher: {
    code: string;
    centerName: string;
    centerAddress: string;
    city: string;
    priceInfo: string;
    expiresAt: string;
    qrData: string;
  } | null;
}

export function VoucherModal({ isOpen, onClose, voucher }: VoucherModalProps) {
  if (!isOpen || !voucher) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-surface-container-lowest max-w-sm w-full rounded-t-[2.5rem] rounded-b-2xl p-6 shadow-2xl border border-outline-variant/30 relative flex flex-col items-center text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant font-bold text-sm"
          title="Fermer"
        >
          ✕
        </button>

        {/* Reassurance pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant font-label text-label-sm mb-4">
          <span className="material-symbols-outlined text-[14px]">visibility_off</span>
          <span>Bon 100% Anonyme</span>
        </div>

        <h3 className="font-headline text-headline-sm text-on-surface mb-1 font-bold">
          Pass Santé Partenaire
        </h3>
        <p className="font-body text-body-sm text-on-surface-variant mb-4">
          Présente ce QR code à l&apos;accueil de la clinique pour bénéficier du tarif
          protégé sans donner ton nom.
        </p>

        {/* QR Code container */}
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-outline-variant/40 my-1">
          <QRCodeSVG
            value={voucher.qrData}
            size={180}
            level="M"
            includeMargin={true}
          />
        </div>

        {/* Voucher Code */}
        <div className="mt-3 px-4 py-1.5 rounded-full bg-surface-container-low font-mono font-bold text-primary tracking-wider text-sm">
          {voucher.code}
        </div>

        {/* Center & Price details */}
        <div className="w-full mt-4 p-3.5 rounded-xl bg-surface-container-low text-left flex flex-col gap-1 text-xs">
          <div className="font-semibold text-on-surface text-sm">
            {voucher.centerName}
          </div>
          <div className="text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            <span>
              {voucher.centerAddress}, {voucher.city}
            </span>
          </div>
          <div className="text-primary font-semibold flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-[14px]">savings</span>
            <span>{voucher.priceInfo}</span>
          </div>
          <div className="text-on-surface-variant/80 text-[11px] mt-1 pt-1 border-t border-outline-variant/20">
            Valable jusqu&apos;au {new Date(voucher.expiresAt).toLocaleDateString("fr-FR")}
          </div>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="mt-5 w-full py-2.5 rounded-full bg-primary text-on-primary font-label text-label-md hover:bg-primary-container transition-colors shadow-xs"
        >
          Enregistrer / Compris
        </button>
      </div>
    </div>
  );
}

