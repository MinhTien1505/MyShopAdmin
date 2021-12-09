<template>
  <div class="container-fluid">
    <v-overlay :value="!loaded">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <h2 class="text-center mt-5">TOTAL REVENUE STATISTICS</h2>
    <v-container fluid>
      <v-row>
        <v-col cols="9"></v-col>
        <v-col cols="3" align-self="end">
          <v-autocomplete
            :items="years"
            item-text="name"
            v-model="nowYear"
            label="Select a year"
            @change="changeYear()"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>

    <h4 class="text-right">Total revenue: {{ total_revenue | toVND }}</h4>
    <bar-chart v-if="loaded" :chartdata="chartdata" :options="options" />
    <v-divider></v-divider>
    <h2 class="text-center mt-5">STATISTICS OF PRODUCTS SOLD</h2>
    <pie-chart v-if="loaded" :chartdata="chartdata1" :options="options" />
  </div>
</template>

<script>
import axios from "axios";
import BarChart from "../../chart/BarChart";
import PieChart from "../../chart/PieChart";

export default {
  name: "ChartContainer",
  components: { BarChart, PieChart },
  data: () => ({
    loaded: false,
    nowYear: "",
    years: ["2020", "2021", "2022", "2023"],
    dataBarChart: [],
    total_revenue: 0,
    chartdata: null,
    chartdata1: null,
    options: {
      legend: { display: true },
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  created() {
    const year = new Date().getFullYear();
    this.nowYear = String(year);
    console.log(this.nowYear);
  },
  filters: {
    toVND: function (value) {
      if (typeof value !== "number") {
        value = parseInt(value);
      }
      var formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      });
      return formatter.format(value);
    },
    toNum: function (value) {
      if (typeof value !== "number") {
        value = parseInt(value);
      }
      var formatter = new Intl.NumberFormat();
      return formatter.format(value);
    },
  },
  methods: {
    getMonthData(date) {
      let dt = new Date(date);
      return dt.getMonth();
    },
    getYearhData(date) {
      let dt = new Date(date);
      return dt.getFullYear();
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    async changeYear() {
      this.total_revenue = 0;
      let dataValue = [];
      let JanuaryData = 0;
      let FebruaryData = 0;
      let MarchData = 0;
      let AprilData = 0;
      let MayData = 0;
      let JuneData = 0;
      let JulyData = 0;
      let AugustData = 0;
      let SeptemberData = 0;
      let OctoberData = 0;
      let NovemberData = 0;
      let DecemberData = 0;
      this.loaded = false;
      try {
        const data = (
          await axios.get("http://localhost:5000/api/getAllOrders")
        ).data.filter((item) => item.status == "Received");
        const date_value = data.map((item) => {
          return { total_price: item.total_price, date: item.updatedAt };
        });
        this.dataBarChart = date_value.filter(
          (item) => String(this.getYearhData(item.date)) == this.nowYear
        );
        for (let item of this.dataBarChart) {
          this.total_revenue += Number(item.total_price);
          if (this.getMonthData(item.date) == 0) {
            JanuaryData += Number(item.total_price);
          }
          if (this.getMonthData(item.date) == 1) {
            FebruaryData += Number(item.total_price);
          }
          if (this.getMonthData(item.date) == 2) {
            MarchData += Number(item.total_price);
          }
          if (this.getMonthData(item.date) == 3) {
            AprilData += Number(item.total_price);
          }
          if (this.getMonthData(item.date) == 4) {
            MayData += Number(item.total_price);
          }
          if (this.getMonthData(item.date) == 5) {
            JuneData += Number(item.total_price);
          }
          if (this.getMonthData(item.date) == 6) {
            JulyData += Number(item.total_price);
          }
          if (this.getMonthData(item.date) == 7) {
            AugustData += Number(item.total_price);
          }
          if (this.getMonthData(item.date) == 8) {
            SeptemberData += Number(item.total_price);
          }
          if (this.getMonthData(item.date) == 9) {
            OctoberData += Number(item.total_price);
          }
          if (this.getMonthData(item.date) == 10) {
            NovemberData += Number(item.total_price);
          }
          if (this.getMonthData(item.date) == 11) {
            DecemberData += Number(item.total_price);
          }
        }
        dataValue = [
          JanuaryData,
          FebruaryData,
          MarchData,
          AprilData,
          MayData,
          JuneData,
          JulyData,
          AugustData,
          SeptemberData,
          OctoberData,
          NovemberData,
          DecemberData,
        ];
        this.chartdata = {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "VNĐ",
              backgroundColor: "#f87979",
              data: dataValue,
            },
          ],
        };
        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
  },

  async mounted() {
    try {
      const pieData = (
        await axios.get("http://localhost:5000/api/getallproducts")
      ).data.map((item) => {
        return { name: item.name, quantity_sold: item.quantity_sold };
      });
      let listColor = [];
      for (let i = 0; i < pieData.length; i++) {
        listColor.push(this.getRandomColor());
      }
      this.chartdata1 = {
        labels: pieData.map((item) => item.name),
        datasets: [
          {
            label: "VNĐ",
            backgroundColor: listColor,
            data: pieData.map((item) => item.quantity_sold),
          },
        ],
      };
    } catch (error) {
      console.log(error);
    }
    this.changeYear();
  },
};
</script>
