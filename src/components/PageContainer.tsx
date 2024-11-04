import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <main className="mx-auto max-w-6xl p-6 pb-0">{children}</main>;
};

export default PageContainer;
