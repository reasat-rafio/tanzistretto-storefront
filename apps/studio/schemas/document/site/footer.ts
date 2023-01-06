import {FcAutomatic} from 'react-icons/fc'
import {Rule} from 'sanity'

const Footer = {
  name: 'site.footer',
  type: 'document',
  title: 'footer',
  icon: FcAutomatic,
  fields: [
    {
      name: 'header',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'menu',
      type: 'array',
      of: [{type: 'menuItem'}],
    },
  ],
}

export default Footer
