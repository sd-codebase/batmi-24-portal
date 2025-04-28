import React from "react";
import {
  // Outline style icons
  HomeIcon,
  UserIcon,
  BellIcon,
  EnvelopeIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  // Solid style icons
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  HeartIcon,
  StarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

import {
  // Mini icons
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

export default function IconsDemo() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Heroicons Demo</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Outline Icons (24px)</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col items-center">
            <HomeIcon className="h-6 w-6 text-blue-600" />
            <span className="text-sm mt-1">HomeIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <UserIcon className="h-6 w-6 text-green-600" />
            <span className="text-sm mt-1">UserIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <BellIcon className="h-6 w-6 text-yellow-600" />
            <span className="text-sm mt-1">BellIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <EnvelopeIcon className="h-6 w-6 text-purple-600" />
            <span className="text-sm mt-1">EnvelopeIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <CalendarIcon className="h-6 w-6 text-red-600" />
            <span className="text-sm mt-1">CalendarIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
            <span className="text-sm mt-1">MagnifyingGlassIcon</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Solid Icons (as outline import)
        </h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col items-center">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
            <span className="text-sm mt-1">ChatBubbleLeftRightIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <DocumentTextIcon className="h-6 w-6 text-green-600" />
            <span className="text-sm mt-1">DocumentTextIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <HeartIcon className="h-6 w-6 text-red-600" />
            <span className="text-sm mt-1">HeartIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <StarIcon className="h-6 w-6 text-yellow-600" />
            <span className="text-sm mt-1">StarIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheckIcon className="h-6 w-6 text-purple-600" />
            <span className="text-sm mt-1">ShieldCheckIcon</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Mini Icons (20px)</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col items-center">
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
            <span className="text-sm mt-1">ArrowRightIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
            <span className="text-sm mt-1">CheckCircleIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <ExclamationCircleIcon className="h-5 w-5 text-yellow-600" />
            <span className="text-sm mt-1">ExclamationCircleIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <XMarkIcon className="h-5 w-5 text-red-600" />
            <span className="text-sm mt-1">XMarkIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            <span className="text-sm mt-1">ChevronRightIcon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
