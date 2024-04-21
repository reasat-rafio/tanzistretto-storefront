import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/index';
import { AppStructure } from './deskStucture';
import { PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';
import { structureTool } from 'sanity/structure';
import { colorInput } from '@sanity/color-input';

export default defineConfig([
  {
    projectId: PUBLIC_SANITY_PROJECT_ID ?? '12fv2wdd',
    dataset: 'production',
    name: 'production-workspace',
    basePath: '/studio/production',
    title: 'Production',
    // icon: Logo,
    plugins: [
      structureTool({ structure: AppStructure }),
      visionTool(),
      colorInput(),
    ],
    schema: {
      types: schemaTypes,
    },
  },
  {
    projectId: PUBLIC_SANITY_PROJECT_ID ?? '12fv2wdd',
    dataset: 'staging',
    name: 'staging-workspace',
    basePath: '/studio/staging',
    title: 'Staging',
    // icon: Logo,
    plugins: [
      structureTool({ structure: AppStructure }),
      visionTool(),
      colorInput(),
    ],
    schema: {
      types: schemaTypes,
    },
  },
]);
