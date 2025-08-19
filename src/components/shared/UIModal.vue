<script setup lang="ts">
import { ref, shallowRef } from "vue";

const isOpen = ref(false);
const component = shallowRef<any>(null);
const componentProps = ref<Record<string, any>>({});

function openModal(options: { title?: string; component: any; props?: Record<string, any> }) {
    component.value = options.component;
    componentProps.value = options.props || {};
    isOpen.value = true;
}

function closeModal() {
    isOpen.value = false;
}

defineExpose({ openModal, closeModal });
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            @click.self="closeModal">
            <div class="max-h-[90vh] bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
                <div class="mb-4 max-h-[100%]">
                    <component :is="component" v-bind="componentProps" />
                </div>
            </div>
        </div>
    </Teleport>
</template>
