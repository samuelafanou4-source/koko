export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 max-w-[85%] md:max-w-[75%] animate-fadeIn">
      <div className="w-8 h-8 rounded-full bg-primary-fixed/50 flex items-center justify-center p-1 text-primary text-xs shrink-0">
        🌿
      </div>
      <div className="bg-surface-container-lowest rounded-t-2xl rounded-br-2xl rounded-bl-sm p-4 shadow-sm border border-outline-variant/30 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" />
        <span
          className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
        <span className="font-label text-label-sm text-on-surface-variant ml-2">
          Koko réfléchit avec douceur...
        </span>
      </div>
    </div>
  );
}

