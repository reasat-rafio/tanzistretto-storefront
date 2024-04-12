import { ArrowRightCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-3xl">Page not found</h1>
      <p className="text-small-regular text-ui-fg-base">
        The page you tried to access does not exist.
      </p>
      <Link className="flex gap-x-1 items-center group" href="/">
        <h2 className="text-ui-fg-interactive">Go to frontpage</h2>
        <ArrowRightCircle className="group-hover:rotate-45 ease-in-out duration-150" />
      </Link>
    </div>
  );
}
