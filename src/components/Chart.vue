<template>
  <section class="Chart">
    <div class="container">
      <h2>Current Price</h2>
      <h1>{{ formattedPrice }}</h1>
      <canvas ref="lineChartCanvas"></canvas>
    </div>
  </section>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement
);

export default {
  name: "LineChart",
  props: {
    chartData: {
      type: Object, // Expected type is Object
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.renderChart();
  },

  watch: {
    chartData: {
      handler(newData) {
        if (typeof newData === "object" && newData !== null) {
          // Type check
          this.updateChart(newData);
        } else {
          console.error("Invalid chartData type. Expected Object.");
        }
      },
      deep: true,
    },
  },
  computed: {
    formattedPrice() {
      // Convert price to a number
      const priceNumber = Number(this.price);

      // Check if the price is less than 1
      if (priceNumber < 1) {
        // If the price is less than 1, format it with 5 decimal places
        return priceNumber.toFixed(5);
      } else {
        // If the price is greater than or equal to 1, format it with commas and 2 decimal places

        // Split the price into whole number and decimal parts
        const [wholeNumberPart, decimalPart] = priceNumber
          .toFixed(2)
          .split(".");

        // Add commas to the whole number part
        const formattedWholeNumber = wholeNumberPart.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );

        // Combine the formatted whole number part with the decimal part
        return `${formattedWholeNumber}.${decimalPart}`;
      }
    },
  },
  methods: {
    renderChart(newData) {
      const ctx = this.$refs.lineChartCanvas.getContext("2d");

      this.chart = new ChartJS(ctx, {
        type: "line",
        data: {
          labels: [
            "00:00",
            "02:00",
            "04:00",
            "06:00",
            "08:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00",
          ],
          datasets: [
            {
              data: [0, 0, 0, 0, 0, 0, 0], // Start with an empty dataset
              borderColor: "#87D7F8",
              borderWidth: 5,
              backgroundColor: "transparent",
              pointHoverRadius: 10,
              pointHoverBackgroundColor: "#D8F066",
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                title: () => null, // or function () { return null; }

                label: function (context) {
                  let label = context.dataset.label || "";

                  if (label) {
                    label += ": ";
                  }

                  // Check if the parsed y-value is not null
                  if (context.parsed.y !== null) {
                    // Extract the y-value
                    const yValue = context.parsed.y;

                    // Check if the y-value is greater than 0 before the decimal point
                    const hasPositiveIntegerPart = Math.floor(yValue) > 0;

                    // Format the y-value based on the condition
                    if (hasPositiveIntegerPart) {
                      label += new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2, // Show 2 decimal places
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "USD",
                      }).format(yValue);
                    } else {
                      label += new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 4, // Show 4 decimal places
                        maximumFractionDigits: 6,
                        style: "currency",
                        currency: "USD",
                      }).format(yValue);
                    }
                  }

                  return label;
                },
              },
              enabled: true, // Enable tooltips
              mode: "index", // Show tooltips for each data point
              intersect: false, // Allow tooltips to appear on top of each other
              yAlign: "bottom",

              backgroundColor: "#EFEFEF",
              title: {
                display: false,
              },
              bodyColor: "black",
              bodyFont: {
                family: "Roboto",
                weight: "bold",
              },
            },
            legend: {
              display: false, // Hide legend
            },
          },
          scales: {
            x: {
              ticks: {
                padding: 30,
                color: "black",
                font: {
                  weight: 300,
                  size: 9,
                  family: "Roboto",
                },
              },
              display: true, // Hide x-axis
              grid: {
                display: false, // Hide grid lines for the x-axis
              },
              border: {
                display: false,
              },
              gridLines: {
                color: "transparent", // Set border color of x-axis to transparent
              },
            },
            y: {
              display: false, // Hide y-axis
            },
          },
          elements: {
            line: {
              borderWidth: 2, // Adjust line width as needed
              borderColor: "rgba(135, 215, 248, 1)", // Set line color
              fill: false, // Do not fill the area under the line
            },
            point: {
              radius: 20, // Hide points
              pointBorderColor: "rgba(135, 215, 248, 0)", // Set line color
            },
          },
        },
      });
    },
    updateChart(newData) {
      console.log(
        "Chart.vue update function received data from app.vue",
        newData
      );
      if (this.chart) {
        console.log("Chart exists");
        this.chart.data.datasets[0].data = newData;
        console.log("New chart data loaded into chart", newData);
        if (newData) {
          this.chart.update();
          console.log("Chart updated");
        }
      }
    },
  },
};
</script>
