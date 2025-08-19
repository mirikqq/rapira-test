import { createRouter, createWebHashHistory } from "vue-router";
import Blog from "../views/Blog.vue";
import MainLayout from "../layout/MainLayout.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: MainLayout,
            children: [
                {
                    path: "",
                    component: Blog
                }
            ]
        }
    ]
})

export default router
