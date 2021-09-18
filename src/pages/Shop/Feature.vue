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
                        <h1>Features</h1>
                        <p>similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita</p>
                        <div class="breadcrumb">
                            <ul>
                                <li><a href="#">HOME</a></li>
                                <li><a href="#">Features</a></li>
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

        <!-- About Section Start -->
        <div class="about-section section mt-90 mb-30">
            <div class="container">
                
                <div class="row">
                    
                    <!-- Feature Content -->
                    <div class="feature-content col-lg-6 col-12 order-2 order-lg-1 mb-30">
                        <h2><span>YOU CAN</span> CHOOSE US</h2>
                        <h1>BECAUSE <span>WE ALWAYS PROVIDE</span> IMPORTANCE...</h1>
                        <p>E&E provide how all this mistaken idea of denouncing pleasure and sing pain was born an will give you a complete account of the system, and expound the actual teachings of the eat explorer of the truth, the mer of human</p>
                        <p>E&E provide how all this mistaken idea of denouncing pleasure and sing pain was born an will give you a complete account of the system, and expound the actual teachings of the eat explorer of the truth, the mer of human</p>
                    </div>
                    
                    <!-- Feature Image -->
                    <div class="col-lg-5 col-12 order-1 order-lg-2 ml-auto mb-30">
                        <div class="feature-image"><img src="assets/Shop/images/about/feature-image.jpg" alt=""></div>
                    </div>
                    
                </div>
                
                <div class="row mb-30">
                    
                    <!-- About Feature -->
                    <div class="about-feature col-lg-9 col-12">
                        <div class="row">
                            
                            <div class="col-lg-4 col-md-6 col-12 mb-30">
                                <h4>FAST DELIVERY</h4>
                                <p>E&E provide how all this mistaken dea of denouncing pleasure and sing </p>
                            </div>
                            
                            <div class="col-lg-4 col-md-6 col-12 mb-30">
                                <h4>QUALITY PRODUCT</h4>
                                <p>E&E provide how all this mistaken dea of denouncing pleasure and sing </p>
                            </div>
                            
                            <div class="col-lg-4 col-md-6 col-12 mb-30 d-none d-lg-block"></div>
                            
                            <div class="col-lg-4 col-md-6 col-12 mb-30">
                                <h4>SECURE PAYMENT</h4>
                                <p>E&E provide how all this mistaken dea of denouncing pleasure and sing </p>
                            </div>
                            
                            <div class="col-lg-4 col-md-6 col-12 mb-30">
                                <h4>MONEY BACK GUARNTEE</h4>
                                <p>E&E provide how all this mistaken dea of denouncing pleasure and sing </p>
                            </div>
                            
                            <div class="col-lg-4 col-md-6 col-12 mb-30">
                                <h4>EASY ORDER TRACKING</h4>
                                <p>E&E provide how all this mistaken dea of denouncing pleasure and sing </p>
                            </div>
                            
                            <div class="col-lg-4 col-md-6 col-12 mb-30">
                                <h4>FREE RETURN</h4>
                                <p>E&E provide how all this mistaken dea of denouncing pleasure and sing </p>
                            </div>
                            
                            <div class="col-lg-4 col-md-6 col-12 mb-30">
                                <h4>24/7 SUPPORT</h4>
                                <p>E&E provide how all this mistaken dea of denouncing pleasure and sing </p>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div><!-- About Section End -->

        <!-- Banner Section Start -->
        <div class="banner-section section mb-90">
            <div class="container">
                <div class="row">
                    
                    <div class="col">
                        <div class="banner"><a href="#"><img src="assets/Shop/images/banner/banner-10.jpg" alt="Banner"></a></div>
                    </div>
                    
                </div>
            </div>
        </div><!-- Banner Section End -->

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