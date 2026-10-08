<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\AnalyticsData;
use Inertia\Inertia;
use Inertia\Response;

/** Flavor ANALYTICS: ringkasan, realtime, audiens, akuisisi, perilaku, laporan. */
class AnalyticsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('analytics/index', [
            'ringkasan' => AnalyticsData::ringkasan(),
            'harian'    => AnalyticsData::pengunjungHarian(),
            'halaman'   => AnalyticsData::perilaku(),
        ]);
    }

    public function realtime(): Response
    {
        return Inertia::render('analytics/realtime', [
            'realtime' => AnalyticsData::realtime(),
        ]);
    }

    public function audiens(): Response
    {
        return Inertia::render('analytics/audiens', [
            'audiens' => AnalyticsData::audiens(),
        ]);
    }

    public function akuisisi(): Response
    {
        return Inertia::render('analytics/akuisisi', [
            'akuisisi' => AnalyticsData::akuisisi(),
        ]);
    }

    public function perilaku(): Response
    {
        return Inertia::render('analytics/perilaku', [
            'perilaku' => AnalyticsData::perilaku(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('analytics/laporan', [
            'ringkasan' => AnalyticsData::ringkasan(),
            'laporan'   => AnalyticsData::ringkasanLaporan(),
            'harian'    => AnalyticsData::pengunjungHarian(),
            'audiens'   => AnalyticsData::audiens(),
        ]);
    }
}
