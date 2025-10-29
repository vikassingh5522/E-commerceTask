import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RoutesFile from "./routes";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-4 container mx-auto">
        <RoutesFile />
      </main>
      <Footer />
    </div>
  );
}
