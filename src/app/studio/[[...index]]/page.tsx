"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/studio/sanity.config";

export default function StudioPage() {
  return (
    <div>
      <NextStudio config={config} />
    </div>
  );
}
