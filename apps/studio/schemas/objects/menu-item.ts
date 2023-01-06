import {MdLink} from 'react-icons/md'
import {Rule} from 'sanity'

export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  icon: MdLink,
  validation: (Rule: Rule) =>
    Rule.custom((content: any) => {
      const pageUrlAndExternalURlBothPresent = !!content?.pageUrl && !!content?.externalUrl
      return pageUrlAndExternalURlBothPresent
        ? {
            message:
              'There should be only one page url or external url set. Please remove the unwanted one',
          }
        : true
    }),
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {name: 'pageUrl', type: 'string'},
    {name: 'externalUrl', type: 'url'},
    {name: 'highlight', type: 'boolean'},
    {
      name: 'submenu',
      title: 'Submenu',
      type: 'array',
      of: [{type: 'menuItem'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      pageUrl: 'pageUrl',
      externalUrl: 'externalUrl',
    },
    prepare({title, pageUrl, externalUrl}: any) {
      return {
        title,
        subtitle: pageUrl || externalUrl,
        icon: MdLink,
      }
    },
  },
}
