import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'
import Index from '../pages/index'
import Product from '../pages/product'
import Detail from '../pages/detail'
import Cart from '../pages/cart'
import Login from '../pages/login'
import Order from '../pages/order'
import OrderConfirm from '../pages/orderConfirm'
import OrderList from '../pages/orderList'
import OrderPay from '../pages/orderPay'
import AliPay from '../pages/alipay'
import Register from '../pages/register'
import SearchResult from '../pages/searchResult'
import Person from '../pages/person'
import Address from "../components/Address";
import PersonInfo from "../components/PersonInfo";
import ChangePassword from "../components/ChangePassword";
import Reset from "../pages/reset"

Vue.use(Router);

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  routes:[
    {
      path:'/',
      name:'home',
      component:Home,
      redirect:'/index',
      children:[
        {
          path: '/index',
          name: 'index',
          component: Index,
        }, {
          path: '/product/:id',
          name: 'product',
          component: Product
        }, {
          path: '/detail/:id',
          name: 'detail',
          component: Detail
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        requireAuth:true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        requireAuth:true
      },
      children:[
        {
          path: 'list',
          name: 'order-list',
          component: OrderList,
          meta: {
            requireAuth:true
          },
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: OrderConfirm,
          meta: {
            requireAuth:true
          },
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: OrderPay,
          meta: {
            requireAuth:true
          },
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: AliPay,
          meta: {
            requireAuth:true
          },
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset
    },
    {
      path: '/result/:query',
      name: 'result',
      component: SearchResult
    },
    {
      path: '/person',
      name: 'person',
      component: Person,
      meta: {
          requireAuth:true
      },
      children:[
        {
          path: 'address',
          name: 'address',
          component: Address,
          meta: {
            requireAuth:true
          },
        },
        {
          path: 'person_info',
          name: 'person_info',
          component: PersonInfo,
          meta: {
            requireAuth:true
          },
        },
        {
          path: 'change_password',
          name: 'change_password',
          component: ChangePassword,
          meta: {
            requireAuth:true
          },
        }
      ]
    }
  ]
});
