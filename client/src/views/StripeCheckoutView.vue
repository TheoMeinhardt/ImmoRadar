<template>
  <div>
    <div class="togethere-background"></div>
    <div class="sr-root">
      <div class="sr-main">
        <header class="sr-header">
          <div class="sr-header__logo"></div>
        </header>
        <h1>Choose a collaboration plan</h1>

        <div class="price-table-container">
          <section>
            <input type="hidden" id="basicPrice" name="priceId" />
            <img src="" width="120" height="120" />
            <div class="name">Starter</div>
            <div class="price">$12</div>
            <div class="duration">per month</div>
            <button @click="createCheckout" id="basic-plan-btn">Select</button>
          </section>
          <section>
            <input type="hidden" id="proPrice" name="priceId" />
            <img src="" width="120" height="120" />
            <div class="name">Professional</div>
            <div class="price">$18</div>
            <div class="duration">per month</div>
            <button @click="createCheckout" id="pro-plan-btn">Select</button>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';

async function createCheckout() {
  const { data } = await axios.post('http://localhost:3000/realestate/create-checkout-session');
  console.log(data);
  window.location = data;
}
</script>
