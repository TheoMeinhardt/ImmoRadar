<template>
	<form @submit.prevent="submitLogin" class="q-mx-md">
		<div v-if="loginErrors.length > 0" class="error-message-container">
			<p class="text-white">{{ loginErrors }}</p>
		</div>
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
			required
		/>
		<q-input
			type="password"
			bg-color="white"
			style="font-family: Quicksand-Book"
			:input-style="{ fontFamily: 'Keep Calm', color: '#717171' }"
			rounded
			outlined
			v-model="password"
			label="Password"
			required
		/>

		<div class="q-pa-md">
			<q-checkbox dark class="text-white" v-model="rememberMe" label="Remember me" style="font-family: Keep Calm" />
		</div>

		<div style="text-align: center">
			<q-btn type="submit" rounded color="light-blue-3" style="font-family: Keep Calm; width: 300px" align="center" label="Login" class="btn" />
		</div>
	</form>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const loginErrors = ref('');

async function submitLogin() {
	try {
		const res = await axios.post('/api/user/login', {
			email: email.value,
			password: password.value,
		});

		if (res.status === 200 && res.data !== false) router.push('/');
		else if (res.status === 200 && res.data === false) loginErrors.value = 'Invalid Email or Password!';
	} catch (err) {
		if (err.request.status === 400) loginErrors.value = 'Invalid Email or Password!';
	}
}
</script>

<style>
.error-message-container {
	border: 2px #ec5864 solid;
	border-radius: 99px;
	padding-left: 15px;
	height: 2.5rem;
	line-height: 2.31rem;

	background-color: #ec58646a;
}

body {
	background-color: #4b506e;
}
</style>
