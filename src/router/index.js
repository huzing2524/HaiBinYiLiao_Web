/**
 * Created by scott on 2019-03-14
 */
import Vue from 'vue'
import Router from 'vue-router'
import { SetDefaultHeader } from '_utils/http'
import Boss from './boss'
import Doctor from './doctor'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            redirect: '/boss'
        },
        ...Boss,
        ...Doctor
    ],
    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})


/**
 * 路由拦截
 * 不是所有版块都需要鉴权的,所以需要鉴权的在路由meta添加添加一个字段needLogin,
 * 设置为true的时候就必须走鉴权,像登录页这些不要,是可以直接访问的!
 */
router.beforeEach((to, from, next) => {
    let pathReg = /^.+\/login$/;
    let shareReg = /^.*share.*$/;
    let authorization = to.query.token || localStorage.getItem('Authorization')
    if (to.path === '/user/security/password' || pathReg.test(to.path) || shareReg.test(to.path)) {
        next();
    } else {
        let phone = to.query.phone;
        let username = to.query.name || phone;
        if (authorization) {
            if (phone) {
                localStorage.setItem('Authorization', authorization);
                localStorage.setItem('Phone', phone);
                localStorage.setItem('UserName', username);
                SetDefaultHeader('Authorization', authorization);
            }
            next();
        } else {
            localStorage.clear()
            next({ replace: true, path: `/user/login?backurl=${to.fullPath}` });
        }
    }
    next()
})

export default router
