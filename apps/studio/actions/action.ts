import {DocumentActionComponent} from 'sanity'

export function onProductPublishSavePIdToTheSupabaseAction(
  originalPublishAction: DocumentActionComponent
) {
  const BetterAction = async (props: any) => {
    const originalResult = originalPublishAction(props)
    return {
      ...originalResult,
      onHandle: () => {
        const {id} = props

        if (originalResult?.onHandle) originalResult.onHandle()
      },
    }
  }
  return BetterAction
}
