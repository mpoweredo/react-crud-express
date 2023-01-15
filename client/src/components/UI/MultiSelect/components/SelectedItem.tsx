import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'
import React from 'react'
import { TMultiSelectValues } from '@/components/UI/MultiSelect/MultiSelect.type'
import { FieldInputProps } from 'formik'

interface ISelectedItemProps {
  value: number
  label: string
  setValue: (newValue: TMultiSelectValues) => void
  field: FieldInputProps<TMultiSelectValues>
}

const SelectedItem = ({
  value,
  setValue,
  label,
  field,
}: ISelectedItemProps) => {
  return (
    <Tag
      onClick={(e) => e.stopPropagation()}
      size={'sm'}
      key={value}
      borderRadius='full'
      variant='solid'
      colorScheme='teal'
    >
      <TagLabel>{label}</TagLabel>
      <TagCloseButton
        onClick={(e) => {
          e.stopPropagation()
          setValue(
            field.value.filter(({ value: valueItem }) => value !== valueItem)
          )
        }}
      />
    </Tag>
  )
}

export default SelectedItem
