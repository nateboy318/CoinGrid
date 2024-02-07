<template>
  <section class="Price">
    <div class="col">
      <img class="dollar-sign-icon" src="../assets/icons/dollar.png" alt="" />
    </div>
    <div class="col">
      <div class="content">
        <h1 class="title">USD Price of {{ name }}</h1>
        <p class="price-text">{{ formattedPrice }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    price: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedPrice() {
      // Convert price to a number, then convert to string with 2 decimal places
      const priceNumber = Number(this.price);
      return priceNumber.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
