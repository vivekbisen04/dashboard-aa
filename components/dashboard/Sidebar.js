// components/dashboard/Sidebar.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  ];

  return (
    <div className="h-screen bg-indigo-800 w-64 flex-shrink-0">
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center justify-center">
          <h2 className="text-white text-lg font-semibold">Admin Panel</h2>
        </div>
        <nav className="mt-5 flex-1 px-2 bg-indigo-800 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-100 hover:bg-indigo-700'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150`}
              >
                <svg
                  className={`${
                    isActive ? 'text-indigo-300' : 'text-indigo-400 group-hover:text-indigo-300'
                  } mr-3 h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={item.icon}
                  />
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}