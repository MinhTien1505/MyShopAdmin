import PageNotFound from "../components/PageNotFound.vue";

import ShipperDashboard from "../pages/shipper/Dashboard.vue";
import ShipperDashboardContent from "../pages/shipper/DashboardContent.vue";
import ShipperOrders from "../pages/shipper/Orders.vue";
import ShipperViewOrder from "../pages/shipper/ViewOrder.vue";
import ShipperPickUp from "../pages/shipper/PickUp.vue";
import ShipperShipping from "../pages/shipper/Shipping.vue";
import ShipperHistory from "../pages/shipper/History.vue";
import ShipperStatistic from "../pages/shipper/Statistic.vue";


const routerShipper = [
    {
        path: "/shipper/dashboard",
        component: ShipperDashboard,
        beforeEnter: (to, from, next) => {
            if (!sessionStorage.getItem("shipper_login")) {
                next("/shipper");
            } else {
                next();
            }
        },
        children: [
            // Shipping Home
            { path: "", name: "ShipperHome", component: ShipperDashboardContent },
            // Show all orders need to ship
            { path: "orders", name: "ShipperListOrder", component: ShipperOrders },
            // Show order detail
            { path: "view-order", name: "ShipperViewOrder", component: ShipperViewOrder },
            // Show all orders pick-up
            { path: "pickup", name: "PickUp", component: ShipperPickUp },
            // Show all orders shipping
            { path: "shipping", name: "Shipping", component: ShipperShipping },
            // Show history ship
            { path: "history", name: "History", component: ShipperHistory },
            // Show statistic ship
            { path: "statistic", name: "Statistic", component: ShipperStatistic },

            // Error
            { path: "*", name: "PageNotFound", component: PageNotFound },
        ],
    },
];

export default routerShipper;
