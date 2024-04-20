import { TbHome } from 'react-icons/tb';
import { GrEdit } from 'react-icons/gr';
import { FaSitemap } from 'react-icons/fa';
import { SiCloudflarepages } from 'react-icons/si';
import type { IconType } from 'react-icons';
import type { StructureBuilder, StructureResolver } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { TfiAnnouncement } from 'react-icons/tfi';
import { IoBagHandle } from 'react-icons/io5';
import { IoIosColorFill, IoIosResize } from 'react-icons/io';

interface ListItem {
  title: string;
  id: string;
  schemaType: string;
  icon?: IconType;
}

const pageItem = (
  S: StructureBuilder,
  { schemaType, id, title, icon = GrEdit }: ListItem,
) =>
  S.documentListItem({ schemaType, id, title, icon }).child(
    S.editor()
      .schemaType(schemaType)
      .views([S.view.form().icon(icon)]),
  );

const singleItem = (
  S: StructureBuilder,
  { schemaType, id, title, icon }: ListItem,
) =>
  S.listItem({ schemaType, title, id, icon }).child(
    S.editor().id(id).title(title).schemaType(schemaType),
  );

// context: ConfigContext;
export const AppStructure: StructureResolver = (S, context) =>
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
                schemaType: 'site.nav',
                id: 'siteNavigation',
                title: 'Navigation',
              }),
              singleItem(S, {
                schemaType: 'site.footer',
                id: 'siteFooter',
                title: 'Footer',
              }),
            ]),
        ),
      orderableDocumentListDeskItem({
        type: 'promotion',
        S,
        context,
        title: 'Promotions',
        icon: TfiAnnouncement,
      }),
      S.divider(),

      S.listItem()
        .title('Pages')
        .icon(SiCloudflarepages)
        .child(
          S.list()
            .title('Pages')
            .items([
              pageItem(S, {
                schemaType: 'landingPage',
                id: 'landingPage',
                title: 'Landing',
                icon: TbHome,
              }),
            ]),
        ),
      S.divider(),

      orderableDocumentListDeskItem({
        type: 'category',
        S,
        context,
        title: 'Categories',
        icon: IoBagHandle,
      }),

      S.listItem()
        .title('Products')
        .icon(IoBagHandle)
        .child(
          S.list()
            .title('Products')
            .items([
              orderableDocumentListDeskItem({
                type: 'product',
                S,
                context,
                title: 'Products',
                icon: IoBagHandle,
              }),
              orderableDocumentListDeskItem({
                type: 'size',
                S,
                context,
                title: 'Sizes',
                icon: IoIosResize,
              }),
              orderableDocumentListDeskItem({
                type: 'colour',
                S,
                context,
                title: 'Colors',
                icon: IoIosColorFill,
              }),
            ]),
        ),
    ]);
