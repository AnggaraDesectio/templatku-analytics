import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Hourglass, MousePointerClick, Users } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Ringkasan {
    pengunjung: number;
    pageviews: number;
    bounceRate: string;
    durasiRataRata: string;
    konversi: string;
    deltaPengunjung: string;
    deltaPageviews: string;
}

interface Halaman {
    id: number;
    halaman: string;
    views: number;
    unik: number;
    bounce: string;
    durasi: string;
}

export default function AnalyticsIndex({
    ringkasan,
    harian,
    halaman,
}: {
    ringkasan: Ringkasan;
    harian: ChartData;
    halaman: Record<string, any>[];
}) {
    const rows: Halaman[] = halaman
        .slice(0, 5)
        .map((h, i) => ({
            id: Number(h.id) || i + 1,
            halaman: String(h.halaman),
            views: Number(h.views),
            unik: Number(h.unik),
            bounce: String(h.bounce),
            durasi: String(h.durasi),
        }));

    const columns: Column<Halaman>[] = [
        {
            key: 'halaman',
            header: 'Halaman',
            render: (r) => <span className="text-primary font-mono text-xs font-medium">{r.halaman}</span>,
            sortValue: (r) => r.halaman,
        },
        {
            key: 'views',
            header: 'Views',
            render: (r) => <span className="tnum">{r.views.toLocaleString('id-ID')}</span>,
            sortValue: (r) => r.views,
        },
        {
            key: 'bounce',
            header: 'Bounce',
            render: (r) => <span className="tnum">{r.bounce}</span>,
            sortValue: (r) => r.bounce,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Analytics"
                description="Pantau siapa yang datang ke situs Anda dan dari mana."
                breadcrumbs={[{ label: 'Analytics' }]}
                actions={
                    <Button size="sm" asChild>
                        <Link href="/analytics/realtime">Pantau Realtime</Link>
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Pengunjung" value={ringkasan.pengunjung.toLocaleString('id-ID')} delta={ringkasan.deltaPengunjung} trend="up" icon={Users} hint="Orang unik yang membuka situs pada periode ini." />
                <StatCard label="Pageviews" value={ringkasan.pageviews.toLocaleString('id-ID')} delta={ringkasan.deltaPageviews} trend="up" icon={Eye} hint="Total halaman yang dibuka, satu orang bisa buka banyak." />
                <StatCard label="Bounce Rate" value={ringkasan.bounceRate} delta="konversi checkout 4,6%" trend="flat" icon={MousePointerClick} hint="Porsi pengunjung yang pergi tanpa klik apa pun." />
                <StatCard label="Durasi Rata-rata" value={ringkasan.durasiRataRata} delta="per sesi" trend="up" icon={Hourglass} hint="Rata-rata lama pengunjung bertahan di situs." />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Trafik 7 Hari</CardTitle>
                        <p className="text-muted-foreground text-sm">Pengunjung dan pageviews harian.</p>
                    </CardHeader>
                    <CardContent>
                        <AreaChartCard data={harian} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Halaman Terpopuler</CardTitle>
                        <p className="text-muted-foreground text-sm">5 halaman teratas hari ini.</p>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            rows={rows}
                            searchKeys={['halaman']}
                            pageSize={5}
                            emptyTitle="Halaman terpopuler"
                            emptyDescription="Statistik halaman muncul setelah ada pengunjung yang tercatat."
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
