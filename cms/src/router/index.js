import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/line",
    name: "Line",
    component: () =>
      import(/* webpackChunkName: "line" */ "../views/Line.vue"),
  },
  {
    path: "/pie",
    name: "Pie",
    component: () =>
      import(/* webpackChunkName: "pie" */ "../views/Pie.vue"),
  },
  {
    path: "/bar",
    name: "Bar",
    component: () =>
      import(/* webpackChunkName: "bar" */ "../views/Bar.vue"),
  },
  {
    path: "/map",
    name: "Map",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/Map.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/data",
    name: "Data",
    component: () =>
      import(/* webpackChunkName: "data" */ "../views/Data.vue"),
  },
  {
    path: "/datadatae",
    name: "DataDate",
    component: () =>
      import(/* webpackChunkName: "datadatae" */ "../views/DataDate.vue"),
  },
  {
    path: "/maps",
    name: "Maps",
    component: () =>
      import(/* webpackChunkName: "maps" */ "../views/Maps.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;