import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas/index";
import { AppStructure } from "./deskStucture";
import { structureTool } from "sanity/structure";

export default defineConfig([
  {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: "production",
    name: "production-workspace",
    basePath: "/studio/production",
    title: "Production",
    // icon: Logo,
    plugins: [structureTool({ structure: AppStructure }), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
  {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: "staging",
    name: "staging-workspace",
    basePath: "/studio/staging",
    title: "Staging",
    // icon: Logo,
    plugins: [structureTool({ structure: AppStructure }), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
]);
