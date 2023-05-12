import { forEach } from 'lodash'

export default function checkFields(fields, data) {
  for (let i = 0; i < fields.length; i++) {
    if (data && data[fields[i]]) {
      return true
    }
  }

  return false
}
