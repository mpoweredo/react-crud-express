import {
  IMultiSelectProps,
  TMultiSelectValues,
} from '@/components/UI/MultiSelect/MultiSelect.type'
import { useField } from 'formik'
import {
  Center,
  Flex,
  FormLabel,
  Grid,
  Icon,
  Stack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import useHandleClickOutside from '@/components/UI/MultiSelect/useHandleClickOutside'
import MultiSelectDropdown from '@/components/UI/MultiSelect/components/MultiSelectDropdown'
import SelectedItem from '@/components/UI/MultiSelect/components/SelectedItem'

const MultiSelect = ({
  values,
  name,
  label,
  isErrorMessageVisible = false,
  width = '210px',
}: IMultiSelectProps) => {
  const [field, { error, touched }, { setValue, setTouched }] =
    useField<TMultiSelectValues>(name)
  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useHandleClickOutside(() => setIsOpen(false))

  const isError = !!error && touched

  return (
    <Stack
      spacing={2}
      direction={'column'}
      width={width}
      role='tab'
      aria-selected={'true'}
      aria-expanded={'false'}
    >
      {label && (
        <FormLabel m={0} fontSize={'xl'}>
          {label}
        </FormLabel>
      )}

      <Stack
        ref={dropdownRef}
        width={'full'}
        position={'relative'}
        onBlur={() => setTouched(true)}
      >
        <VisuallyHidden>
          <input tabIndex={-1} aria-hidden={'true'} />
        </VisuallyHidden>

        <Grid
          borderWidth={1}
          borderColor={isError ? 'red.400' : 'gray.500'}
          w={'full'}
          onClick={() => {
            setIsOpen((prevState) => !prevState)
          }}
          rounded={'base'}
          flexWrap={'wrap'}
          minH={10}
          gridTemplateColumns={'1fr 25px'}
          p={2}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter') setIsOpen((prevState) => !prevState)
          }}
        >
          <Flex gap={1} wrap={'wrap'}>
            {field.value.map(({ label, value }) => {
              return (
                <SelectedItem
                  key={value}
                  label={label}
                  value={value}
                  field={field}
                  setValue={(newValue: TMultiSelectValues) =>
                    setValue(newValue)
                  }
                />
              )
            })}
          </Flex>
          <Center>
            <Icon as={ChevronDownIcon} />
          </Center>
        </Grid>

        {isOpen && (
          <MultiSelectDropdown
            values={values}
            field={field}
            setValue={(value: TMultiSelectValues) => setValue(value)}
          />
        )}
      </Stack>

      <Text color='red.400'>{isError && isErrorMessageVisible && error}</Text>
    </Stack>
  )
}

export default MultiSelect
