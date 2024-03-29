type TMultiSelectOption = {
  value: number
  label: string
}

type TMultiSelectValues = TMultiSelectOption[]

interface IMultiSelectProps {
  values: TMultiSelectOption[]
  isErrorMessageVisible?: boolean
  name: string
  label?: string
  width?: string | string[]
  isLoading?: boolean
}

export type { IMultiSelectProps, TMultiSelectOption, TMultiSelectValues }
