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
      <div class="flex flex-col px-6 py-4 mt-4 border border-gray-300 w-full rounded-xl">
        <h4>isFormValid:</h4>
        <pre class="p-4 w-full text-sm bg-blue-900 text-blue-100 whitespace-pre-wrap rounded-lg"
          >{{ isFormValid }}
      </pre
        >
      </div>
      <div class="flex flex-col px-6 py-4 mt-4 border border-gray-300 w-full rounded-xl">
        <h4>formModel:</h4>
        <pre class="p-4 w-full text-sm bg-blue-900 text-blue-100 whitespace-pre-wrap rounded-lg"
          >{{ formModel }}
      </pre
        >
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useGenForm, type GenFormField } from 'vue-gen-form'
import { ref } from 'vue'

interface DataModel {
  login: string | null
  password: string | null
}

const dataModel = ref<DataModel>({
  login: null,
  password: null
})

const formModel = ref<GenFormField[]>([
  {
    value: dataModel.value.login,
    name: 'login',
    component: 'Input',
    label: 'login',
    formElementAttrs: {
      type: 'text',
      placeholder: 'login'
    },
    validation: [
      {
        required: {
          message: 'The login field is required.'
        }
      }
    ]
  },
  {
    value: dataModel.value.login,
    name: 'password',
    component: 'Input',
    label: 'Password',
    formElementAttrs: {
      type: 'password',
      placeholder: 'Password'
    },
    validation: [
      {
        required: {
          message: 'The password field is required.'
        }
      }
    ]
  }
])

const { GenForm, isFormValid } = useGenForm({
  formModel: formModel,
  dataModel: dataModel,
  submit: onFormSubmit,
  colors: {
    submitButtonBg: 'bg-blue-600',
    submitButtonBgHover: 'hover:bg-blue-500',
    submitButtonText: 'text-gray-100',
    submitButtonTextHover: 'hover:text-white'
  }
})

function onFormSubmit() {
  console.log(formModel.value, dataModel.value)
}
</script>
