<template>
    <div class="card mb-4">
        <div class="card-header">
            <i class="fas fa-chart-bar mr-1"></i>
            Bar Chart Example
        </div>
        <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
    </div>
</template>

<script>
import Chart from 'chart.js';
import barChartData from '../assets/scripts/chart-bar.js';

export default {
    data() {
        return {
            barChartData: barChartData,
        }
    },
    mounted() {
        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';
        
        // Area Chart Example
        var ctx = document.getElementById("myBarChart");
        new Chart(ctx, this.barChartData)
    }
}
</script>

<style>

</style>