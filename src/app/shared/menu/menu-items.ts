export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}
export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-home text-purple'
  },
  {
    path: '/admin/user-management',
    title: 'User Management',
    type: 'link',
    icontype: 'fas fa-user-edit text-green'
  },
  {
    path: '/admin/product',
    title: 'Product',
    type: 'sub',
    icontype: 'fas fa-file-medical text-pink',
    collapse: 'product',
    isCollapsed: true,
    children: [
      { path: 'product-management', title: 'Product Management', type: 'link' },
      { path: 'add-new-product', title: 'Add New Product', type: 'link' },
      { path: 'product-list', title: 'Product List', type: 'link' },
      { path: 'add-new-prescription', title: 'Add New Prescription', type: 'link' },
      { path: 'request-prescription', title: 'Request Prescription', type: 'link' },
    ]
  },
  {
    path: '/admin/administration-user',
    title: 'Administration User',
    type: 'link',
    icontype: 'fas fa-laptop-medical text-blue'
  },
  {
    path: '/admin/customer-account',
    title: 'Customer Account',
    type: 'link',
    icontype: 'fas fa-address-book text-indigo'
  },
  {
    path: '/admin/report',
    title: 'Report',
    type: 'link',
    icontype: 'fas fa-chart-bar text-red'
  },
  // {
  //   path: '/admin/management',
  //   title: 'Management',
  //   type: 'sub',
  //   icontype: 'fas fa-file-invoice text-pink',
  //   collapse: 'management',
  //   isCollapsed: true,
  //   children: [
  //     { path: 'audit-trails', title: 'Audit Trails', type: 'link' },
  //     { path: 'user', title: 'User', type: 'link' }
  //   ]
  // },
  /*
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    icontype: 'fas fa-life-ring text-blue'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo'
  }
  */
];

export const ROUTESUSER: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-warning'
  },
  {
    path: '/applications',
    title: 'Applications',
    type: 'link',
    icontype: 'fas fa-file-invoice text-pink'
  },
  {
    path: '/houses',
    title: 'Houses',
    type: 'link',
    icontype: 'fas fa-home text-purple'
  },
  {
    path: '/management',
    title: 'Management',
    type: 'link',
    icontype: 'fas fa-tasks text-red'
  },
  {
    path: '/report',
    title: 'Report',
    type: 'link',
    icontype: 'fas fa-chart-bar text-green'
  },
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    icontype: 'fas fa-life-ring text-blue'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo'
  }/*,
  {
    path: '/maintenance',
    title: 'Maintenance',
    type: 'link',
    icontype: 'fas fa-cogs text-orange'
  }*/
  /*{
    path: '/settings',
    title: 'Settings',
    type: 'link',
    icontype: 'fas fa-sliders-h text-blue'
  }*/
];

export const PAGESROUTE: RouteInfo[] = [
  {
    path: '/home',
    title: 'Home',
    type: 'link',
    icontype: 'fas fa-home text-purple'
  }
]