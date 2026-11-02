"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

export interface MapCenterItem {
  id: string;
  name: string;
  description?: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  priceInfo: string;
  isGirlFriendly?: boolean;
  isPartner?: boolean;
  distanceKm?: number;
}

interface HealthCenterMapProps {
  centers: MapCenterItem[];
  selectedCenterId?: string | null;
  onSelectCenter?: (id: string) => void;
}

// Dynamically import MapContainer and subcomponents without SSR
const MapContent = dynamic(
  () =>
    import("react-leaflet").then((mod) => {
      const { MapContainer, TileLayer, Marker, Popup } = mod;
      return function DynamicMap({
        centers,
        onSelectCenter,
      }: HealthCenterMapProps) {
        // Fix Leaflet's default icon missing in React
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const L = require("leaflet");
        const defaultIcon = L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        // Default to Lomé center: 6.1375, 1.2125
        const defaultPosition: [number, number] = [6.1375, 1.2125];

        return (
          <MapContainer
            center={defaultPosition}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-full rounded-2xl z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {centers.map((c) => (
              <Marker
                key={c.id}
                position={[c.latitude, c.longitude]}
                icon={defaultIcon}
                eventHandlers={{
                  click: () => onSelectCenter && onSelectCenter(c.id),
                }}
              >
                <Popup>
                  <div className="p-1 font-body text-xs">
                    <strong className="text-sm text-primary block mb-1">
                      {c.name}
                    </strong>
                    <div className="text-gray-600 mb-1">{c.address}</div>
                    <div className="text-emerald-700 font-semibold mb-1">
                      {c.priceInfo}
                    </div>
                    {c.distanceKm !== undefined && (
                      <div className="text-gray-500 text-label-sm">
                        À environ {c.distanceKm} km
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        );
      };
    }),
  { ssr: false }
);

export function HealthCenterMap(props: HealthCenterMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-72 md:h-96 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant font-label text-label-sm">
        Chargement de la carte des centres partenaires...
      </div>
    );
  }

  return (
    <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 relative">
      <MapContent {...props} />
    </div>
  );
}

