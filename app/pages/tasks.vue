<script setup>
definePageMeta({ middleware: ["auth"] });
const { data } = useFetch("/api/tasks/1", {

});
</script>

<template>
    <div>
        <h1>Tasks</h1>
    </div>
    <div v-if="data">
        <pre v-for="task in data">{{ task }}</pre>
    </div>
</template>