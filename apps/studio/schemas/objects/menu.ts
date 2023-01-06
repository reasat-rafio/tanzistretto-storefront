import {FcMenu} from 'react-icons/fc'
import {Rule} from 'sanity'

const Menu = {
  name: 'menu',
  type: 'object',
  title: 'Menu',
  icon: FcMenu,
  fields: [
    {
      name: 'menu',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [{type: 'menuItem'}],
    },
  ],
}

export default Menu
