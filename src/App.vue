<template>
  <h1 class="logo">Coin Grid</h1>
  <div class="wrapper">
    <div class="grid1">
      <Search
        @chart-info-updated="updateChartInfo"
        @coin-info-updated="updateCoinInfo"
      />
    </div>
    <div class="grid2">
      <MarketCap
        v-if="coinInfo"
        :marketCap="coinInfo.marketCapUsd"
        :supply="coinInfo.supply"
        :maxSupply="coinInfo.maxSupply"
      ></MarketCap>
    </div>
    <!-- Display other components -->
    <div class="grid3">
      <Ai
        v-if="coinInfo"
        :name="coinInfo.name"
        :symbol="coinInfo.symbol"
        :rank="coinInfo.rank"
      ></Ai>
    </div>
    <div class="grid4">
      <Links v-if="coinInfo" :name="coinInfo.name"></Links>
    </div>
    <div class="grid5">
      <Price
        v-if="coinInfo"
        :price="coinInfo.priceUsd"
        :name="coinInfo.name"
      ></Price>
    </div>
    <div class="grid6">
      <Change
        v-if="coinInfo"
        :changePercent="coinInfo.changePercent24Hr"
      ></Change>
    </div>
    <div class="grid7">
      <Chart
        v-if="coinInfo"
        :price="coinInfo.priceUsd"
        :chartData="chartData"
      />
    </div>
    <div class="grid8">
      <Ticker
        v-if="coinInfo"
        :symbol="coinInfo.symbol"
        :name="coinInfo.name"
      ></Ticker>
    </div>
    <Background />
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import Price from "./components/Price.vue";
import MarketCap from "./components/MarketCap.vue";
import Change from "./components/Change.vue";
import Ticker from "./components/Ticker.vue";
import Links from "./components/Links.vue";
import Ai from "./components/Ai.vue";
import Chart from "./components/Chart.vue";
import Background from "./components/Background.vue";

export default {
  components: {
    Search,
    Price,
    MarketCap,
    Change,
    Ticker,
    Links,
    Ai,
    Background,
    Chart,
  },
  data() {
    return {
      coinInfo: null,
      chartData: [],
    };
  },
  methods: {
    // This method is called when the coin info is updated in Search.vue
    updateCoinInfo(newCoinInfo) {
      this.coinInfo = newCoinInfo;
    },
    updateChartInfo(newChartData) {
      this.chartData = newChartData;

      console.log("chart data info made it to the app.vue", newChartData);
    },
  },
};
</script>
