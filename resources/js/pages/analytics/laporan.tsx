import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, MousePointerClick, Users, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface Ringkasan {
    pengunjung: number;
    pageviews: number;
    bounceRate: string;
    durasiRataRata: string;
    konversi: string;
}

interface LaporanData {
    totalViews: number;
    totalUnik: number;
    halamanTerbaik: string;
    bounceTertinggi: string;
    pengunjung: number;
}

function exportCsv(laporan: LaporanData, ringkasan: Ringkasan) {
    const header = 'Metrik,Nilai';
    const lines = [
        ['Pengunjung', laporan.pengunjung],
        ['Total views', laporan.totalViews],
        ['Pengunjung unik', laporan.totalUnik],
        ['Bounce rate', ringkasan.bounceRate],
        ['Durasi rata-rata', ringkasan.durasiRataRata],
        ['Konversi', ringkasan.konversi],
        ['Halaman terbaik', laporan.halamanTerbaik],
        ['Bounce tertinggi', laporan.bounceTertinggi],
    ].map(([k, v]) => `"${k}","${v}"`);
    const blob = new Blob([[header, ...lines].join('\n')], {
        type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'laporan-analytics.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Laporan berhasil diunduh');
}

export default function Laporan({
    ringkasan,
    laporan,
    harian,
    audiens,
}: {
    ringkasan: Ringkasan;
    laporan: LaporanData;
    harian: ChartData;
    audiens: {
        usia: ChartData;
        perangkat: { perangkat: string; pengunjung: number }[];
    };
}) {
    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan Analytics"
                description="Rekap trafik situs, 8 Oktober 2026."
                breadcrumbs={[{ label: 'Analytics', href: '/analytics' }, { label: 'Laporan' }]}
                actions={
                    <Button variant="outline" size="sm" onClick={() => exportCsv(laporan, ringkasan)}>
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Pengunjung" value={laporan.pengunjung.toLocaleString('id-ID')} delta="hari ini" trend="up" icon={Users} hint="Orang unik yang membuka situs pada periode laporan." />
                <StatCard label="Total Views" value={laporan.totalViews.toLocaleString('id-ID')} delta={`${laporan.totalUnik.toLocaleString('id-ID')} unik`} trend="up" icon={Eye} hint="Total halaman yang dibuka selama periode laporan." />
                <StatCard label="Bounce Rate" value={ringkasan.bounceRate} delta="halaman tertinggi: blog" trend="flat" icon={MousePointerClick} hint="Porsi pengunjung yang pergi tanpa interaksi lanjutan." />
                <StatCard label="Konversi" value={ringkasan.konversi} delta="pengunjung → pembeli" trend="up" icon={Zap} hint="Porsi pengunjung yang menyelesaikan aksi target." />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Trafik 7 Hari</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Pengunjung dan pageviews harian.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <AreaChartCard data={harian} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Kelompok Usia</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Mayoritas pengunjung usia 25–34 tahun.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={audiens.usia} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Halaman terbaik</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                        <p className="font-mono text-xs text-primary">{laporan.halamanTerbaik}</p>
                        <p className="text-muted-foreground mt-1 text-xs">Bounce 31%, durasi 3 mnt 55 dtk.</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Perlu perhatian</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                        <p className="font-mono text-xs text-primary">{laporan.bounceTertinggi}</p>
                        <p className="text-muted-foreground mt-1 text-xs">Bounce 52%, artikel butuh CTA yang lebih jelas.</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Mayoritas ponsel</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                        <p className="text-muted-foreground text-xs">
                            {audiens.perangkat[0]?.perangkat} mendominasi (
                            {audiens.perangkat[0]?.pengunjung.toLocaleString('id-ID')} pengunjung),
                            prioritaskan kecepatan mobile.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
