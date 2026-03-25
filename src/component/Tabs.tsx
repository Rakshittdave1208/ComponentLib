import React, { createContext, useContext, useState } from "react";

// Tailwind CSS via CDN — inject into <head> once

// A self-contained style injector that adds Tailwind's CDN play script
const TailwindCDN = () => {
  React.useEffect(() => {
    if (document.getElementById("tailwind-cdn")) return;
    const script = document.createElement("script");
    script.id = "tailwind-cdn";
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);
  }, []);
  return null;
};

// ─── Context ─────────────────────────────────────────────
type TabsContextType = {
  value: string;
  setValue: (val: string) => void;
};
const TabsContext = createContext<TabsContextType | null>(null);

// ─── Main Tabs ───────────────────────────────────────────
type TabsProps = {
  defaultValue: string;
  children: React.ReactNode;
};
export const Tabs = ({ defaultValue, children }: TabsProps) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <>
      <TailwindCDN />
      <TabsContext.Provider value={{ value, setValue }}>
        <div className="w-full max-w-md">{children}</div>
      </TabsContext.Provider>
    </>
  );
};

// ─── Tabs List ───────────────────────────────────────────
export const TabsList = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex border-b mb-4">{children}</div>;
};

// ─── Tabs Trigger ────────────────────────────────────────
type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
};
export const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used inside Tabs");
  const { value: active, setValue } = context;
  return (
    <button
      onClick={() => setValue(value)}
      className={`px-4 py-2 transition ${
        active === value
          ? "border-b-2 border-blue-600 text-blue-600 font-medium"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
};

// ─── Tabs Content ────────────────────────────────────────
type TabsContentProps = {
  value: string;
  children: React.ReactNode;
};
export const TabsContent = ({ value, children }: TabsContentProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used inside Tabs");
  return context.value === value ? (
    <div className="p-4 bg-white rounded-lg shadow">{children}</div>
  ) : null;
};