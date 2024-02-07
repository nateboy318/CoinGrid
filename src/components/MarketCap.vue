<template>
  <section class="MarketCap">
    <div class="row">
      <p class="title">
        Market<br />
        Cap
      </p>
      <p class="MaxSupplyVal">{{ formattedMarketCap }}</p>
    </div>
    <div class="row">
      <p class="title">
        Current<br />
        Supply
      </p>
      <p class="MaxSupplyVal">{{ formattedSupply }}</p>
    </div>
    <div class="row">
      <p class="title">
        Max<br />
        Supply
      </p>
      <p class="MaxSupplyVal">{{ formattedMaxSupply }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    marketCap: {
      type: String,
      required: true,
    },
    supply: {
      type: String,
      required: true,
    },
    maxSupply: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formattedMarketCap() {
      // Convert marketCap to a number, then convert to string with 2 decimal places and commas for thousands separators
      const marketCapVal = Number(this.marketCap);
      return marketCapVal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formattedSupply() {
      // Convert marketCap to a number, then convert to string with 2 decimal places and commas for thousands separators
      const supplyVal = Number(this.supply);
      return supplyVal.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formattedMaxSupply() {
      // Convert marketCap to a number, then convert to string with 2 decimal places and commas for thousands separators
      const maxSupplyVal = Number(this.maxSupply);
      return maxSupplyVal.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
