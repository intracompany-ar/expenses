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
    <div v-if="mensajeVisible" class="fixed top-15 right-4 bg-green-500 text-white p-3 rounded shadow">
        <button v-on:click="cerrarMensaje" class="float-right text-white font-bold">
            X</button>
        <div>
            {{ mensaje }}
        </div>
    </div>
</template>
