import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { BarChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Akuisisi {
    channels: { channel: string; sesi: number; konversi: string }[];
    sesiPerChannel: ChartData;
}

export default function Akuisisi({ akuisisi }: { akuisisi: Akuisisi }) {
    const rows = akuisisi.channels.map((c, i) => ({ id: i + 1, ...c }));
    const totalSesi = rows.reduce((s, r) => s + r.sesi, 0);

    const columns: Column<{ id: number; channel: string; sesi: number; konversi: string }>[] = [
        { key: 'channel', header: 'Channel', sortValue: (r) => r.channel },
        {
            key: 'sesi',
            header: 'Sesi',
            render: (r) => <span className="tnum font-medium">{r.sesi.toLocaleString('id-ID')}</span>,
            sortValue: (r) => r.sesi,
        },
        {
            key: 'porsi',
            header: 'Porsi',
            render: (r) => <span className="tnum">{((r.sesi / totalSesi) * 100).toFixed(1)}%</span>,
            sortValue: (r) => r.sesi,
        },
        {
            key: 'konversi',
            header: 'Konversi',
            render: (r) => <span className="tnum text-success font-semibold">{r.konversi}</span>,
            sortValue: (r) => r.konversi,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Akuisisi"
                description="Dari channel mana pengunjung datang dan mana yang paling konvert."
                breadcrumbs={[{ label: 'Analytics', href: '/analytics' }, { label: 'Akuisisi' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Sesi per Channel</CardTitle>
                    <p className="text-muted-foreground text-sm">
                        Pencarian organik penyumbang sesi terbesar.
                    </p>
                </CardHeader>
                <CardContent>
                    <BarChartCard data={akuisisi.sesiPerChannel} />
                </CardContent>
            </Card>
            <Card className="mt-4 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Detail Channel</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['channel']}
                        emptyTitle="Belum ada data channel"
                        emptyDescription="Channel akuisisi pengunjung muncul setelah trafik tercatat."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
