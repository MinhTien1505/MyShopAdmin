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
                        <h1>Faq</h1>
                        <p>similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita</p>
                        <div class="breadcrumb">
                            <ul>
                                <li><a href="#">HOME</a></li>
                                <li><a href="#">Faq</a></li>
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

        <!-- Faq Section Start -->
        <div class="faq-section section mt-90 mb-40">
            <div class="container">
                <div class="row row-25">
                    
                    <div class="col-lg-6 col-12 mb-50">
                    
                        <div class="faq-wrap">
                        
                            <div class="single-faq">
                                <h4>What Shipping Methods are Available?</h4>
                                <p>Terms know how to pursue pleasure rationally encounter cnces that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because.</p>
                            </div>
                        
                            <div class="single-faq">
                                <h4>What Payment Methods are Available?</h4>
                                <p>Terms know how to pursue pleasure rationally encounter cnces that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because.</p>
                            </div>
                        
                            <div class="single-faq">
                                <h4>How I Return back my product?</h4>
                                <p>Terms know how to pursue pleasure rationally encounter cnces that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because.</p>
                            </div>
                        
                            <div class="single-faq">
                                <h4>What policy do you have for product sell?</h4>
                                <p>Terms know how to pursue pleasure rationally encounter cnces that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because.</p>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    <div class="col-lg-6 col-12 mb-50">
                    
                        <div class="faq-wrap">
                        
                            <div class="single-faq">
                                <h4>What is the payment secutiry system?</h4>
                                <p>Terms know how to pursue pleasure rationally encounter cnces that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because.</p>
                            </div>
                        
                            <div class="single-faq">
                                <h4>How can I track my order?</h4>
                                <p>Terms know how to pursue pleasure rationally encounter cnces that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because.</p>
                            </div>
                        
                            <div class="single-faq">
                                <h4>Do I need creat account for buy products?</h4>
                                <p>Terms know how to pursue pleasure rationally encounter cnces that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because.</p>
                            </div>
                        
                            <div class="single-faq">
                                <h4>How can I get discount coupon?</h4>
                                <p>Terms know how to pursue pleasure rationally encounter cnces that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because.</p>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    <div class="col-12 mb-50"><p class="ask-question">Can’t find an answer? Call us at <a href="tel:+88012354569658268">+88012354 569 658 268</a> or mail us through <a href="mailto:info@e&e.com">info@e&e.com</a></p></div>
                    
                </div>
            </div>
        </div><!-- Faq Section End -->

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