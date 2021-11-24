import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/tutorials",
            name: "tutorials",
            component: () => import("./components/TutorialsList")
        },
        {
            path: "/tutorials/:id",
            name: "tutorial-details",
            component: () => import("./components/Tutorial")
        },
        {
            path: "/tutorials/add",
            name: "add-tutorial",
            component: () => import("./components/AddTutorial")
        },
        {
            path: "/upload/file",
            name: "upload-file",
            component: () => import("./components/UploadFile")
        },
        {
            path: "/upload/files",
            name: "upload-files",
            component: () => import("./components/UploadFiles")
        }
    ]
});