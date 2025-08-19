<script setup lang="ts">
const props = defineProps({
    avatar: String,
    author: String,
    text: String,
    date: String
})
</script>

<template>
    <div class="inline-flex gap-[12px] mt-[12px]">
        <img class="rounded-[50%] w-[38px] h-[38px]" :src="props.avatar" alt="avatar">

        <div class="flex flex-col">
            <span class="font-bold text-[14px]">{{ props.author }}</span>
            <span class="font-[400] text-[14px]">{{ props.text }}</span>
            <span class="font-[400] text-[12px] text-gray-500">{{ props.date }}</span>
        </div>
    </div>
</template>
