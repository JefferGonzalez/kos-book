'use client'

import SideNav from "@/components/common/LateralBar";


export default function Layout({
  children,}: {children: React.ReactNode;}
)
{
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow_hidden">
      <div className="w-full flex-none md:w-64">
      <SideNav/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p12">{children}</div>
    </div>
  );
}