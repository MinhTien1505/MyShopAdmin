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
                        <h1>Wishlist</h1>
                        <p>similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita</p>
                        <div class="breadcrumb">
                            <ul>
                                <li><a href="#">HOME</a></li>
                                <li><a href="#">Shop</a></li>
                                <li><a href="#">Wishlist</a></li>
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

        <!-- Cart Page Start -->
        <div class="page-section section mt-90 mb-90">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <form action="#">				
                            <div class="cart-table table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="pro-thumbnail">Image</th>
                                            <th class="pro-title">Product</th>
                                            <th class="pro-price">Price</th>
                                            <th class="pro-quantity">Quantity</th>
                                            <th class="pro-subtotal">Total</th>
                                            <th class="pro-remove">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="pro-thumbnail"><a href="#"><img src="assets/Shop/images/product/product-1.png" alt="Product"></a></td>
                                            <td class="pro-title"><a href="#">Zeon Zen 4 Pro</a></td>
                                            <td class="pro-price"><span>$295.00</span></td>
                                            <td class="pro-quantity"><div class="pro-qty"><input type="text" value="1"></div></td>
                                            <td class="pro-addtocart"><button>add to cart</button></td>
                                            <td class="pro-remove"><a href="#"><i class="fa fa-trash-o"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td class="pro-thumbnail"><a href="#"><img src="assets/Shop/images/product/product-2.png" alt="Product"></a></td>
                                            <td class="pro-title"><a href="#">Aquet Drone D 420</a></td>
                                            <td class="pro-price"><span>$275.00</span></td>
                                            <td class="pro-quantity"><div class="pro-qty"><input type="text" value="2"></div></td>
                                            <td class="pro-addtocart"><button>add to cart</button></td>
                                            <td class="pro-remove"><a href="#"><i class="fa fa-trash-o"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td class="pro-thumbnail"><a href="#"><img src="assets/Shop/images/product/product-3.png" alt="Product"></a></td>
                                            <td class="pro-title"><a href="#">Game Station X 22</a></td>
                                            <td class="pro-price"><span>$295.00</span></td>
                                            <td class="pro-quantity"><div class="pro-qty"><input type="text" value="1"></div></td>
                                            <td class="pro-addtocart"><button>add to cart</button></td>
                                            <td class="pro-remove"><a href="#"><i class="fa fa-trash-o"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td class="pro-thumbnail"><a href="#"><img src="assets/Shop/images/product/product-4.png" alt="Product"></a></td>
                                            <td class="pro-title"><a href="#">Roxxe Headphone Z 75 </a></td>
                                            <td class="pro-price"><span>$110.00</span></td>
                                            <td class="pro-quantity"><div class="pro-qty"><input type="text" value="1"></div></td>
                                            <td class="pro-addtocart"><button>add to cart</button></td>
                                            <td class="pro-remove"><a href="#"><i class="fa fa-trash-o"></i></a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                        </form>	
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- Cart Page End --> 

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