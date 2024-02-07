<template>
  <section class="Links">
    <div class="content">
      <h1 class="title-rg">Helpful Links</h1>
      <a target=”_blank” :href="buildLinkCG"
        >Coin Gecko
        <img class="link-icon" src="../assets/icons/link.png" alt=""
      /></a>
      <a target=”_blank” :href="buildLinkCMC"
        >Coin Market Cap<img
          class="link-icon"
          src="../assets/icons/link.png"
          alt=""
      /></a>
      <a target=”_blank” :href="buildLinkCU"
        >Coin Check Up<img
          class="link-icon"
          src="../assets/icons/link.png"
          alt=""
      /></a>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    buildLinkCG() {
      const baseLink = "https://www.coingecko.com/en/coins/";
      const coinName = this.name.toLowerCase().replace(/\s+/g, "-"); // Assuming you might need to handle names with spaces
      return baseLink.concat(coinName);
    },
    buildLinkCMC() {
      const baseLink = "https://coinmarketcap.com/currencies/";
      const coinName = this.name.toLowerCase().replace(/\s+/g, "-"); // Assuming you might need to handle names with spaces
      return baseLink.concat(coinName);
    },
    buildLinkCU() {
      const baseLink = "https://coincheckup.com/coins/";
      const coinName = this.name.toLowerCase().replace(/\s+/g, "-"); // Assuming you might need to handle names with spaces
      return baseLink.concat(coinName);
    },
  },
};
</script>
