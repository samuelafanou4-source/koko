import Link from "next/link";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  isCrisis?: boolean;
  actions?: {
    label: string;
    action: string;
    phone?: string;
  }[];
}

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end gap-2.5 items-end pl-10 animate-fadeIn">
        <div className="flex flex-col items-end gap-1 max-w-[85%] md:max-w-[75%]">
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-label-sm pr-1">
            <span>Moi</span>
            {message.timestamp && (
              <>
                <span>•</span>
                <span>{message.timestamp}</span>
              </>
            )}
          </div>
          <div className="bg-primary text-on-primary rounded-t-2xl rounded-bl-2xl rounded-br-sm p-4 shadow-sm font-body text-body-md leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs shrink-0 mb-1">
          🌸
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 max-w-[90%] md:max-w-[80%] animate-fadeIn">
      <div className="w-8 h-8 rounded-full bg-primary-fixed/50 flex items-center justify-center p-1 text-primary text-xs shrink-0 mt-1">
        🌿
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-label-sm pl-1">
          <span className="font-semibold text-primary">Koko</span>
          {message.timestamp && (
            <>
              <span>•</span>
              <span>{message.timestamp}</span>
            </>
          )}
        </div>

        <div className="bg-surface-container-lowest text-on-surface rounded-t-2xl rounded-br-2xl rounded-bl-sm p-4 md:p-5 shadow-sm border border-outline-variant/30 font-body text-body-md leading-relaxed whitespace-pre-wrap">
          {message.content}

          {/* Crisis SOS card if triggered */}
          {message.isCrisis && message.actions && message.actions.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-tertiary-fixed/40 border border-tertiary-container/30 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-tertiary font-headline text-headline-sm font-bold">
                <span className="material-symbols-outlined text-[20px]">support</span>
                <span>Actions d&apos;urgence confidentielles</span>
              </div>
              <div className="flex flex-col gap-2 mt-1">
                {message.actions.map((act, i) => {
                  if (act.phone) {
                    return (
                      <a
                        key={i}
                        href={`tel:${act.phone}`}
                        className="flex items-center justify-between px-4 py-2.5 rounded-full bg-tertiary text-on-tertiary font-label text-label-md hover:bg-tertiary-container transition-colors shadow-xs"
                      >
                        <span>{act.label}</span>
                        <span className="material-symbols-outlined text-[18px]">
                          call
                        </span>
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={i}
                      href={
                        act.action === "NAVIGATE_HEALTH_PASS"
                          ? "/pass-sante"
                          : "/sos-ecoute"
                      }
                      className="flex items-center justify-between px-4 py-2.5 rounded-full bg-surface text-on-surface font-label text-label-md border border-outline-variant/40 hover:bg-surface-container transition-colors"
                    >
                      <span>{act.label}</span>
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

