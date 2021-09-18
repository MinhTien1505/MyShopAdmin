<template>
    <div>
        <!-- Header Section Start -->
        <Header/>
        <!-- Header Section End -->

        <!-- Mini Cart Wrap & Cart Overlay Start -->     
        <MiniCart />
        <!-- Mini Cart Wrap & Cart Overlay End -->

        <!-- MAIN CONTENT Start
        ============================================ -->
        
        <!-- Page Banner Section Start -->
        <div class="page-banner-section section">
            <div class="page-banner-wrap row row-0 d-flex align-items-center ">

                <!-- Page Banner -->
                <div class="col-lg-4 col-12 order-lg-2 d-flex align-items-center justify-content-center">
                    <div class="page-banner">
                        <h1>Register</h1>
                        <p>similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita</p>
                        <div class="breadcrumb">
                            <ul>
                                <li><a href="#">HOME</a></li>
                                <li><a href="#">Register</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Banner -->
                <div class="col-lg-4 col-md-6 col-12 order-lg-1">
                    <div class="banner"><a href="#"><img src="assets/Shop/images/banner/banner-15.jpg" alt="Banner"></a></div>
                </div>

                <!-- Banner -->
                <div class="col-lg-4 col-md-6 col-12 order-lg-3">
                    <div class="banner"><a href="#"><img src="assets/Shop/images/banner/banner-14.jpg" alt="Banner"></a></div>
                </div>

            </div>
        </div><!-- Page Banner Section End -->

        <!-- Register Section Start -->
        <div class="register-section section mt-90 mb-90">
            <div class="container">
                <div class="row">
                    
                    <!-- Register -->
                    <div class="col-md-6 col-12 d-flex">
                        <div class="ee-register">
                            
                            <h3>We will need for your registration</h3>
                            <p>E&E provide how all this mistaken idea of denouncing pleasure and sing pain born an will give you a complete account of the system, and expound</p>
                            
                            <!-- Register Form -->
                            <form action="#">
                                <div class="row">
                                    <div class="col-12 mb-30"><input type="text" placeholder="Your name here"></div>
                                    <div class="col-12 mb-30"><input type="email" placeholder="Your email here"></div>
                                    <div class="col-12 mb-30"><input type="password" placeholder="Enter passward"></div>
                                    <div class="col-12 mb-30"><input type="password" placeholder="Conform password"></div>
                                    <div class="col-12"><input type="submit" value="register"></div>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                    
                    <div class="col-md-1 col-12 d-flex">
                        
                        <div class="login-reg-vertical-boder"></div>
                        
                    </div>
                    
                    <!-- Account Image -->
                    <div class="col-md-5 col-12 d-flex">
                        
                        <div class="ee-account-image">
                            <h3>Upload your Image</h3>
                            
                            <img src="assets/Shop/images/account-image-placeholder.jpg" alt="Account Image Placeholder" class="image-placeholder">
                            
                            <div class="account-image-upload">
                                <input type="file" name="chooseFile" id="account-image-upload">
                                <label class="account-image-label" for="account-image-upload">Choose your image</label>
                            </div>
                            
                            <p>jpEG 250x250</p>
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div><!-- Register Section End -->

        <!-- MAIN CONTENT End
        ============================================ -->

        <!-- Brands Section Start -->
        <Brands/>
        <!-- Brands Section End -->

        <!-- Subscribe Section Start -->
        <Subscribe/>
        <!-- Subscribe Section End -->

        <!-- Footer Section Start -->
        <Footer/>
        <!-- Footer Section End -->

    </div>
</template>

<script>
import Header from '../../components/Shop/Header.vue';
import MiniCart from '../../components/Shop/MiniCart.vue';
import Brands from '../../components/Shop/Brands.vue';
import Subscribe from '../../components/Shop/Subscribe.vue';
import Footer from '../../components/Shop/Footer.vue';

export default {
    components: {
        Header,
        MiniCart,
        Brands,
        Subscribe,
        Footer,
    }
}
</script>

<style scoped>
    @import '../../../public/assets/Shop/css/bootstrap.min.css';
    @import '../../../public/assets/Shop/css/icon-font.min.css';
    @import '../../../public/assets/Shop/css/plugins.css';
    @import '../../../public/assets/Shop/css/style.css';
</style>