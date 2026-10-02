import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-white">
      <div className="relative flex items-center justify-center">
      
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      
        <div className="absolute h-2 w-2 rounded-full bg-blue-600"></div>
      </div>
      <p className="text-sm font-medium text-gray-500">Loading, please wait...</p>
    </div>
  );
}