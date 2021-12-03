import PageNotFound from "../components/PageNotFound.vue";

import ShipperDashboard from "../pages/shipper/Dashboard.vue";
import ShipperOrders from "../pages/shipper/Orders.vue";
import ShipperViewOrder from "../pages/shipper/ViewOrder.vue";
import ShipperPickUp from "../pages/shipper/PickUp.vue";
import ShipperShipping from "../pages/shipper/Shipping.vue";


const routerShipper = [
    {
        path: "/shipper",
        component: ShipperDashboard,
        beforeEnter: (to, from, next) => {
            if (!sessionStorage.getItem("shipper_login")) {
                next("/shipper");
            } else {
                next();
            }
        },
        children: [
            // Show all orders need to ship
            { path: "orders", name: "ShipperListOrder", component: ShipperOrders },
            // Show order detail
            { path: "view-order", name: "ShipperViewOrder", component: ShipperViewOrder },
            // Show all orders pick-up
            { path: "pickup", name: "PickUp", component: ShipperPickUp },
            // Show all orders shipping
            { path: "shipping", name: "Shipping", component: ShipperShipping },

            // Error
            { path: "*", name: "PageNotFound", component: PageNotFound },
        ],
    },
];

export default routerShipper;
