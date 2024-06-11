import React from 'react'

export const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="max-w-[1200px] w-full flex flex-col mx-auto min-h-screen bg-white border-l border-r">
      {children}
    </div>
  );
};
