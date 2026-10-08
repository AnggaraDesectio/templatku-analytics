<?php

namespace App\Support\Demo;

/**
 * Data demo flavor ANALYTICS: ringkasan, realtime, audiens, akuisisi,
 * perilaku, dan data grafik laporan. Semua angka ditulis eksplisit
 * supaya konsisten antarhalaman.
 */
class AnalyticsData
{
    public static function ringkasan(): array
    {
        return [
            'pengunjung'      => 4820,
            'pageviews'       => 12340,
            'bounceRate'      => '38%',
            'durasiRataRata'  => '3 mnt 12 dtk',
            'konversi'        => '4,6%',
            'pengunjungBaru'  => '61%',
            'deltaPengunjung' => '+12,4% vs kemarin',
            'deltaPageviews'  => '+8,1% vs kemarin',
        ];
    }

    public static function pengunjungHarian(): array
    {
        return [
            'labels'   => ['2 Okt', '3 Okt', '4 Okt', '5 Okt', '6 Okt', '7 Okt', '8 Okt'],
            'datasets' => [
                ['label' => 'Pengunjung', 'data' => [3120, 3450, 3980, 4210, 4460, 4630, 4820]],
                ['label' => 'Pageviews',  'data' => [8040, 8760, 9720, 10480, 11120, 11890, 12340]],
            ],
        ];
    }

    public static function realtime(): array
    {
        return [
            'aktif' => 86,
            'perMenit' => [11, 14, 9, 16, 12, 18, 13, 15, 10, 12],
            'halamanTop' => [
                ['halaman' => '/',                       'aktif' => 24],
                ['halaman' => '/promo-10-10',            'aktif' => 18],
                ['halaman' => '/produk/kaos-polos',      'aktif' => 12],
                ['halaman' => '/checkout',               'aktif' => 9],
                ['halaman' => '/blog/cara-merawat-baju', 'aktif' => 7],
            ],
            'sumberAktif' => [
                ['sumber' => 'Google',    'aktif' => 31],
                ['sumber' => 'Instagram',  'aktif' => 22],
                ['sumber' => 'Langsung',   'aktif' => 19],
                ['sumber' => 'TikTok',     'aktif' => 9],
                ['sumber' => 'WhatsApp',   'aktif' => 5],
            ],
        ];
    }

    public static function audiens(): array
    {
        return [
            'usia' => [
                'labels'   => ['18-24', '25-34', '35-44', '45+'],
                'datasets' => [['label' => 'Pengunjung (%)', 'data' => [32, 41, 18, 9]]],
            ],
            'gender' => [
                'labels'   => ['Perempuan', 'Laki-laki'],
                'datasets' => [['label' => 'Pengunjung (%)', 'data' => [58, 42]]],
            ],
            'kota' => [
                ['kota' => 'Jakarta',   'pengunjung' => 1639],
                ['kota' => 'Surabaya',  'pengunjung' => 675],
                ['kota' => 'Bandung',   'pengunjung' => 578],
                ['kota' => 'Medan',     'pengunjung' => 386],
                ['kota' => 'Semarang',  'pengunjung' => 289],
                ['kota' => 'Lainnya',   'pengunjung' => 1253],
            ],
            'perangkat' => [
                ['perangkat' => 'Ponsel', 'pengunjung' => 3470],
                ['perangkat' => 'Desktop','pengunjung' => 1109],
                ['perangkat' => 'Tablet', 'pengunjung' => 241],
            ],
        ];
    }

    public static function akuisisi(): array
    {
        return [
            'channels' => [
                ['channel' => 'Pencarian Organik', 'sesi' => 12400, 'konversi' => '5,2%'],
                ['channel' => 'Media Sosial',     'sesi' =>  9850, 'konversi' => '4,8%'],
                ['channel' => 'Langsung',          'sesi' =>  6200, 'konversi' => '3,9%'],
                ['channel' => 'Iklan Berbayar',    'sesi' =>  4120, 'konversi' => '6,1%'],
                ['channel' => 'Email',            'sesi' =>  2340, 'konversi' => '7,4%'],
                ['channel' => 'Referral',         'sesi' =>  1760, 'konversi' => '3,2%'],
            ],
            'sesiPerChannel' => [
                'labels'   => ['Pencarian Organik', 'Media Sosial', 'Langsung', 'Iklan Berbayar', 'Email', 'Referral'],
                'datasets' => [['label' => 'Sesi', 'data' => [12400, 9850, 6200, 4120, 2340, 1760]]],
            ],
        ];
    }

    public static function perilaku(): array
    {
        return [
            ['id' => 1, 'halaman' => '/',                       'views' => 5210, 'unik' => 3890, 'bounce' => '42%', 'durasi' => '2 mnt 48 dtk'],
            ['id' => 2, 'halaman' => '/promo-10-10',            'views' => 2140, 'unik' => 1780, 'bounce' => '31%', 'durasi' => '3 mnt 55 dtk'],
            ['id' => 3, 'halaman' => '/produk/kaos-polos',      'views' => 1680, 'unik' => 1410, 'bounce' => '35%', 'durasi' => '3 mnt 12 dtk'],
            ['id' => 4, 'halaman' => '/checkout',               'views' => 920,  'unik' => 860,  'bounce' => '28%', 'durasi' => '4 mnt 30 dtk'],
            ['id' => 5, 'halaman' => '/produk/kemeja-flanel',   'views' => 845,  'unik' => 720,  'bounce' => '39%', 'durasi' => '2 mnt 58 dtk'],
            ['id' => 6, 'halaman' => '/blog/cara-merawat-baju', 'views' => 610,  'unik' => 540, 'bounce' => '52%', 'durasi' => '5 mnt 05 dtk'],
            ['id' => 7, 'halaman' => '/tentang-kami',           'views' => 480,  'unik' => 410, 'bounce' => '48%', 'durasi' => '1 mnt 56 dtk'],
            ['id' => 8, 'halaman' => '/produk/celana-chino',    'views' => 455,  'unik' => 390, 'bounce' => '37%', 'durasi' => '2 mnt 44 dtk'],
        ];
    }

    /** Ringkasan per halaman laporan: total views + rata-rata bounce. */
    public static function ringkasanLaporan(): array
    {
        $perilaku = self::perilaku();
        $totalViews = array_sum(array_column($perilaku, 'views'));

        return [
            'totalViews'     => $totalViews, // 12.340
            'totalUnik'      => array_sum(array_column($perilaku, 'unik')), // 10.010
            'halamanTerbaik' => '/promo-10-10',
            'bounceTertinggi'=> '/blog/cara-merawat-baju',
            'pengunjung'     => self::ringkasan()['pengunjung'],
        ];
    }
}
