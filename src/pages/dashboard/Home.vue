<template>
  <div class="container-fluid mb-10">
    <v-overlay :value="!loaded">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container fluid class="mt-7">
      <v-row class="d-flex justify-space-between">
        <v-card class="mx-auto" max-width="344" max-height="120">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline">User</div>
              <v-list-item-title class="text-h5 mb-1">
                <animated-number :value="totalUsers" :duration="1000" :formatValue="formatNumber" />
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <v-icon x-large color="#0AA1DD" style="font-size: 50px">
                mdi-account-star</v-icon
              ></v-list-item-avatar
            >
          </v-list-item>
        </v-card>
        <v-card class="mx-auto" max-width="344" max-height="120">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline">Products</div>
              <v-list-item-title class="text-h5 mb-1">
                <animated-number :value="totalItems" :duration="1000" :formatValue="formatNumber" />
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <v-icon x-large color="#3F4E4F" style="font-size: 50px">
                mdi-sprout</v-icon
              ></v-list-item-avatar
            >
          </v-list-item>
        </v-card>
        <v-card class="mx-auto" max-width="344" max-height="120">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline">Order</div>
              <v-list-item-title class="text-h5 mb-1">
                <animated-number :value="totalOrders" :duration="1000" :formatValue="formatNumber" />
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <v-icon x-large color="#A27B5C" style="font-size: 50px">
                mdi-cart</v-icon
              ></v-list-item-avatar
            >
          </v-list-item>
        </v-card>
        <v-card class="mx-auto" max-width="344" max-height="120">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline">Shipper</div>
              <v-list-item-title class="text-h5 mb-1">
                <animated-number :value="totalShippers" :duration="1000" :formatValue="formatNumber" />
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <v-icon x-large color="#371B58" style="font-size: 50px">
                mdi-dump-truck</v-icon
              ></v-list-item-avatar
            >
          </v-list-item>
        </v-card>
      </v-row>
    </v-container>
    <p
      class="text-center mt-10 text-overline"
      style="font-size: 26px !important"
    >
      TOTAL REVENUE STATISTICS
    </p>
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
    <p
      class="text-center mt-10 text-overline"
      style="font-size: 26px !important"
    >
      STATISTICS OF PRODUCTS SOLD
    </p>
    <pie-chart v-if="loaded" :chartdata="chartdata1" :options="options1" />
  </div>
</template>

<script>
import OrderAPI from "../../api/OrderAPI";
import ProductAPI from "../../api/ProductAPI";
import BarChart from "../../chart/BarChart";
import PieChart from "../../chart/PieChart";
import AnimatedNumber from "animated-number-vue";
import UserAPI from "../../api/UserAPI";

export default {
  name: "ChartContainer",
  components: { BarChart, PieChart, AnimatedNumber },
  data: () => ({
    totalItems: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalShippers: 0,
    loaded: false,
    nowYear: "",
    years: ["2020", "2021", "2022", "2023"],
    dataBarChart: [],
    total_revenue: 0,
    chartdata: null,
    chartdata1: null,
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                let format = String(value);
                return format.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              },
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    options1: {
      legend: { display: true },
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  created() {
    this.getAllUser();
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
    formatNumber(value) {
      return value.toFixed(0);
    },
    getMonthData(date) {
      let dt = new Date(date);
      return dt.getMonth();
    },
    async getAllUser() {
      await UserAPI.get_all()
        .then((response) => {
          this.totalUsers = response.data.filter(user => user.position === "customer").length;
          this.totalShippers = response.data.filter(user => user.position === "shipper").length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getYearData(date) {
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
    HEX(r, g, b) {
      var hex = function (x) {
        x = x.toString(16);
        if (x.length < 2) return "0" + x;
        return x.substring(x.length - 2, x.length);
      };
      var color = hex(r) + hex(g) + hex(b);
      return "#" + color;
    },
    parseRGB(color) {
      var r = parseInt(color.substring(1, 3), 16);
      var g = parseInt(color.substring(3, 5), 16);
      var b = parseInt(color.substring(5, 7), 16);
      return [r, g, b];
    },
    color_ver_gradient(begin, end, num) {
      var color = [];
      var ratio = 1 / num;
      var [rb, gb, bb] = this.parseRGB(begin);
      var [re, ge, be] = this.parseRGB(end);

      for (var i = 0; i < num; i++) {
        var rt = i * ratio;
        var r = Math.ceil(rb * (1 - rt) + re * rt);
        var g = Math.ceil(gb * (1 - rt) + ge * rt);
        var b = Math.ceil(bb * (1 - rt) + be * rt);
        var c = this.HEX(r, g, b);
        color.push(c);
      }
      return color;
    },
    color_ver_gradient_n(primary, num) {
      var color = [];
      var no_pri = primary.length;
      var no_perPri = num / no_pri;
      var gradient = [];
      for (var i = 0; i < no_pri - 1; i++) {
        var begin = primary[i];
        var end = primary[i + 1];
        gradient = this.color_ver_gradient(begin, end, no_perPri);
        color = color.concat(gradient);
      }
      gradient = this.color_ver_gradient(
        primary[no_pri - 1],
        primary[0],
        no_perPri
      );
      color = color.concat(gradient);
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

      await OrderAPI.getByStatus("Received")
        .then((res) => {
          try {
            const data = res.data;
            this.totalOrders = res.data.length;

            const date_value = data.map((item) => {
              return { total_price: item.total_price, date: item.updatedAt };
            });

            this.dataBarChart = date_value.filter(
              (item) => String(this.getYearData(item.date)) == this.nowYear
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
                  backgroundColor: "#FF6347",
                  data: dataValue,
                },
              ],
            };
            this.loaded = true;
          } catch (e) {
            console.error(e);
            this.loaded = true;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loaded = true;
        });
    },
  },

  async mounted() {
    await ProductAPI.get()
      .then((res) => {
        try {
          this.totalItems = res.data.length;
          let top5Item = res.data
            .sort((a, b) => b.quantity_sold - a.quantity_sold)
            .slice(0, 5);
          const pieData = top5Item.map((item) => {
            return { name: item.name, quantity_sold: item.quantity_sold };
          });
          var colorGradient = ["#FF6347", "#FFFF00", "#40E0D0", "#008080"];
          var colors = this.color_ver_gradient_n(colorGradient, pieData.length);
          this.chartdata1 = {
            labels: pieData.map((item) => item.name),
            datasets: [
              {
                label: "VNĐ",
                backgroundColor: colors,
                data: pieData.map((item) => item.quantity_sold),
              },
            ],
          };
        } catch (error) {
          console.log(error);
        }
        this.changeYear();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
