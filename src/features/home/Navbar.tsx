import React from "react";
import { Button } from "@/components/ui/button";

export const Navbar: React.FC = () => {
  return (
    <div className="flex items-center h-[50px] p-9 justify-between bg-gradient-to-r from-[#f6fbff] to-[#f6fafd] border-b border-[#e5eaf0]">
      {/* Logo */}
      <div className="font-bold text-2xl bg-gradient-to-r from-[#5a6ff0] to-[#8f5fd6] bg-clip-text text-transparent">
        TalentFlow
      </div>

      {/* Menu */}
      <div className="flex gap-10">
        <a
          href="#problem"
          className="text-[#49566b] text-base font-medium hover:text-[#5a6ff0] transition"
        >
          Problem
        </a>
        <a
          href="#solution"
          className="text-[#49566b] text-base font-medium hover:text-[#5a6ff0] transition"
        >
          Solution
        </a>
        <a
          href="#features"
          className="text-[#49566b] text-base font-medium hover:text-[#5a6ff0] transition"
        >
          Features
        </a>
        <a
          href="#contact"
          className="text-[#49566b] text-base font-medium hover:text-[#5a6ff0] transition"
        >
          Contact
        </a>
      </div>

      {/* Button */}
      <Button className="rounded-full px-9 py-3 font-bold text-base bg-gradient-to-r from-[#5a6ff0] to-[#8f5fd6] text-white shadow-md hover:opacity-90 transition">
        Get Demo
      </Button>
    </div>
  );
};
