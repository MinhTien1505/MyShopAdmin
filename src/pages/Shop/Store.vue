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
                        <h1>Locate Store</h1>
                        <p>similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita</p>
                        <div class="breadcrumb">
                            <ul>
                                <li><a href="#">HOME</a></li>
                                <li><a href="#">Locate Store</a></li>
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

        <!-- Store Section Start -->
        <div class="store-section section mt-90 mb-20">
            <div class="container">
                <div class="row">
                    
                    <!-- Single Store -->
                    <div class="col-lg-4 col-md-6 col-12 mb-70">
                        <div class="single-store">
                            <h3>E&E Australia</h3>
                            <p>You address will be here Lorem Ipsum is simply dummy text.</p>
                            <p><a href="tel:01234567890">01234 567 890</a> / <a href="tel:01234567891">01234 567 891</a></p>
                            <p><a href="mailto:info@example.com">info@example.com</a> / <a href="#">www.example.com</a></p>
                        </div>
                    </div>
                    
                    <!-- Single Store -->
                    <div class="col-lg-4 col-md-6 col-12 mb-70">
                        <div class="single-store">
                            <h3>E&E England</h3>
                            <p>You address will be here Lorem Ipsum is simply dummy text.</p>
                            <p><a href="tel:01234567890">01234 567 890</a> / <a href="tel:01234567891">01234 567 891</a></p>
                            <p><a href="mailto:info@example.com">info@example.com</a> / <a href="#">www.example.com</a></p>
                        </div>
                    </div>
                    
                    <!-- Single Store -->
                    <div class="col-lg-4 col-md-6 col-12 mb-70">
                        <div class="single-store">
                            <h3>E&E Germany</h3>
                            <p>You address will be here Lorem Ipsum is simply dummy text.</p>
                            <p><a href="tel:01234567890">01234 567 890</a> / <a href="tel:01234567891">01234 567 891</a></p>
                            <p><a href="mailto:info@example.com">info@example.com</a> / <a href="#">www.example.com</a></p>
                        </div>
                    </div>
                    
                    <!-- Single Store -->
                    <div class="col-lg-4 col-md-6 col-12 mb-70">
                        <div class="single-store">
                            <h3>E&E France</h3>
                            <p>You address will be here Lorem Ipsum is simply dummy text.</p>
                            <p><a href="tel:01234567890">01234 567 890</a> / <a href="tel:01234567891">01234 567 891</a></p>
                            <p><a href="mailto:info@example.com">info@example.com</a> / <a href="#">www.example.com</a></p>
                        </div>
                    </div>
                    
                    <!-- Single Store -->
                    <div class="col-lg-4 col-md-6 col-12 mb-70">
                        <div class="single-store">
                            <h3>E&E Canada</h3>
                            <p>You address will be here Lorem Ipsum is simply dummy text.</p>
                            <p><a href="tel:01234567890">01234 567 890</a> / <a href="tel:01234567891">01234 567 891</a></p>
                            <p><a href="mailto:info@example.com">info@example.com</a> / <a href="#">www.example.com</a></p>
                        </div>
                    </div>
                    
                    <!-- Single Store -->
                    <div class="col-lg-4 col-md-6 col-12 mb-70">
                        <div class="single-store">
                            <h3>E&E Denmark</h3>
                            <p>You address will be here Lorem Ipsum is simply dummy text.</p>
                            <p><a href="tel:01234567890">01234 567 890</a> / <a href="tel:01234567891">01234 567 891</a></p>
                            <p><a href="mailto:info@example.com">info@example.com</a> / <a href="#">www.example.com</a></p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div><!-- Store Section End -->

        <!-- Banner Section Start -->
        <div class="banner-section section mb-90">
            <div class="container">
                <div class="row">
                    
                    <!-- Banner -->
                    <div class="col-12">
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