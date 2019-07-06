import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddMenuItem from '@/components/AddMenuItem'
import EditMenuItem from '@/components/EditMenuItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index

    },
    {
      path: '/add-menu-item',
      name: 'AddMenuItem',
      component: AddMenuItem
    },
    {
      path: '/edit-menu-item/:menuItem_slug',
      name: 'EditMenuItem',
      component: EditMenuItem
    }
  ]
})
