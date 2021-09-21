<template>
    <div class="card mb-4">
        <div class="card-header">
            <i class="fas fa-chart-area mr-1"></i>
            Area Chart Example
        </div>
        <div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
    </div>
</template>

<script>
import Chart from 'chart.js';
import areaChartData from '../assets/scripts/chart-area';

export default {
    data() {
        return {
            areaChartData: areaChartData,
        }
    },
    mounted() {
        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';
        
        // Area Chart Example
        var ctx = document.getElementById("myAreaChart");
        new Chart(ctx, this.areaChartData);
    }
}
</script>

<style>

</style>