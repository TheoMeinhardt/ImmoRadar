<template>
  <div>
    <div class="togethere-background"></div>
    <div class="sr-root">
      <div class="sr-main">
        <div class="sr-payment-summary completed-view">
          <h1>Your payment succeeded</h1>
          <h4>View CheckoutSession response:</h4>
        </div>
      </div>
      <div class="sr-content"></div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';

async function createPortal() {
  const { data } = await axios.post('http://localhost:3000/realestate/create-portal-session');
  console.log(data);
  window.location = data;
}
</script>
