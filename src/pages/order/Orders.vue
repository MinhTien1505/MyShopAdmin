<template>
    <!-- <div class="container-fluid"> -->
    <div class="card mb-4">
        <div class="card-header">
            <i class="fas fa-receipt"></i>
            Manage Orders
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered"
                        id="dataTable"
                        width="100%"
                        cellspacing="0">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Customer</th>
                            <th>Name</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Order at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="order in data">
                            <tr :key="order._id">
                                <td>{{ order._id | toCODE }}</td>
                                <td>{{ order.user.username}}</td>
                                <td>{{ order.full_name}}</td>
                                <td>{{ order.total_price | toVND }}</td>
                                
                                <td>
                                    <p v-if="order.status == 'Pending'"
                                        class="order-status status-pending">
                                        {{ order.status }}
                                    </p>
                                    <p v-if="order.status == 'Approved'"
                                        class="order-status status-approved">
                                        {{ order.status }}
                                    </p>
                                    <p v-if="order.status == 'Pick-up'"
                                        class="order-status status-pick-up">
                                        {{ order.status }}
                                    </p>
                                    <p v-if="order.status == 'Delivering'"
                                        class="order-status status-delivering">
                                        {{ order.status }}
                                    </p>
                                    <p v-if="order.status == 'Received'"
                                        class="order-status status-received">
                                        {{ order.status }}
                                    </p>
                                    <p v-if="order.status == 'Cancel'"
                                        class="order-status status-cancel">
                                        {{ order.status }}
                                    </p>
                                </td>

                                <td>{{ order.date | toDateTime }}</td>

                                <td>
                                    <div class="actions-in-table">
                                        <button class="btn-in-table btn-edit"
                                            @click="viewOrder(order._id)">
                                            <i class="fas fa-eye"></i> View
                                        </button>
                                        <button v-if="order.status == 'Pending'"
                                            class="btn-in-table btn-disable"
                                            data-toggle="modal"
                                            data-target="#exampleModalCenter"
                                            @click="prepareModalApproved(order._id)">
                                            <i class="fas fa-clipboard-check"></i> Approved
                                        </button>
                                        <button v-if="order.status == 'Pending' || order.status == 'Approved'"
                                            class="btn-in-table btn-active"
                                            data-toggle="modal"
                                            data-target="#exampleModalCenter"
                                            @click="prepareModalCancel(order._id)">
                                            <i class="fas fa-times"></i> Cancel
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>

                <div class="modal fade"
                    id="exampleModalCenter"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">
                                    {{ this.dataModal.title }}
                                </h5>
                                <button type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <b class="title">{{ this.dataModal.question }}</b>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-secondary" data-dismiss="modal">
                                    Close
                                </button>
                                <button class="btn btn-danger"
                                    data-dismiss="modal"
                                    @click="updateStatus()">
                                    {{ this.dataModal.btn }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <v-snackbar v-model="snackbar"
                        color="success"
                        v-if="this.$route.params.message"
                        timeout="3000"
                        :multi-line="true"
                        outlined >
                    {{ this.$route.params.message }}

                    <template v-slot:action="{ attrs }">
                        <v-btn color="red"
                            fab
                            text
                            v-bind="attrs"
                            @click="snackbar = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </template>
                </v-snackbar>
                <v-snackbar v-model="snackbar1"
                    color="success"
                    timeout="3000"
                    :multi-line="true"
                    outlined>
                    {{ this.msg_snackbar }}
                    <template v-slot:action="{ attrs }">
                        <v-btn color="red"
                            fab
                            text
                            v-bind="attrs"
                            @click="snackbar1 = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </template>
                </v-snackbar>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
import "datatables.net";
import "datatables.net-bs4";

import $ from "jquery";
import axios from "axios";

export default {
    data() {
        return {
            data: [],
            snackbar: true,
            snackbar1: false,
            msg_snackbar: "",
            id_selected: "",
            dataModal: {
                title: "",
                question: "",
                btn: "",
                status: "",
            },
        };
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
        }
    },
    methods: {
        getAllOrders() {
            axios
                .get("http://localhost:5000/api/getAllOrders")
                .then((response) => {
                    this.data = response.data;

                    $(document).ready(function() {
                        $("#dataTable").DataTable({
                            columnDefs: [
                                { width: "6%", targets: 0 },
                                { width: "10%", targets: 1 },
                                { width: "14%", targets: 2 },
                        
                                { width: "12%", targets: 3 },
                                { width: "8%", targets: 4 },

                                { width: "18%", targets: 5 },
                                { width: "32%", targets: 6 },
                            ],
                        });
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        viewOrder(order_id) {
            this.$router.push({
                name: "ViewOrder",
                params: { order_id: order_id },
            });
        },
        prepareModalApproved(order_id) {
            this.id_selected = order_id;
            this.dataModal.title = "Approved Order";
            this.dataModal.question = "Are you sure you want to Approved this Order?";
            this.dataModal.btn = "Approved";
            this.dataModal.status = "Approved";
        },
        prepareModalCancel(user_id) {
            this.id_selected = user_id;
            this.dataModal.title = "Cancel Order";
            this.dataModal.question = "Are you sure you want to Cancel this Order?";
            this.dataModal.btn = "Cancel";
            this.dataModal.status = "Cancel";
        },
        async updateStatus() {
            let token = JSON.parse(sessionStorage.getItem("admin_login"));
            let config = {
                headers: { Authorization: "bearer " + token },
            };

            this.msg_snackbar = "";
            await axios
                .patch(
                    `http://localhost:5000/api/orders/updateStatus/${this.id_selected}`,
                    { status: this.dataModal.status },
                    config
                )
                .then((res) => {
                    console.log(res);

                    if (this.dataModal.status == "Approved") {
                        this.msg_snackbar = "Approved Order Successfully!";
                    } else if (this.dataModal.status == "Cancel") {
                        this.msg_snackbar = "Cancel Order Successfully!";
                    }

                    this.getAllOrders();
                    this.snackbar1 = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped>
    .btn-create-new {
        margin-left: 16px;
        padding: 8px 16px;
        background-color: #04aa6d;
        color: #ffffff;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 400;
    }

    .btn-create-new i {
        padding-right: 8px;
    }

    .avatar-in-table {
        width: 37px;
        height: 37px;
        border: 3px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
    }

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

    .order-status {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 4px;
        color: #ffffff;
        /* line-height: 1.25em; */
        font-size: 0.9em;
        text-transform: capitalize;
    }

    .status-pending {
        background-color: #E56A5E;
    }

    .status-approved {
        background-color: #00D17C;
    }

    .status-pick-up {
        background-color: #702AC5;
    }

    .status-delivering {
        background-color: #0FB7BA;
    }

    .status-received {
        background-color: #3b8bea;
    }

    .status-cancel {
        background-color: #92a4a4;
    }

    .user-status {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 4px;
        color: #ffffff;
        /* line-height: 1.25em; */
        font-size: 0.9em;
        text-transform: capitalize;
    }

    .stt-active {
        background-color: #00bb9c;
    }

    .stt-disable {
        background-color: #92a4a4;
    }

    .actions-in-table {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    /* .btn-in-table {
            padding: 4px;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            color: #ffffff;
        } */

    .btn-in-table {
        padding: 4px 12px;
        /* width: 32px;
                height: 32px; */
        border-radius: 6px;
        color: #ffffff;
        font-size: 0.9em;
    }

    .btn-in-table i {
        /* width: 20px;
                height: 20px; */
        font-size: 1em;
        padding-right: 4px;
    }

    .btn-edit {
        background-color: #009efb;
    }

    .btn-disable {
        background-color: #ff6c65;
    }

    .btn-active {
        background-color: #47d0be;
    }
</style>
