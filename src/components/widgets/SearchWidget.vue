<script setup lang="ts">
import { defineModel, ref } from 'vue';

import UIInput from '../shared/UIInput.vue';
import UICheckbox from "../shared/UICheckbox.vue"

export type filters = {
    label: string,
    value: string,
    checked: boolean
}

const props = defineProps({
    title: String,
    filters: Array<filters>,
})

const model = defineModel<{ query: string; filters: Array<filters> }>({
    default: {
        query: "",
        filters: []
    }
})

const isFilterShowed = ref<boolean>(true)

const handleClean = () => {
    model.value.query = ""
    model.value.filters.map(filter => filter.checked = false)
}

</script>

<template>
    <div class="flex flex-col gap-[12px] xl:gap-[40px]">
        <div class="flex flex-col items-start gap-[12px] xl:gap-[40px] relative md:flex-row md:items-center">
            <h1 class="text-[32px] font-[600]">{{ props.title }}</h1>
            <UIInput v-model="model.query" />
            <div class="absolute right-0">
                <span @click="handleClean" v-if="model.query || model.filters.some(filter => filter.checked)"
                    class="mr-[10px] cursor-pointer text-[#2884EF]">Очистить</span>
                <span class="cursor-pointer text-gray-500" @click="isFilterShowed = !isFilterShowed">
                    {{ isFilterShowed ? "Скрыть фильтр" : "Фильтр" }}
                    <span class="inline-block align-middle transition-transform"
                        :class="[isFilterShowed && 'rotate-180']">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" width="16.000000" height="16.000000" fill="none">
                            <rect id="down" width="16.000000" height="16.000000" x="0.000000" y="0.000000"
                                fill="rgb(255,255,255)" fill-opacity="0" transform="matrix(1,0,0,-1,0,16)" />
                            <g id="arrows">
                                <path id="Vector"
                                    d="M4.66939 5.33606C4.58166 5.33657 4.49468 5.31975 4.41346 5.28657C4.33223 5.2534 4.25835 5.20452 4.19606 5.14273L0.196061 1.14273C0.133902 1.08057 0.084595 1.00678 0.0509548 0.925561C0.0173146 0.844346 0 0.7573 0 0.669394C0 0.49186 0.0705253 0.321597 0.196061 0.196061C0.321597 0.070525 0.49186 1.18424e-15 0.669394 0C0.846929 1.18424e-15 1.01719 0.070525 1.14273 0.196061L4.66939 3.72273L8.19606 0.196061C8.25822 0.133902 8.33201 0.0845944 8.41323 0.0509542C8.49444 0.017314 8.58149 0 8.66939 0C8.7573 0 8.84434 0.017314 8.92556 0.0509542C9.00677 0.0845944 9.08057 0.133902 9.14273 0.196061C9.20488 0.25822 9.25419 0.332014 9.28783 0.413228C9.32147 0.494443 9.33879 0.581488 9.33879 0.669394C9.33879 0.7573 9.32147 0.844346 9.28783 0.925561C9.25419 1.00678 9.20488 1.08057 9.14273 1.14273L5.14273 5.14273C5.08043 5.20452 5.00656 5.2534 4.92533 5.28657C4.84411 5.31975 4.75713 5.33657 4.66939 5.33606Z"
                                    fill="rgb(161,165,183)" fill-rule="nonzero"
                                    transform="matrix(1,0,0,-1,3.33057,9.86938)" />
                            </g>
                        </svg>
                    </span>
                </span>
            </div>
        </div>
        <transition name="slide-fade">
            <div v-show="isFilterShowed" class="inline-flex gap-[8px] flex-wrap">
                <UICheckbox v-for="filter in model.filters" :key="filter.value" :label="filter.label"
                    :value="filter.value" v-model="filter.checked" />
            </div>
        </transition>
    </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.4s linear;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
    opacity: 1;
    max-height: 500px;
}
</style>
