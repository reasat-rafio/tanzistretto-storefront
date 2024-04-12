import { Metadata } from "next";

export const metadata: Metadata = {};

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/*  */}
      {children}
      {/*  */}
    </>
  );
}
