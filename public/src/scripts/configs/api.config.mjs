class EndpointGroup {
    constructor(base, paths) {
      this.BASE = base
      this.ENDPOINTS = {}
      Object.keys(paths).forEach(path => {
          this.ENDPOINTS[path] = this.BASE + `/${paths[path]}`
      })
    }
  }

export const API = {
    AUTH: new EndpointGroup('https://trackr-gym-auth-testing.onrender.com/api/v1/auth', {
        REGISTER: 'register',
        MODIFY: 'modify',
        RESET: 'reset',
        LOGIN: 'login',
        LOGOUT: 'logout',
        SESSION: 'session',
        USERS: 'users'
    }),
    MEMBERSHIPS: new EndpointGroup('https://trackr-gym-memberships-testing.onrender.com/api/v1/memberships', {
        ALL: 'all',
        PLANS: 'plans',
        GYMS: 'gyms',
        BRANCHES: 'branches',
        USERS: 'users',
        NEW: 'new',
        BENEFITS: 'benefits'
    }),
    BOOKINGS: new EndpointGroup('https://trackr-gym-bookings-production.onrender.com/api/v1/bookings', {
        ALL: 'bookings',
        SERVICES: 'services',
        ACTIVITIES: 'activities'
    }),
    INVENTORY: new EndpointGroup('https://trackr-gym-inventory-production.onrender.com/api/v1/inventory', {
        PRODUCTS: 'products'
    }),
    PAYMENTS: new EndpointGroup('https://trackr-gym-payments-production.onrender.com/api/v1/payments', {
        ALL: 'payments'
    }),
}

export default API