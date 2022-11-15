<template>
	<div class="q-mx-md">
		<q-input
			type="email"
			bg-color="white"
			style="font-family: Quicksand-Book"
			:input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
			class="q-my-lg"
			rounded
			outlined
			v-model="email"
			label="Email"
		/>
		<q-input type="password" bg-color="white" style="font-family: Quicksand-Book" :input-style="{ fontFamily: 'Keep Calm', color: '#717171' }" rounded outlined v-model="password" label="Password" />

		<div class="q-pa-md">
			<q-checkbox dark class="text-white" v-model="rememberMe" label="Remember me" style="font-family: Keep Calm" />
		</div>

		<div style="text-align: center">
			<q-btn type="submit" rounded color="light-blue-3" style="font-family: Keep Calm; width: 300px" align="center" label="Login" to="home" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
</script>
