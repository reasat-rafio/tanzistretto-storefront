import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {AppStructure} from './deskStructure'
import {colorInput} from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'Tanzistretto',

  projectId: '12fv2wdd',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: AppStructure,
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
