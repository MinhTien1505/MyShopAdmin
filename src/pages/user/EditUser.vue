<template>
    <div class="container-fluid">
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <v-row>
                <v-col cols="7">
                    <h3 class="pb-4 pt-4">Update User</h3>
                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Username: </label>
                        <div class="col-sm-8">
                            <input type="text"
                                    class="form-control"
                                    v-model="user.username"
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
                        <label class="col-sm-4 col-form-label">Full Name: </label>
                        <div class="col-sm-8">
                            <input type="text"
                                    class="form-control"
                                    v-model="user.full_name"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Email: </label>
                        <div class="col-sm-8">
                            <input type="email"
                                    class="form-control"
                                    v-model="user.email"
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
                                    v-model="user.birthdate">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Address: </label>
                        <div class="col-sm-8">
                            <input type="text"
                                    class="form-control"
                                    v-model="user.address"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Phone: </label>
                        <div class="col-sm-8">
                        <input type="text"
                                class="form-control"
                                v-model="user.phone"/>
                        </div>
                    </div>

                    <div class="text-right p-3">
                        <button class="btn-create-new" type="submit">
                            <i class="fas fa-check"></i> Update
                        </button>
                        <button class="btn-cancel" type="button" @click="cancel()">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    </div>
                </v-col>

                <v-col cols="5">

                    <h3 class="pb-4 pt-4"></h3>
                    <div>
                        <img v-if="avatar_updated" id="avatar-preview" @click="selectImage" :src="`${previewImage}`"/>
                        <img v-else-if="user.avatar == ''" id="avatar-preview" @click="selectImage" src="../../../public/assets/assets/img/avatar-placeholder.png"/>
                        <img v-else id="avatar-preview" @click="selectImage" :src="`/avatar/${user.avatar}`">
                    </div>
                    <div class="text-center">
                        <label class="upload-img" for="upload-photo">
                            <i class="fas fa-upload"></i> Update avatar here!
                        </label>
                        <input type="file"
                                name="photo"
                                id="upload-photo"
                                accept="image/*"
                                ref="fileInput"
                                @input="pickFile"
                                @change="selectedFile"/>
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
        snackbar: false,
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
        new_avatar: "",
        avatar_updated: false,
        isInputActive: false,
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
        selectImage() {
            this.$refs.fileInput.click();
        },
        pickFile() {
            let input = this.$refs.fileInput;
            let file = input.files;
            if (file && file[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                };
                reader.readAsDataURL(file[0]);
                this.$emit("input", file[0]);
            }
        },
        selectedFile(e) {
            this.new_avatar = e.target.files[0];
            this.avatar_updated = true;
        },
        async submitForm() {
            const formData = new FormData();
            formData.append('username', this.user.username);
            formData.append('password', this.user.password);
            formData.append('full_name', this.user.full_name);
            formData.append('email', this.user.email);
            formData.append('position', this.user.position);
            formData.append('birthdate', this.user.birthdate);
            formData.append('address', this.user.address);
            formData.append('phone', this.user.phone);
            formData.append('avatar', this.new_avatar);
            formData.append('status', this.user.status);
            formData.append('old_avatar', this.user.avatar);

            console.log("Old avatar: " + this.user.avatar);
            console.log("New avatar: " + this.new_avatar);

            await axios.patch(`http://localhost:5000/api/users/${this.$route.params.user_id}`, formData)
            .then((res) => {
                this.$router.push({
                    name: "ListUser",
                    params: { message: res.data.message },
                });
            }).catch ((error) => {
                console.log(error);
            });
        },
        cancel() {
            this.$router.push({ name: "ListUser" });
        },
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

</style>
