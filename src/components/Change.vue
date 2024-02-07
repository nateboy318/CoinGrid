<template>
  <section class="Change">
    <p class="title">24h Change</p>
    <p class="percentage">{{ cleanedChangePercent }}%</p>
  </section>
</template>

<script>
export default {
  props: {
    changePercent: {
      type: String,
      required: true,
    },
  },
  computed: {
    cleanedChangePercent() {
      // Round to 2 decimal places and convert to string
      return (this.changePercent / 2).toFixed(2);
    },
  },
};
</script>
