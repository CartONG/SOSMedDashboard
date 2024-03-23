<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable object-shorthand -->
<template>
    <div class="chart-container">
        <canvas id="myChart"></canvas>
    </div>
</template>

<script setup lang="ts">
import { store } from "@/main"
import { watch } from "vue"
import Chart from "chart.js/auto"

let mixedChart: Chart<"bar" | "line", any[], unknown> | null = null

watch(() => store.getData().filteredOpsData, () => {
  const dataset: Record<string, any> = {}
  store.getData().filteredOpsData.forEach(x => {
    const month = x.date.getMonth() + 1
    const year = x.date.getFullYear()
    if (dataset[month + "_" + year]) {
      dataset[month + "_" + year].nbObs += x.nbOps
      dataset[month + "_" + year].nbSurvivor += x.nbSurvivor
    } else {
      dataset[month + "_" + year] = {
        unitTimeValue: (year * 1000) + month,
        label: `${month}/${year}`,
        nbObs: x.nbOps,
        nbSurvivor: x.nbSurvivor
      }
    }
  })
  let datasetArray = []
  for (const key in dataset) {
    datasetArray.push(dataset[key])
  }
  datasetArray = datasetArray.sort((a, b) => a.unitTimeValue - b.unitTimeValue)
  const labels = datasetArray.map(x => x.label)
  const survivors = datasetArray.map(x => x.nbSurvivor)
  const operations = datasetArray.map(x => x.nbObs)
  console.log(operations)
  const ctx = document.getElementById("myChart")
  console.log(mixedChart)
  if (mixedChart) (mixedChart as any).destroy()

  mixedChart = new Chart((ctx as ChartItem), {
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true
        },
        y: {
          type: "linear",
          display: true,
          position: "left"
        },
        y1: {
          type: "linear",
          display: true,
          position: "right"
        }
      }
    },
    type: "bar",
    data: {
      labels,
      datasets: [{
        type: "bar",
        label: "Number of operations",
        data: operations,
        borderColor: "#F03E1B",
        backgroundColor: "#F03E1B",
        yAxisID: "y",
        order: 2
      },
      {
        type: "line",
        label: "Peoples rescued",
        data: survivors,
        backgroundColor: "#1A2747",
        borderColor: "#1A2747",
        yAxisID: "y1",
        order: 1
      }
      ]
    }
  })
})
</script>

<style>
.chart-container{
    position: absolute;
    bottom: 15px;
    left: 3%;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.7);
    height: 25vh;
    width: 70vw;
    border-radius: 10px;
}
</style>
