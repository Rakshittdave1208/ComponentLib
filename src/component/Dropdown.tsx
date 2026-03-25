import React, { useState, useRef, useEffect } from "react";

type DropdownItem = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;
  items?: DropdownItem[];
  onSelect?: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  label = "Select Option",
  items = [
    { label: "Profile", value: "profile" },
    { label: "Settings", value: "settings" },
    { label: "Logout", value: "logout" },
  ],
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: DropdownItem) => {
    setSelected(item.label);
    onSelect?.(item.value);
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-56">
      {/* Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
      >
        <span className="text-gray-700">
          {selected || label}
        </span>

        {/* Chevron */}
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Menu */}
      <div
        className={`absolute mt-2 w-full bg-white border rounded-xl shadow-lg overflow-hidden transition-all duration-200 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {items.map((item) => (
          <div
            key={item.value}
            onClick={() => handleSelect(item)}
            className={`px-4 py-2 cursor-pointer transition 
              hover:bg-blue-50 
              ${selected === item.label ? "bg-blue-100 text-blue-600" : ""}
            `}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;