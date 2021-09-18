<template>
    <!-- Header Section Start -->
    <div class="header-section section">

        <!-- Header Top Start -->
        <HeaderTop/>
        <!-- Header Top End -->

        <!-- Header Bottom Start -->
        <HeaderBottom/>
        <!-- Header Bottom End -->

    </div><!-- Header Section End -->
</template>

<script>
import HeaderTop from '../../components/Shop/HeaderTop.vue';
import HeaderBottom from '../../components/Shop/HeaderBottom.vue';

export default {
    components: {
        HeaderTop,
        HeaderBottom,
    }
}
</script>

<style scoped>

</style>