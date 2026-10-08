<?php

use App\Http\Controllers\Web\AnalyticsController;
use Illuminate\Support\Facades\Route;

/** Flavor ANALYTICS (didaftarkan oleh worker routes/web.php). */
Route::prefix('analytics')->name('analytics.')->group(function () {
    Route::get('/', [AnalyticsController::class, 'index'])->name('index');
    Route::get('/realtime', [AnalyticsController::class, 'realtime'])->name('realtime');
    Route::get('/audiens', [AnalyticsController::class, 'audiens'])->name('audiens');
    Route::get('/akuisisi', [AnalyticsController::class, 'akuisisi'])->name('akuisisi');
    Route::get('/perilaku', [AnalyticsController::class, 'perilaku'])->name('perilaku');
    Route::get('/laporan', [AnalyticsController::class, 'laporan'])->name('laporan');
});
