import { RequireAuth } from "@/components/utils";
import { Navbar, Sidebar } from "@/components/common";
import { WebSocketProvider } from "@/hooks/webSocketContext";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <RequireAuth>
      <WebSocketProvider>
        <Navbar />
        <div className="flex bg-black/[0.96] antialiased bg-grid-white/[0.02]">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <div className="p-5 w-full max-w-[1140px]">{children}</div>
        </div>
      </WebSocketProvider>
    </RequireAuth>
  );
}