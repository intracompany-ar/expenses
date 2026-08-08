<!-- Sin terminar, no es fácil -->
<script setup>

const type = ref('income')  // puede ser expense => cambia color y redirecciona a otro formulario

const formula = ref('')

const total = computed(() => {
    return 0
})


</script>

<template>
    <div>
        <div class="text-ligth" :class="{ 'bg-green-500': type == 'income', 'bg-red-500': type == 'income' }">{{ total }}
        </div>


        Input importe con calculadora incluida


        <div>

            Continuar
        </div>

    </div>
</template>