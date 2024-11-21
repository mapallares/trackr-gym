import HomeLayout from '../../layouts/User/Home.layout.mjs'
import MembershipLayout from '../../layouts/User/Membership.layout.mjs'
import SearchLayout from '../../layouts/User/Search.layout.mjs'
import BookingLayout from '../../layouts/User/Booking.layout.mjs'
import ShopLayout from '../../layouts/User/Shop.layout.mjs'
import InventoryLayout from '../../layouts/Admin/Inventory.layout.mjs'
import UsersLayout from '../../layouts/Admin/Users.layout.mjs'
import RequestLayout from '../../layouts/Admin/Request.layout.mjs'
import DashboardLayout from '../../layouts/Admin/Dashboard.layout.mjs'
import ManagementLayout from '../../layouts/Admin/Management.layout.mjs'
import CatalogLayout from '../../layouts/Admin/Catalog.layout.mjs'
import MembershipsLayout from '../../layouts/Admin/Memberships.layout.mjs'
import BusinessLayout from '../../layouts/Admin/Business.layout.mjs'
import ScheduleLayout from '../../layouts/Admin/Schedule.layout.mjs'

export const MENU = {
    ITEMS: {
      'User': [
        {
          id: 'tg-menu-item-home',
          label: 'Inicio',
          icon: 'home',
          path: '/home',
          layout: HomeLayout,
          isVisible: true
        },
        {
          id: 'tg-menu-item-membership',
          label: 'Membresía',
          icon: 'kid_star',
          path: '/membership',
          layout: MembershipLayout,
          isVisible: true
        },
        {
          id: 'tg-menu-item-search',
          label: 'Consultas',
          icon: 'search',
          path: '/search',
          layout: SearchLayout,
          isVisible: true
        },
        {
          id: 'tg-menu-item-booking',
          label: 'Reservas',
          icon: 'today',
          path: '/booking',
          layout: BookingLayout,
          isVisible: true
        },
        {
          id: 'tg-menu-item-shop',
          label: 'Compras',
          icon: 'shopping_bag',
          path: '/shop',
          layout: ShopLayout,
          isVisible: true
        }
      ],
      'Admin': [
        {
          id: 'tg-menu-item-dashboard',
          label: 'Tablero',
          icon: 'dashboard',
          path: '/dashboard',
          layout: DashboardLayout,
          isVisible: true
        },
        {
          id: 'tg-menu-item-management',
          label: 'Administración ',
          icon: 'domain',
          path: '/management',
          layout: ManagementLayout,
          isVisible: true
        },
        {
          id: 'tg-menu-item-catalog',
          label: 'Catálogo',
          icon: 'flex_wrap',
          path: '/catalog',
          layout: CatalogLayout,
          isVisible: true
        },
        {
          id: 'tg-menu-item-inventory',
          label: 'Inventario',
          icon: 'format_list_bulleted',
          path: '/inventoy',
          layout: InventoryLayout,
          isVisible: true
        },
        {
          id: 'tg-menu-item-memberships',
          label: 'Membresías',
          icon: 'star',
          path: '/memberships',
          layout: MembershipsLayout,
          isVisible: true
        },
        {
          id: 'tg-menu-item-users',
          label: 'Usuarios',
          icon: 'group',
          path: '/users',
          layout: UsersLayout,
          isVisible: true
        },
        {
          id: 'tg-menu-item-payments',
          label: 'Finanzas',
          icon: 'paid',
          path: '/payments',
          layout: BusinessLayout,
          isVisible: true
        },
        {
          id: 'tg-menu-item-scheduling',
          label: 'Programación',
          icon: 'calendar_add_on',
          path: '/scheduling',
          layout: ScheduleLayout,
          isVisible: true
        },
        {
          id: 'tg-menu-item-bookings',
          label: 'Solicitudes',
          icon: 'stacks',
          path: '/bookings',
          layout: RequestLayout,
          isVisible: true
        }
      ]
    }      
}

export default MENU