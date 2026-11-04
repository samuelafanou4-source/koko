"use client";

import { Component, type ReactNode } from "react";
import { reportClientError } from "@/lib/client-errors";

interface SectionBoundaryProps {
  /** Fixed identifier used in the (safe) error report, e.g. "dashboard-cycle". */
  name: string;
  children: ReactNode;
  className?: string;
}

/** Small inline notice shown in place of a section that failed. */
export function SectionFallback({ onRetry, className = "" }: { onRetry?: () => void; className?: string }) {
  return (
    <div
      role="status"
      className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40 ${className}`}
    >
      <span aria-hidden="true" className="material-symbols-outlined text-[22px] text-on-surface-variant">
        cloud_off
      </span>
      <p className="flex-1 font-body text-body-sm text-on-surface-variant">
        Cette partie n&apos;a pas pu se charger. Le reste de ton espace fonctionne.
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="self-start sm:self-auto px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant font-label text-label-md text-on-surface hover:border-primary/50 hover:text-primary transition-colors"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}

/**
 * Error boundary for one section of a page: if this part crashes while
 * rendering, only it is replaced by a small notice, the rest of the page
 * stays usable. The failure is still reported (safely) to the server logs.
 */
export class SectionBoundary extends Component<SectionBoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    reportClientError(`section-${this.props.name}`, error);
  }

  private retry = () => this.setState({ failed: false });

  render() {
    if (this.state.failed) {
      return <SectionFallback onRetry={this.retry} className={this.props.className} />;
    }
    return this.props.children;
  }
}
