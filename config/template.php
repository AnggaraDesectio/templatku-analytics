<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "analytics".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'analytics'),

    'flavors' => array (
  'analytics' => 
  array (
    'label' => 'Analytics',
    'brand_name' => 'Analytics',
    'brand_tagline' => 'Insight & trafik',
    'brand_initials' => 'AN',
    'accent' => '#0e7490',
    'category' => 'bisnis',
    'home' => 'analytics.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Analytics',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/analytics',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Realtime',
              'to' => '/analytics/realtime',
              'icon' => 'MousePointerClick',
            ),
            2 => 
            array (
              'label' => 'Audiens',
              'to' => '/analytics/audiens',
              'icon' => 'Users',
            ),
            3 => 
            array (
              'label' => 'Akuisisi',
              'to' => '/analytics/akuisisi',
              'icon' => 'Globe',
            ),
            4 => 
            array (
              'label' => 'Perilaku',
              'to' => '/analytics/perilaku',
              'icon' => 'Eye',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/analytics/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
