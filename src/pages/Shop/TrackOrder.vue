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
                        <h1>Track your order</h1>
                        <p>similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita</p>
                        <div class="breadcrumb">
                            <ul>
                                <li><a href="#">HOME</a></li>
                                <li><a href="#">Track your order</a></li>
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

        <!-- Track Order Section Start -->
        <div class="track-order-section section mt-90 mb-50">
            <div class="container">
                <div class="row align-items-center">
                    
                    <div class="track-order-title text-center col-12 mb-80">
                        <h2>Track your order...</h2>
                        <p>To track your order please enter your Order ID in the box below and press the “Track” button. This was give to you on your receipt and in the confirmation email you should have reveived</p>
                    </div>
                    
                    <div class="col-lg-6 col-md-7 col-12 mb-40">
                        <div class="track-order-form">
                            <form action="#">
                                <label for="order_id">Order ID</label>
                                <input type="text" id="order_id" placeholder="Find it in your order confirmation email">
                                <label for="billing_email">Billing Email Address</label>
                                <input type="email" id="billing_email" placeholder="Email you used during checkout">
                                
                                <input type="submit" value="Track Order">
                            </form>
                        </div>
                    </div>
                    
                    <div class="col-lg-4 col-md-5 col-12 ml-auto mb-40">
                        <div class="banner"><a href="#"><img src="assets/Shop/images/banner/banner-33.jpg" alt="Banner"></a></div>
                    </div>
                    
                </div>
            </div>
        </div><!-- Track Order Section End -->

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