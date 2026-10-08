import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Halaman {
    id: number;
    halaman: string;
    views: number;
    unik: number;
    bounce: string;
    durasi: string;
}

const parsePct = (s: string) => parseFloat(s.replace('%', '').replace(',', '.')) || 0;

export default function Perilaku({ perilaku }: { perilaku: Record<string, any>[] }) {
    const rows: Halaman[] = perilaku.map((h, i) => ({
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
            render: (r) => <span className="tnum font-medium">{r.views.toLocaleString('id-ID')}</span>,
            sortValue: (r) => r.views,
        },
        {
            key: 'unik',
            header: 'Unik',
            render: (r) => <span className="tnum">{r.unik.toLocaleString('id-ID')}</span>,
            sortValue: (r) => r.unik,
            mobileHidden: true,
        },
        {
            key: 'bounce',
            header: 'Bounce',
            render: (r) => (
                <Badge variant={parsePct(r.bounce) >= 45 ? 'destructive' : 'secondary'}>
                    {r.bounce}
                </Badge>
            ),
            sortValue: (r) => parsePct(r.bounce),
        },
        { key: 'durasi', header: 'Durasi', sortValue: (r) => r.durasi, mobileHidden: true },
    ];

    const filters: FilterOption[] = [
        {
            key: 'bounce',
            label: 'Bounce',
            options: [
                { value: 'rendah', label: 'Rendah (< 40%)' },
                { value: 'tinggi', label: 'Tinggi (≥ 40%)' },
            ],
            match: (row: any, value: string) =>
                value === 'tinggi' ? parsePct(row.bounce) >= 40 : parsePct(row.bounce) < 40,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Perilaku"
                description="Bagaimana pengunjung berinteraksi di tiap halaman."
                breadcrumbs={[{ label: 'Analytics', href: '/analytics' }, { label: 'Perilaku' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Performa Halaman</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['halaman']}
                        filters={filters}
                        emptyTitle="Belum ada data halaman"
                        emptyDescription="Statistik perilaku halaman muncul setelah ada sesi tercatat."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
