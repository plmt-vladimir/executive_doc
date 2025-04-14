import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[--color-background] text-[--color-text]">
      {/* Боковая панель с одной границей справа */}
      <aside className="w-64 border-r border-[--color-border] flex flex-col">
        <Sidebar />
      </aside>

      {/* Контент с одним вертикальным скроллом */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}