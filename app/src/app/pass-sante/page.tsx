"use client";

import { useState, useEffect, useCallback } from "react";
import { HealthCenterMap, MapCenterItem } from "@/components/map/HealthCenterMap";
import { VoucherModal } from "@/components/vouchers/VoucherModal";
import Link from "next/link";
import { AuthGate } from "@/components/auth/AuthGate";
import { EMERGENCY_CONTACTS } from "@/lib/constants";

export default function PassSantePage() {
  // Only verified centers from the database are ever displayed
  const [centers, setCenters] = useState<MapCenterItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [cityFilter, setCityFilter] = useState("all");
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Voucher modal state
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [activeVoucher, setActiveVoucher] = useState<{
    code: string;
    centerName: string;
    centerAddress: string;
    city: string;
    priceInfo: string;
    expiresAt: string;
    qrData: string;
  } | null>(null);
  const [generatingVoucher, setGeneratingVoucher] = useState<string | null>(null);

  const fetchCenters = useCallback(async (coords?: { lat: number; lng: number }) => {
    setLoading(true);
    try {
      let url = `/api/health-centers?city=${cityFilter}`;
      if (coords) {
        url += `&lat=${coords.lat}&lng=${coords.lng}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setCenters(Array.isArray(data.centers) ? data.centers : []);
    } catch {
      setCenters([]);
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, [cityFilter]);

  useEffect(() => {
    fetchCenters(userCoords || undefined);
  }, [fetchCenters, userCoords]);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par ton navigateur.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserCoords(coords);
        fetchCenters(coords);
      },
      () => {
        // Fallback default coordinates Lomé
        const fallback = { lat: 6.1375, lng: 1.2125 };
        setUserCoords(fallback);
        fetchCenters(fallback);
      }
    );
  };

  const handleGenerateVoucher = async (center: MapCenterItem) => {
    setGeneratingVoucher(center.id);
    try {
      const res = await fetch("/api/vouchers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ healthCenterId: center.id }),
      });
      const data = await res.json();
      if (data.voucher) {
        setActiveVoucher(data.voucher);
        setIsVoucherOpen(true);
      } else {
        alert(data.error || "Impossible de générer le bon pour le moment.");
      }
    } catch {
      alert("Impossible de générer le bon pour le moment.");
    } finally {
      setGeneratingVoucher(null);
    }
  };

  return (
    <AuthGate>
    <div className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md md:py-space-lg flex flex-col gap-space-lg">
      {/* Header Arch Card */}
      <div className="relative overflow-hidden rounded-t-[2.5rem] rounded-b-2xl bg-primary-fixed/25 p-space-md sm:p-space-lg md:p-space-xl border border-primary/20 flex flex-col md:flex-row md:items-center justify-between gap-space-md shadow-xs">
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label text-label-sm w-fit font-semibold shadow-xs">
            <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
              local_hospital
            </span>
            <span>Réseau &quot;Girl-Friendly&quot;</span>
          </div>
          <h1 className="font-display text-display text-on-surface font-bold">
            Pass Santé
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Un bon anonyme pour consulter dans un centre vérifié.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 items-start md:items-end">
          <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-full shadow-xs border border-outline-variant/30 text-xs font-label">
            <span aria-hidden="true" className="material-symbols-outlined text-primary text-[18px]">
              qr_code_scanner
            </span>
            <span>Code QR Anonyme • Zéro question indiscrète</span>
          </div>

          <button
            onClick={handleLocateMe}
            disabled={loading}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label text-label-md font-semibold hover:bg-primary-container transition-all shadow-xs disabled:opacity-50"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
              my_location
            </span>
            <span>{loading ? "Recherche en cours..." : "Trouver le plus proche"}</span>
          </button>
        </div>
      </div>

      {hasLoaded && centers.length === 0 && cityFilter === "all" ? (
        <div className="rounded-3xl bg-surface-container-low border border-outline-variant/50 p-6 md:p-8 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
            <span aria-hidden="true" className="material-symbols-outlined text-[24px]">handshake</span>
          </div>
          <h2 className="font-headline text-headline-md text-on-surface font-bold">
            Le réseau de centres partenaires arrive bientôt
          </h2>
          <p className="font-body text-body-md text-on-surface-variant max-w-2xl">
            Aucun centre n&apos;est encore vérifié.
          </p>
          <p className="font-body text-body-md text-on-surface font-semibold">
            En attendant, tu peux être écoutée :
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${EMERGENCY_CONTACTS.ligneVerteEcoute}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-on-primary font-label text-label-md hover:bg-primary-container transition-colors"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">call</span>
              Ligne Verte {EMERGENCY_CONTACTS.ligneVerteEcoute}
            </a>
            <Link
              href="/assistant-koko"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-surface-container-lowest text-on-surface border border-outline-variant font-label text-label-md hover:border-primary/50 transition-colors"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">chat_bubble</span>
              Poser ma question à Koko
            </Link>
          </div>
        </div>
      ) : (
      <>
      {/* City Filters */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {["all", "Lomé", "Kara"].map((c) => (
            <button
              key={c}
              onClick={() => setCityFilter(c)}
              type="button"
              className={`px-4 py-1.5 rounded-full font-label text-label-sm transition-all border ${
                cityFilter === c
                  ? "bg-primary text-on-primary font-semibold border-primary shadow-xs"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border-outline-variant/30"
              }`}
            >
              {c === "all" ? "Toutes les villes" : c}
            </button>
          ))}
        </div>
        <span className="font-label text-label-sm text-on-surface-variant">
          {centers.length} centre(s) partenaire(s) répertorié(s)
        </span>
      </div>

      {/* Map Section */}
      <HealthCenterMap
        centers={centers}
        selectedCenterId={selectedCenterId}
        onSelectCenter={(id) => setSelectedCenterId(id)}
      />

      {/* Health Centers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {centers.map((center) => (
          <div
            key={center.id}
            className={`rounded-2xl bg-surface-container-lowest p-6 shadow-xs border transition-all duration-300 flex flex-col justify-between gap-4 ${
              selectedCenterId === center.id
                ? "border-primary ring-2 ring-primary/20 shadow-md"
                : "border-outline-variant/30 hover:shadow-md"
            }`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant font-label text-label-xs uppercase tracking-wider font-semibold">
                  {center.city}
                </span>
                {center.distanceKm !== undefined && (
                  <span className="font-label text-label-sm text-primary font-semibold flex items-center gap-1">
                    <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                      near_me
                    </span>
                    À {center.distanceKm} km
                  </span>
                )}
              </div>

              <h2 className="font-headline text-headline-sm text-on-surface font-bold leading-tight">
                {center.name}
              </h2>

              <p className="font-body text-body-sm text-on-surface-variant">
                {center.description}
              </p>

              <div className="flex flex-col gap-1 pt-1 text-xs">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px] text-primary">
                    location_on
                  </span>
                  <span>{center.address}</span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px] text-secondary">
                    call
                  </span>
                  <span>{center.phone}</span>
                </div>
              </div>

              {/* Price badge */}
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center gap-2 mt-2">
                <span aria-hidden="true" className="material-symbols-outlined text-primary text-[20px]">
                  savings
                </span>
                <span className="font-label text-label-sm text-primary font-bold">
                  {center.priceInfo}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between gap-2">
              <a
                href={`tel:${center.phone}`}
                className="px-4 py-2 rounded-full font-label text-label-sm text-on-surface-variant hover:bg-surface-container-high transition-colors flex items-center gap-1"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">call</span>
                <span>Appeler</span>
              </a>

              <button
                type="button"
                onClick={() => handleGenerateVoucher(center)}
                disabled={generatingVoucher === center.id}
                className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label text-label-sm font-semibold hover:bg-primary-container transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                  qr_code
                </span>
                <span>
                  {generatingVoucher === center.id
                    ? "Génération..."
                    : "Obtenir mon Pass QR"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      </>
      )}

      {/* Voucher Display Modal */}
      <VoucherModal
        isOpen={isVoucherOpen}
        onClose={() => setIsVoucherOpen(false)}
        voucher={activeVoucher}
      />
    </div>
    </AuthGate>
  );
}
