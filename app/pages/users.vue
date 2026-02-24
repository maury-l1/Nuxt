<script setup>
definePageMeta({ middleware: ["auth"] });
const { data } = useFetch("/api/users", {

});
</script>

<template>
    <div v-if="data">
        <pre v-for="user in data">{{ user.name }}</pre>
    </div>
</template>