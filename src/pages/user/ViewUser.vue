<template>
    <div class="container-fluid">
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <v-row>
                <v-col cols="7">
                    <h3 class="pb-4 pt-4">User Information</h3>
                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Username: </label>
                        <div class="col-sm-8">
                            <input type="text"
                                    class="form-control"
                                    :value="user.username"
                                    id="username"
                                    disabled/>
                            <!-- <p class="error-msg" id="username-msg">This is required</p> -->
                        </div>
                        
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Password: </label>
                        <div class="col-sm-8">
                            <input type="password"
                                    class="form-control"
                                    value="password"
                                    id="password"
                                    disabled/>
                            <!-- <p class="error-msg" id="password-msg">This is required</p> -->
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Role: </label>
                        <div class="col-sm-8">
                            <input type="radio"
                                    class="radio-input"
                                    value="Admin"

                                    :checked="user.position == 'Admin'"
                                    disabled/> 
                            <label for="Admin">Admin</label>

                            <input type="radio"
                                    class="radio-input"
                                    value="customer"
                                    
                                    :checked="user.position == 'customer'"
                                    disabled/> 
                            <label for="customer">Customer</label>
                                    
                            <input type="radio"
                                    class="radio-input"
                                    value="shipper"
                                    
                                    :checked="user.position == 'shipper'"
                                    disabled/>
                            <label for="shipper">Shipper</label>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Full Name: </label>
                        <div class="col-sm-8">
                            <input type="text"
                                    class="form-control"
                                    :value="user.full_name"
                                    disabled/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Email: </label>
                        <div class="col-sm-8">
                            <input type="email"
                                    class="form-control"
                                    :value="user.email"
                                    id="email"
                                    disabled/>
                            <!-- <p class="error-msg" id="email-msg">This is required</p> -->
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Birthdate: </label>
                        <div class="col-sm-8">
                            <input type="text"
                                    class="form-control"
                                    :value="user.birthdate"
                                    disabled>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Address: </label>
                        <div class="col-sm-8">
                            <input type="text"
                                    class="form-control"
                                    :value="user.address"
                                    disabled/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Phone: </label>
                        <div class="col-sm-8">
                        <input type="text"
                                class="form-control"
                                :value="user.phone"
                                disabled/>
                        </div>
                    </div>

                    <!-- <div class="text-right p-3">
                        <button class="btn-create-new" type="submit">
                            <i class="fas fa-check"></i> Update
                        </button>
                        <button class="btn-cancel" type="button" @click="cancel()">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    </div> -->

                    <div class="text-right p-3">
                        <button class="btn-cancel" type="button" @click="back()">
                            <i class="fas fa-arrow-left"></i> Back
                        </button>
                    </div>
                </v-col>

                <v-col cols="5">

                    <h3 class="pb-4 pt-4"></h3>
                    <div>
                        <img v-if="user.avatar == ''" id="avatar-preview" src="../../../public/assets/assets/img/avatar-placeholder.png"/>
                        <img v-else id="avatar-preview" :src="`/avatar/${user.avatar}`">
                    </div>
                </v-col>
            </v-row>
        </form>
    </div>
</template>

<script>

import axios from "axios";

export default {
    components: {
    },
    data: () => ({
        previewImage: "../../../public/assets/assets/img/avatar-placeholder.png",
        // snackbar: false,
        user: {
            username: "",
            password: "",
            full_name: "",
            email: "",
            position: "customer",
            birthdate: "",
            address: "",
            phone: "",
            avatar: "",
            status: "active",
        },
        // new_avatar: "",
        // avatar_updated: false,
        // isInputActive: false,
    }),
    created() {
        this.getUserByID();
    },
    methods: {
        async getUserByID() {
            await axios.get(`http://localhost:5000/api/users/${this.$route.params.user_id}`)
                .then((res) => {
                    this.user = res.data;
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        back() {
            this.$router.push({ name: "ListUser" });
        }
    },
};
</script>

<style scoped>
    .row label.col-form-label {
        /* display: block; */
        text-align: right;
    }

    .row input {
        width: 100%;
    }

    h3 {
        text-align: right;
    }

    #avatar-preview {
        width: 250px;
        height: 250px;
        display: block;
        border: 1px solid #212529;
        border-radius: 4px;
        /* padding-top: 10px; */
        margin: 40px auto 10px;

        background-color: #21252910;
        cursor: pointer;
        object-fit: cover;
    }

    label.upload-img {
        cursor: pointer;
        background-color: #21252910;
        padding: 8px 15px;
        color: #212529;
        border: 1px solid #212529;
        font-weight: 500;
        border-radius: 4px;
    }

    #upload-photo {
        opacity: 0;
        position: absolute;
        z-index: -1;
    }

    .btn-create-new {
        margin-left: 16px;
        padding: 8px 16px;
        background-color: #4C6EF5;
        color: #ffffff;
        border: 1px solid #4C6EF5;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 400;
    }

    .btn-create-new i {
        padding-right: 8px;
    }

    .btn-cancel {
        margin-left: 16px;
        padding: 8px 16px;
        background-color: #ffffff;
        color: #4C6EF5;
        border: 1px solid #4C6EF5;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 400;
    }

    .btn-cancel i {
        padding-right: 8px;
    }

    .error-msg {
        display: none;
        text-align: left;
        margin-right: 24px;
        padding-top: 8px;
        font-weight: 400;
        word-break: break-word;
    }

    .submit-disable {
        opacity: 50%;
    }

    .row input[type=radio] {
        width: fit-content;
        margin: 0 1rem;
    }

</style>
