import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
