import {StructureBuilder} from 'sanity/desk'
import {GrEdit} from 'react-icons/gr'
import {RiPagesLine} from 'react-icons/ri'
import {PageItemProps} from './types'

// function SitePreview() {
//   if (!process.env.SANITY_STUDIO_PREVIEW_URL) {
//     console.warn(
//       'SANITY_STUDIO_PREVIEW_URL should be set for preview to work! Falling back to localhost:3000'
//     )
//   }
//   return (
//     <iframe
//       title="Page preview"
//       src={`site-url/api/preview?secret=${process.env.SANITY_STUDIO_PREVIEW_TOKEN}&slug=${options.slug}`}
//       style={{width: '100%', height: '100%', border: 0}}
//     />
//   )
// }

const pageItem = (
  S: StructureBuilder,
  {schemaType, id, title, icon = GrEdit, slug}: PageItemProps
) =>
  S.documentListItem({schemaType, id, title, icon}).child(
    S.editor()
      .schemaType(schemaType)
      .views([
        S.view.form().icon(icon),
        // S.view.component(SitePreview).icon(GrView).options({slug}).title('Preview'),
      ])
  )

export const AppStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .id('__root__')
    .items([S.listItem().title('Pages').icon(RiPagesLine).child(S.list().title('Pages').items([]))])
