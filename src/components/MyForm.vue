<template>
  <main class="p-4 flex w-full gap-4 flex-col lg:flex-row">
    <div class="w-full lg:w-1/2">
      <GenForm class="flex flex-col justify-center" />
    </div>
    <div class="w-full lg:w-1/2">
      <div class="flex flex-col px-6 py-4 mt-4 border border-gray-300 w-full rounded-xl">
        <h4>dataModel:</h4>
        <pre class="p-4 w-full text-sm bg-blue-900 text-blue-100 whitespace-pre-wrap rounded-lg"
          >{{ dataModel }}
      </pre
        >
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useGenForm, REGEX, type GenFormField } from 'vue-gen-form'
import { ref } from 'vue'

interface DataModel {
  email: string | null
  isRegistration: boolean
  password: string | null
  repeatPassword: string | null
}

const dataModel = ref<DataModel>({
  email: null,
  isRegistration: false,
  password: null,
  repeatPassword: null
})

const formModel = ref<GenFormField[]>([
  {
    value: dataModel.value.email,
    name: 'email',
    label: 'Email',
    component: 'Input',
    formElementAttrs: {
      type: 'text',
      placeholder: 'Enter the email...'
    },
    validation: [
      {
        required: {
          message: null
        }
      },
      {
        format: {
          message: 'Please, enter a valid email.',
          regex: REGEX.EMAIL
        }
      }
    ]
  },
  {
    value: dataModel.value.isRegistration,
    name: 'isRegistration',
    label: 'I want to register.',
    component: 'Input',
    formElementAttrs: {
      type: 'checkbox'
    },
    onUpdate: () => {
      setFieldValue('password', null)
      setFieldValue('repeatPassword', null)
    }
  },
  {
    value: dataModel.value.password,
    name: 'password',
    component: 'Input',
    label: 'Password',
    formElementAttrs: {
      type: 'password',
      autocomplete: false,
      placeholder: 'Enter the password...'
    },
    validation: [
      {
        required: {
          message: null
        }
      },
      {
        lowerAndUpperCase: {
          regex: REGEX.LOWER_AND_UPPER_CASE,
          message: 'The password must contain lower and upper case characters.'
        }
      },
      {
        AtLeastOneNumber: {
          regex: REGEX.AT_LEAST_ONE_NUMBER,
          message: 'The password must contain at least one number.'
        }
      },
      {
        AtLeastOneSpecialCharacter: {
          regex: REGEX.AT_LEAST_ONE_SPECIAL_CHARACTER,
          message: 'The password must contain at least one special character.'
        }
      },
      {
        minLength: {
          regex: REGEX.MIN_LENGTH(8),
          message: 'The password must be at least 8 characters long.'
        }
      }
    ],
    condition: () => dataModel.value.isRegistration,
    onUpdate: () => {
      validateFieldByName('repeatPassword')
    }
  },
  {
    value: dataModel.value.repeatPassword,
    name: 'repeatPassword',
    label: 'Repeat the password',
    component: 'Input',
    formElementAttrs: {
      type: 'password',
      placeholder: 'Repeat the password...',
      autocomplete: false
    },
    validation: [
      {
        required: {
          message: 'The repeat password is required.'
        }
      },
      {
        matchCheck: {
          message: 'The passwords do not match.',
          validator: () => {
            if (dataModel.value.repeatPassword) {
              return !!(dataModel.value.repeatPassword === dataModel.value.password)
            }
            return true
          }
        }
      }
    ],
    condition: () => dataModel.value.isRegistration
  }
])

const { GenForm, setFieldValue, validateFieldByName } = useGenForm({
  formModel: formModel,
  dataModel: dataModel,
  submit: onFormSubmit
})

function onFormSubmit() {
  console.log(formModel.value, dataModel.value)
}
</script>
