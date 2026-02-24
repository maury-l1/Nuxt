<script setup>
definePageMeta({ middleware: ["auth"] });
const { data } = useFetch("/api/admin", {
    lazy: true
});
</script>

<template>
    <div v-if="data">
        {{ data?.sensitive }}
    </div>
</template>