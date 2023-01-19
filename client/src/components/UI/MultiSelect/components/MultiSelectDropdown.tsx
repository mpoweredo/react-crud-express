import { Button, Center, MenuList, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { TMultiSelectValues } from '@/components/UI/MultiSelect/MultiSelect.type'
import { FieldInputProps } from 'formik'

interface IMultiSelectDropdownProps {
  values: TMultiSelectValues
  field: FieldInputProps<TMultiSelectValues>
  setValue: (value: TMultiSelectValues) => void
  isLoading?: boolean
}

const MultiSelectDropdown = ({
  values,
  field,
  isLoading,
  setValue,
}: IMultiSelectDropdownProps) => {
  return (
    <Stack
      onMouseDown={(e) => e.preventDefault()}
      position={'absolute'}
      minHeight={'70px'}
      rounded={'sm'}
      bg={'gray.800'}
      w={'full'}
      p={2.5}
      spacing={3}
      zIndex={10}
      top={'100%'}
    >
      {isLoading ? (
        <Center flexGrow={1}>
          <Text>Loading...</Text>
        </Center>
      ) : (
        values.map((item) => {
          const isSelected = field.value.some(
            ({ value }) => item.value === value
          )

          return (
            <Button
              bg={isSelected ? 'gray.500' : 'gray.700'}
              color={isSelected ? 'gray.300' : 'white'}
              cursor={'pointer'}
              _hover={{ bg: 'gray.600' }}
              _active={{ bg: 'gray.500' }}
              rounded={'sm'}
              p={2.5}
              role={'option'}
              id={item.value.toString()}
              key={item.value}
              justifyContent={'flex-start'}
              type={'button'}
              onClick={() => {
                if (field.value.some(({ value }) => value === item.value)) {
                  setValue(
                    field.value.filter(({ value }) => item.value !== value)
                  )
                  return
                }
                setValue([...field.value, item])
              }}
            >
              {item.label}
            </Button>
          )
        })
      )}
    </Stack>
  )
}

export default MultiSelectDropdown
