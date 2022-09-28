<template>
	<div id="body" class="xs">
		<h4 style="font-family: Quicksand" class="text-white text-center">ImmoRadar</h4>
		<q-tabs style="font-family: Keep Calm" class="text-white">
			<q-route-tab to="/form">Login</q-route-tab>
			<q-route-tab to="/form/register">Register</q-route-tab>
		</q-tabs>
		<RouterView class="q-mt-xl"></RouterView>
	</div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
#body {
	height: 100vh;
	background-color: #4b506e;
}
</style>
