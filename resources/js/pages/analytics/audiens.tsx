import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DonutChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Audiens {
    usia: ChartData;
    gender: ChartData;
    kota: { kota: string; pengunjung: number }[];
    perangkat: { perangkat: string; pengunjung: number }[];
}

export default function Audiens({ audiens }: { audiens: Audiens }) {
    const kotaRows = audiens.kota.map((k, i) => ({ id: i + 1, ...k }));
    const totalPerangkat = audiens.perangkat.reduce((s, p) => s + p.pengunjung, 0);

    const kotaColumns: Column<{ id: number; kota: string; pengunjung: number }>[] = [
        { key: 'kota', header: 'Kota', sortValue: (r) => r.kota },
        {
            key: 'pengunjung',
            header: 'Pengunjung',
            render: (r) => <span className="tnum font-medium">{r.pengunjung.toLocaleString('id-ID')}</span>,
            sortValue: (r) => r.pengunjung,
        },
        {
            key: 'porsi',
            header: 'Porsi',
            render: (r) => (
                <span className="tnum">{((r.pengunjung / 4820) * 100).toFixed(1)}%</span>
            ),
            sortValue: (r) => r.pengunjung,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Audiens"
                description="Siapa yang mengunjungi situs: usia, gender, kota, perangkat."
                breadcrumbs={[{ label: 'Analytics', href: '/analytics' }, { label: 'Audiens' }]}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Kelompok Usia</CardTitle>
                        <p className="text-muted-foreground text-sm">Mayoritas 25–34 tahun.</p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={audiens.usia} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Gender</CardTitle>
                        <p className="text-muted-foreground text-sm">Dominan perempuan.</p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={audiens.gender} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Perangkat</CardTitle>
                        <p className="text-muted-foreground text-sm">Ponsel jadi mayoritas.</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {audiens.perangkat.map((p) => (
                            <div key={p.perangkat}>
                                <div className="mb-1 flex items-center justify-between text-sm">
                                    <span className="font-medium">{p.perangkat}</span>
                                    <span className="tnum text-muted-foreground">
                                        {p.pengunjung.toLocaleString('id-ID')} (
                                        {((p.pengunjung / totalPerangkat) * 100).toFixed(0)}%)
                                    </span>
                                </div>
                                <div className="bg-muted h-2.5 rounded-full">
                                    <div
                                        className="bg-primary h-2.5 rounded-full"
                                        style={{ width: `${(p.pengunjung / totalPerangkat) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <Card className="mt-4 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Pengunjung per Kota</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={kotaColumns}
                        rows={kotaRows}
                        searchKeys={['kota']}
                        pageSize={6}
                        emptyTitle="Belum ada data kota"
                        emptyDescription="Asal kota pengunjung muncul setelah trafik tercatat."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
