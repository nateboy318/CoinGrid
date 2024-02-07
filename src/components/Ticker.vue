<template>
  <section class="Ticker">
    <p class="title">Coin</p>
    <div class="content">
      <p class="symbol">{{ symbol }}</p>
      <p class="name">{{ name }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    symbol: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {},
};
</script>
