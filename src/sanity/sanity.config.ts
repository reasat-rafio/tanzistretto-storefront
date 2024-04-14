import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas/index";
import { AppStructure } from "./deskStucture";
import { structureTool } from "sanity/structure";

export default defineConfig([
  {
    projectId: "12fv2wdd",
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
    projectId: "12fv2wdd",
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
