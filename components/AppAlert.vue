<script setup>
const props = defineProps(['message'])

const mensaje = ref('');
const mensajeVisible = ref(false);

mensaje.value = props.message;

if (mensaje.value) {
    abrirMensaje();
}

function abrirMensaje() {
    // Mostrar el mensaje
    mensajeVisible.value = true;

    // Iniciar temporizador para cerrar el mensaje después de 30 segundos
    setTimeout(() => {
        cerrarMensaje();
    }, 10000);
}

function cerrarMensaje() {
    mensajeVisible.value = false;
    mensaje.value = '';
}
</script>

<template>
    <div v-if="mensajeVisible"
        class="tw-fixed tw-top-15 tw-right-4 tw-bg-green-500 tw-text-white tw-p-3 tw-rounded tw-shadow">
        <button v-on:click="cerrarMensaje" class="tw-float-right tw-text-white tw-font-bold"><fa-icon
                icon="fa-solid fa-xmark"></fa-icon></button>
        <div>
            {{ mensaje }}
        </div>
    </div>
</template>
