<script setup lang="ts">
const props = defineProps({
    label: String
})
</script>

<template>
    <span
        class="h-[32px] py-[6px] px-[14px] inline-flex rounded-[20px] text-[16px] leading-[16px] text-center bg-[#EEF6FF] text-[#2884EF]">
        {{ props.label }}
    </span>
</template>
