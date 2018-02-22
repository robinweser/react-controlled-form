export type Field = {
  isEnabled: boolean,
  isRequired: boolean,
  isTouched: boolean,
  isValid: boolean,
  value: any,
}

export type Data = {
  [fieldId: string]: Field,
}
