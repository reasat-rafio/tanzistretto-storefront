import {DocumentActionComponent} from 'sanity'
import {supabase} from '../utils/supabaseClient'

export function onProductPublishSavePIdToTheSupabaseAction(
  originalPublishAction: DocumentActionComponent
) {
  const BetterAction = (props: any) => {
    const originalResult = originalPublishAction(props)
    return {
      ...originalResult,
      onHandle: async () => {
        const {id} = props
        let {data: product, error: getErr} = await supabase
          .from('products')
          .select('id')
          .eq('sanity_product_id', id)

        if (!product?.length) {
          const {data, error: insertErr} = await supabase
            .from('products')
            .insert([{sanity_product_id: id}])
        }

        if (!!originalResult?.onHandle) originalResult.onHandle()
      },
    }
  }
  return BetterAction
}

export function onDeleteRemoveTheRowInSupabaseAction(
  originalPublishAction: DocumentActionComponent
) {
  const BetterAction = (props: any) => {
    const originalResult = originalPublishAction(props)
    return {
      ...originalResult,
      onHandle: async () => {
        const {id} = props
        let {data: product, error: getErr} = await supabase
          .from('product')
          .select('id')
          .eq('sanity_product_id', id)

        if (product?.length) {
          const {data, error} = await supabase.from('product').delete().eq('sanity_product_id', id)
          console.log({data})
        }

        if (!!originalResult?.onHandle) originalResult.onHandle()
      },
    }
  }
  return BetterAction
}
