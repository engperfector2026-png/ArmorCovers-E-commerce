// components/Layout.tsx
import type { ReactNode } from "react"; // type-only import
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar stays outside themed wrapper */}
      <Navbar />

      {/* Themed wrapper for all page content */}
      <main className="grow bg-gray-50 text-gray-900">
        {children}
      </main>

      {/* Footer stays outside themed wrapper */}
      <Footer />
    </div>
  );
}

export default Layout;
