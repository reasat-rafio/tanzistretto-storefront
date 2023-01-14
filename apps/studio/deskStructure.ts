import {StructureBuilder} from 'sanity/desk'
import {GrEdit} from 'react-icons/gr'
import {RiPagesLine} from 'react-icons/ri'
import {PageItemProps} from './types'
import {FaSitemap} from 'react-icons/fa'
import {GiLargeDress} from 'react-icons/gi'
import {BiHomeHeart} from 'react-icons/bi'

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
const singleItem = (S: StructureBuilder, {schemaType, id, title, icon}: PageItemProps) =>
  S.listItem({schemaType, title, id, icon}).child(
    S.editor().id(id).title(title).schemaType(schemaType)
  )

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
    .items([
      S.listItem()
        .title('Site')
        .icon(FaSitemap)
        .child(
          S.list()
            .title('Site')
            .items([
              singleItem(S, {
                schemaType: 'site.logos',
                id: 'siteLogos',
                title: 'Logos',
              }),
              singleItem(S, {
                schemaType: 'site.navbar',
                id: 'siteNav',
                title: 'Navigations',
              }),
              singleItem(S, {
                schemaType: 'site.footer',
                id: 'siteFooter',
                title: 'Footer',
              }),
              singleItem(S, {
                schemaType: 'social',
                id: 'social',
                title: 'Socials',
              }),
            ])
        ),
      S.listItem()
        .title('Pages')
        .icon(RiPagesLine)
        .child(
          S.list()
            .title('Pages')
            .items([
              pageItem(S, {
                schemaType: 'homePage',
                icon: BiHomeHeart,
                id: 'homePage',
                title: 'Home',
                slug: '',
              }),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Products')
        .icon(GiLargeDress)
        .child(
          S.list()
            .title('Products')
            .items([
              S.documentTypeListItem('product').title('Products'),
              S.documentTypeListItem('material').title('Materials'),
              S.documentTypeListItem('category').title('Categories'),
            ])
        ),
    ])
