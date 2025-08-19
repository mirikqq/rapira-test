<script setup lang="ts">
import { computed, ref } from 'vue';
import SearchWidget from '../components/widgets/SearchWidget.vue';
import UICard from '../components/shared/UICard.vue';
import UICardFull from "../components/shared/UICardFull.vue";
import UIModal from "../components/shared/UIModal.vue";

import data from "../assets/data.json"

const modalRef = ref<InstanceType<typeof UIModal> | null>(null);

// Конечно в проде так бы не делал :)
const search = ref({
    query: "",
    filters: [
        {
            label: "Город",
            value: "city",
            checked: false
        },
        {
            label: "Природа",
            value: "nature",
            checked: false
        },
        {
            label: "Люди",
            value: "people",
            checked: false
        }
    ]
})

const filteredData = computed(() => {
    return data.filter(item => {
        const byQuery = search.value.query
            ? item.title.toLowerCase().includes(search.value.query.toLowerCase())
            : true

        const byFilters = search.value.filters.some(filter => filter.checked)
            ? item.tags.some(tag =>
                search.value.filters.some(filter => filter.checked && filter.value === tag.value)
            )
            : true

        return byQuery && byFilters
    })
})

const openDetailed = (props: any) => {
    modalRef.value?.openModal({
        component: UICardFull,
        props
    })
}

</script>

<template>
    <div class="2xl:mx-[95px] 2xl:py-[20px] xl:mx-[95px] xl:py-[20px] md:mx-[30px] md:py-[20px] mx-[10px] py-[10px]">
        <SearchWidget title="Блог" v-model="search" />
    </div>
    <div class="py-[20px] bg-gray-200">
        <div v-if="filteredData.length"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mx-[10px] xl:mx-[50px] px-[15px] xl:px-[30px] py-[15px] xl:py-[30px] bg-white rounded-[12px] justify-items-center">
            <!-- KOSTILI s data as any, eto ochen ploho :) -->
            <UICard class="cursor-pointer" v-for="item in filteredData" @click="() => openDetailed(item)"
                v-bind="item as any" />
        </div>
        <div v-else
            class="flex gap-[4px] items-center flex-col mx-[10px] xl:mx-[50px] px-[15px] xl:px-[30px] py-[15px] xl:py-[30px] bg-white rounded-[12px]">
            <span>
                <svg viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="46.000000" height="46.000000" fill="none">
                    <rect id="search-list" width="46.000000" height="46.000000" x="0.000000" y="0.000000"
                        fill="rgb(255,255,255)" fill-opacity="0" />
                    <g id="files-folders">
                        <g id="search-list">
                            <path id="Vector"
                                d="M33.7717 43.6041L12.2283 43.6041C10.6525 43.6041 9.14124 42.9782 8.02696 41.8639C6.91268 40.7496 6.28668 39.2383 6.28668 37.6625L6.28668 8.33748C6.28668 6.76165 6.91268 5.25037 8.02696 4.13609C9.14124 3.02181 10.6525 2.39581 12.2283 2.39581L25.4342 2.39581C25.9547 2.39663 26.4698 2.50035 26.9501 2.701C27.4303 2.90165 27.8662 3.19528 28.2325 3.56498L38.5825 14.0491C39.3076 14.7848 39.7138 15.7763 39.7133 16.8091L39.7133 37.6625C39.7133 39.2383 39.0873 40.7496 37.9731 41.8639C36.8588 42.9782 35.3475 43.6041 33.7717 43.6041ZM12.2283 5.27081C11.415 5.27081 10.635 5.59391 10.0599 6.16902C9.48478 6.74413 9.16168 7.52415 9.16168 8.33748L9.16168 37.6625C9.16168 38.4758 9.48478 39.2558 10.0599 39.8309C10.635 40.4061 11.415 40.7291 12.2283 40.7291L33.7717 40.7291C34.585 40.7291 35.365 40.4061 35.9401 39.8309C36.5153 39.2558 36.8383 38.4758 36.8383 37.6625L36.8383 16.8091C36.8317 16.5307 36.7225 16.2645 36.5317 16.0616L26.1817 5.57748C26.0834 5.47972 25.9667 5.40231 25.8385 5.34969C25.7102 5.29707 25.5728 5.27026 25.4342 5.27081L12.2283 5.27081Z"
                                fill="rgb(216,216,229)" fill-rule="nonzero" />
                            <path id="Vector"
                                d="M38.2184 17.7292L31.855 17.7292C29.8962 17.7292 28.0173 16.9523 26.6304 15.569C25.2435 14.1857 24.4618 12.3088 24.4567 10.35L24.4567 3.83334C24.4555 3.63525 24.4958 3.4391 24.575 3.25754C24.6543 3.07598 24.7707 2.91302 24.9167 2.77918C25.0784 2.64111 25.2695 2.54174 25.4754 2.4886C25.6814 2.43546 25.8967 2.42996 26.105 2.47251C26.892 2.61196 27.6158 2.99394 28.175 3.56501L38.525 14.0492C39.0429 14.5784 39.4016 15.2425 39.56 15.9658C39.6062 16.1743 39.6047 16.3905 39.5557 16.5983C39.5066 16.8062 39.4113 17.0002 39.2768 17.166C39.1423 17.3319 38.9721 17.4652 38.7788 17.5561C38.5856 17.6469 38.3744 17.693 38.1609 17.6908L38.2184 17.7292ZM27.3317 6.74668L27.3317 10.35C27.3368 11.5463 27.8156 12.692 28.6633 13.5361C29.511 14.3803 30.6587 14.8542 31.855 14.8542L35.3434 14.8542L27.3317 6.74668Z"
                                fill="rgb(216,216,229)" fill-rule="nonzero" />
                            <path id="Vector"
                                d="M31.1458 33.0433L27.1592 29.21C28.0604 27.9591 28.5495 26.4584 28.5583 24.9166C28.5771 23.2081 28.0246 21.5423 26.9886 20.1837C25.9525 18.825 24.4923 17.8514 22.8398 17.4173C21.1872 16.9833 19.437 17.1137 17.867 17.7879C16.2971 18.4621 14.9973 19.6414 14.1741 21.1386C13.3508 22.6358 13.0513 24.3651 13.3231 26.0519C13.5948 27.7388 14.4223 29.2865 15.6741 30.4494C16.9259 31.6123 18.5303 32.3237 20.2325 32.4707C21.9348 32.6177 23.6374 32.1919 25.07 31.2608L29.1717 35.0941C29.4394 35.3521 29.7966 35.4964 30.1683 35.4966C30.3638 35.4988 30.5574 35.4588 30.736 35.3794C30.9146 35.3001 31.074 35.1832 31.2033 35.0366C31.4534 34.7615 31.5872 34.4001 31.5764 34.0284C31.5657 33.6567 31.4114 33.3036 31.1458 33.0433ZM16.33 24.9166C16.3301 23.995 16.6026 23.0939 17.1132 22.3266C17.6237 21.5592 18.3496 20.9599 19.1997 20.6038C20.0498 20.2477 20.9862 20.1507 21.8912 20.325C22.7963 20.4993 23.6296 20.9372 24.2866 21.5836C24.9436 22.23 25.3949 23.0561 25.5839 23.9582C25.773 24.8603 25.6912 25.7981 25.349 26.6538C25.0067 27.5096 24.4193 28.2452 23.6603 28.7682C22.9014 29.2911 22.0049 29.5782 21.0833 29.5933C20.4635 29.6009 19.8482 29.4857 19.2731 29.2543C18.698 29.0229 18.1744 28.6799 17.7325 28.2452C17.2906 27.8104 16.9391 27.2924 16.6984 26.7211C16.4577 26.1499 16.3325 25.5366 16.33 24.9166Z"
                                fill="rgb(216,216,229)" fill-rule="nonzero" />
                        </g>
                    </g>
                </svg>
            </span>
            <h5 class="font-[500] text-[14px] text-gray-500">
                Поиск не дал результатов
            </h5>
            <p class="text-gray-500 text-[12px]">
                Повторите поиск или используйте фильтр для структуризации контента
            </p>
        </div>
    </div>
    <UIModal ref="modalRef" />
</template>
