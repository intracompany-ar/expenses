<script setup lang="ts">
useHead({
	title: 'Expenses | IceO App',
	meta: [
		{ name: 'description', content: 'Aplicación para llevar registro de ingresos y egeresos de tu vida cotidianda de forma simplificada. Un buen control de tu contabilidad es la clave del éxito financiero.' }
	],

  	script: [ { innerHTML: 'console.log(\'Hello world\')' } ],

	link: [
    {
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap',
		crossorigin: ''
    }
  ]
})

useSeoMeta({
  	title: 'Expenses | IceO App',
  	ogTitle: 'Expenses | IceO App',
  	description: 'Aplicación para llevar registro de ingresos y egeresos de tu vida cotidianda de forma simplificada. Un buen control de tu contabilidad es la clave del éxito financiero.',
  	ogDescription: 'Aplicación para llevar registro de ingresos y egeresos de tu vida cotidianda de forma simplificada. Un buen control de tu contabilidad es la clave del éxito financiero.',
  	// ogImage: 'https://example.com/image.png',
  	// twitterCard: 'summary_large_image',
})
</script>


<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<!-- <NuxtWelcome /> -->
</template>
