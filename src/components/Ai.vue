<template>
  <section class="Ai">
    <div class="rank">
      <p class="rank-title">Current Rank</p>
      <p class="rank-num">#{{ rank }}</p>
    </div>
    <div class="col analysis">
      <div class="row">
        <h1 class="title">Coin Grid Analysis</h1>
        <h1 class="beta">AI Beta</h1>
      </div>

      <div v-if="loading" class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p v-else class="summary">{{ completion || "No data available." }}</p>
    </div>
  </section>
</template>

<script>
import OpenAI from "openai";

export default {
  props: {
    symbol: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      completion: "",
      loading: false, // Add a loading state
    };
  },
  watch: {
    symbol: {
      handler: "onSymbolChange",
      immediate: true,
    },
  },
  mounted() {
    console.log("Component mounted");
  },
  methods: {
    async onSymbolChange() {
      this.loading = true; // Set loading state to true when symbol changes
      console.log("Symbol changed:", this.symbol);
      await this.generateCompletion();
      this.loading = false; // Set loading state back to false once data is fetched
    },
    async generateCompletion() {
      console.log("Generating completion");
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      

      if (!apiKey) {
        console.error("OpenAI API key is not available.");
        return;
      }

      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
      });
      console.log("OpenAI client initialized");

      try {
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "Can you please give me a 25 word summary about " + this.name,
            },
          ],
          model: "gpt-3.5-turbo",
        });

        this.completion = completion.choices[0].message.content;
      } catch (error) {
        console.error("Error generating completion:", error);
      }
    },
  },
};
</script>

<style>
.loading {
  color: gray;
}
</style>
