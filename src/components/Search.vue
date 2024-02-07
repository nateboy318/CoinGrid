<template>
  <section class="Search">
    <div class="col">
      <h1 class="bold">Overview</h1>
      <h2>Buy Now</h2>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for a coin"
        @keyup.enter="fetchData"
      />
      <button class="search-btn" @click="fetchData">
        <img class="search-icon" src="../assets/icons/search.png" alt="" />
      </button>
    </div>
    <div class="col">
      <div class="stack">
        <h1 class="title">Coin Grid</h1>
        <p class="sub">Trade Cleaner</p>
      </div>
      <button class="refresh-btn">
        <img class="grid-icon" src="../assets/icons/grid.png" alt="" />
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "Ethereum", // Set the default search query to "ethereum"
      coinInfo: null,
    };
  },
  mounted() {
    this.fetchCoinInfo(); // Automatically fetch Ethereum info when the component mounts
    this.fetchChartInfo();
  },
  computed: {
    reload() {
      document
        .getElementById("refreshButton")
        .addEventListener("click", function () {
          window.location.reload();
        });
    },
  },
  methods: {
    async fetchData() {
      await Promise.all([this.fetchCoinInfo(), this.fetchChartInfo()]);
    },
    async fetchCoinInfo() {
      try {
        const formattedSearchQuery = this.searchQuery
          .toLowerCase()
          .replace(/\s+/g, "-");
        const response = await fetch(
          `https://api.coincap.io/v2/assets/${formattedSearchQuery}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            this.coinInfo = data.data;
            // Emit an event to notify App.vue about the new coinInfo
            this.$emit("coin-info-updated", this.coinInfo);
          } else {
            console.error("Coin not found:", this.searchQuery);
          }
        } else {
          console.error("Failed to fetch coin info:", response.statusText);
          alert("Coin Not Found");
        }
      } catch (error) {
        console.error("Error fetching coin info:", error);
      }
    },
    async fetchChartInfo() {
      try {
        const formattedCoinName = this.searchQuery
          .toLowerCase()
          .replace(/\s+/g, "-");
        const response = await fetch(
          `https://api.coincap.io/v2/assets/${formattedCoinName}/history?interval=h2`
        );

        if (response.ok) {
          const dataSet = await response.json();

          // Get the last 7 elements of the data array
          const recentData = dataSet.data.slice(-12);

          // Extract price data from recent data and convert to numbers
          const priceArr = recentData.map((item) => parseFloat(item.priceUsd));
          console.log("New dataset:", priceArr);
          if (priceArr) {
            this.$emit("chart-info-updated", priceArr);
          }
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    },
  },
};
</script>
