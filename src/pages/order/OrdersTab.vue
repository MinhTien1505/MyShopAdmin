<template>
    <!-- <div class="container-fluid"> -->
    <div class="card mb-4">
        <div class="card-header">
            <i class="fas fa-receipt"></i>
            Manage Orders
        </div>
        <div class="card-body">
            <template>
                <v-card flat>

                    <v-tabs background-color="primary" dark>
                        <v-tab>All</v-tab>
                        <v-tab>Pending</v-tab>
                        <v-tab>Appproved</v-tab>
                        <v-tab>Pick-up</v-tab>
                        <v-tab>Delivering</v-tab>
                        <v-tab>Received</v-tab>
                        <v-tab>Cancel</v-tab>

                        <v-tab-item>
                            <TabOrder :action="true" :orders="data"/>
                        </v-tab-item>

                        <v-tab-item>
                            <TabOrder :action="true" :orders="pendingOrder"/>
                        </v-tab-item>

                        <v-tab-item>
                            <TabOrder :orders="approvedOrder"/>
                        </v-tab-item>

                        <v-tab-item>
                            <TabOrder :action="true" :orders="pickUpOrder"/>
                        </v-tab-item>

                        <v-tab-item>
                            <TabOrder :orders="deliveringOrder"/>
                        </v-tab-item>

                        <v-tab-item>
                            <TabOrder :orders="receivedOrder"/>
                        </v-tab-item>

                        <v-tab-item>
                            <TabOrder :orders="cancelOrder"/>
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </template>
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
import axios from "axios";
import TabOrder from "./TabOrder.vue";

export default {
    components: {
        TabOrder,
    },
    data() {
        return {
            data: [],
        };
    },
    computed: {
        pendingOrder() {
            return this.data.filter((item) => item.status == 'Pending');
        },
        approvedOrder() {
            return this.data.filter((item) => item.status == 'Approved');
        },
        pickUpOrder() {
            return this.data.filter((item) => item.status == 'Pick-up');
        },
        deliveringOrder() {
            return this.data.filter((item) => item.status == 'Delivering');
        },
        receivedOrder() {
            return this.data.filter((item) => item.status == 'Received');
        },
        cancelOrder() {
            return this.data.filter((item) => item.status == 'Cancel');
        },
    },
    mounted() {
        this.getAllOrders();
    },
    filters: {
        toCODE: function(value) {
            return '#O' + value.substring(0, 5);
        },
        toVND: function(value) {
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
        toDateTime: function(value) {
            var date = new Date(value);
            var options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false,
                timeZone: 'Asia/Ho_Chi_Minh'
            };
            return new Intl.DateTimeFormat('en-BG', options).format(date);
        },
    },
    methods: {
        getAllOrders() {
            axios
                .get("http://localhost:5000/api/getAllOrders")
                .then((response) => {
                    this.data = response.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped>
    .card {
        border: none;
    }

    .card-body {
        padding: 0 1.5rem;
    }

    .card-header {
        font-size: 24px;
        font-weight: 600;
        background: none;
        border: none;
        padding: 1rem 1.5rem;
    }

    .card-header i {
        padding-right: 8px;
    }
</style>
