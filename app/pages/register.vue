<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();


const schema = z.object({
    name: z.string(),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    name: undefined,
    email: undefined,
    password: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    console.log(event.data)
    try{
        await $fetch('/auth/register', {
            method: 'POST',
            body: event.data,
        })
        fetch()
        toast.add({title: 'Success', description: 'The form has been submitted', color: 'success'})
    } catch(error){
        if(error instanceof FetchError){
            // error de fetch
            toast.add({title: 'Error', description: error.data.message, color: 'error'})
        } else {
            //error no controlado
            toast.add({title: 'Error', description: "Error inesperado", color: 'error'})

        }
    }
}
watch(loggedIn, () => {
    if (loggedIn.value) {
        navigateTo('/admin')
    }
})
</script>

<template>
    <UCard class="max-w-md m-auto my-10 mt-4">
        <template>
            <h1 class="text-2xl text-center"> REGISTER </h1>
        </template>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

            <UFormField label="Name" name="name">
                <UInput v-model="state.name" class="w-full"/>
            </UFormField>
            
            <UFormField label="Email" name="email">
                <UInput v-model="state.email" class="w-full"/>
            </UFormField>

            <UFormField label="Password" name="password">
                <UInput v-model="state.password" type="password" class="w-full"/>
            </UFormField>

            <UButton type="submit">
                Submit
            </UButton>
        </UForm>
        <UButton type="submit" class="mt-4" @click="openInPopup('/auth/github')">
            Login With Github
        </UButton>
    </UCard>
</template>