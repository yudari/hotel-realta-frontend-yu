import classNames from 'classnames'
import React from 'react'

interface InputTextProps {
  label: string
  name: string
  placeholder: string
  defaultValue?: string
  className?: string
  errors?: any
  required?: boolean
  register?: any
  registerOptions?: any
  type: string
}

export default function InputText(props: InputTextProps) {
  const {
    label,
    name,
    placeholder,
    defaultValue,
    className,
    errors,
    required,
    register,
    registerOptions,
    type,
  } = props

  const inputTextClass = classNames(
    'outline-none border border-spacing-2 border-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded',
    {
      'active:border-red-700 focus:border-red-700 active:bg-red-200 focus:bg-red-200':
        errors?.[name],
    },
    className
  )

  return (
    <div className='form-group mt-4'>
      <label htmlFor={label} className='block text-lg font-medium'>
        {label}
        {required && <span className='text-danger'>*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={inputTextClass}
        {...register(name, registerOptions?.[name])}
        required={required}
      />
      <small className='text-red-600'>
        {errors?.[name] && errors?.[name]?.message}
      </small>
    </div>
  )
}
