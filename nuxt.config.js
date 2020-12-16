/*
 * @Author: your name
 * @Date: 2020-12-14 10:30:09
 * @LastEditTime: 2020-12-16 14:41:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/nuxt.config.js
 */
module.exports = {
    router:{
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            routes.splice(0)  //删除默认路由配置，自定义新路由配制

            routes.push(...[
                {
                    path: "/",
                    component: resolve(__dirname, 'pages/layout/index'),
                    children:[
                        {
                            path:"",
                            name:"home",
                            component: resolve(__dirname, "pages/home/index.vue")
                        },
                        {
                            path: "/login",
                            name: "login",
                            component: resolve(__dirname, "pages/login/index")
                        },
                        {
                            path: "/register",
                            name: "register",
                            component: resolve(__dirname, "pages/login/index")
                        },
                        {
                            path: "/profile/:username",
                            name: "profile",
                            component: resolve(__dirname, "pages/profile/index")
                        },
                        {
                            path: "/settings",
                            name: "settings",
                            component: resolve(__dirname, "pages/settings/index")
                        },
                        {
                            path: "/editor",
                            name: "editor",
                            component: resolve(__dirname, "pages/editor/index")
                        },              
                        {
                            path: "/article/:slug",
                            name: "article",
                            component: resolve(__dirname, "pages/article/index")
                        },          
                    ]
                },
            ])
        }
    },
    plugins: ['~/plugins/request', '~/plugins/dayjs'],
    server: {
        port: 3000,
        host: 'localhost', //所有网络都能访问到
    }
}