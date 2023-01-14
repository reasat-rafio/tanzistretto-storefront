import {DocumentActionComponent, defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {AppStructure} from './deskStructure'
import {colorInput} from '@sanity/color-input'
import {
  onDeleteRemoveTheRowInSupabaseAction,
  onProductPublishSavePIdToTheSupabaseAction,
} from './actions/action'

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

  document: {
    actions: (prev, contex) =>
      contex.schemaType === 'product'
        ? prev.map((originalAction) =>
            originalAction.action === 'publish'
              ? (onProductPublishSavePIdToTheSupabaseAction(
                  originalAction
                ) as DocumentActionComponent)
              : originalAction.action === 'delete'
              ? (onDeleteRemoveTheRowInSupabaseAction(originalAction) as DocumentActionComponent)
              : originalAction
          )
        : prev,
  },

  schema: {
    types: schemaTypes,
  },
})
