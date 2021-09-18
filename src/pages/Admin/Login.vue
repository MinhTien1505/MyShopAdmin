<template>
    <div class="bg-primary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                    <div class="card-body">
                                        <v-form ref="form" @submit.prevent="submitForm" enctype="/multipart/form-data">
                                            <div class="form-group">
                                                <label class="small mb-1" for="inputEmailAddress">Email</label>
                                                <input class="form-control py-4" id="inputEmailAddress" type="email" placeholder="Enter email address" />
                                            </div>
                                            <div class="form-group">
                                                <label class="small mb-1" for="inputPassword">Password</label>
                                                <input class="form-control py-4" id="inputPassword" type="password" placeholder="Enter password" />
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                                                    <label class="custom-control-label" for="rememberPasswordCheck">Remember password</label>
                                                </div>
                                            </div>
                                            <div class="btn-login-container" style="display: flex; justify-content: right;">
                                                <v-btn type="submit" class="btn-login">Login</v-btn>
                                            </div>
                                        </v-form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
        
    },
    methods: {
        async submitForm() {
            this.$router.push({ name: "Dashboard"});
        }
    }
}
</script>

<style scoped>
    @import '../../../public/assets/Admin/css/styles.css';
    @import url(https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css);

    .btn-login-container {
        display: flex; 
        justify-content: right;
    }

    .btn-login {
        background-color: #007BFF !important;
        color: white !important;
    }
</style>