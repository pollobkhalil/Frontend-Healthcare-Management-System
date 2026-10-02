
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-4 bg-gray-50/50">
      <div className="relative flex items-center justify-center">
       
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
       
        <div className="absolute h-2 w-2 rounded-full bg-blue-600"></div>
      </div>
      <p className="text-sm font-medium text-gray-600">Loading data, please wait...</p>
    </div>
  );
};

export default Loading;