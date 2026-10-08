import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCounter } from '@/components/stat-counter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Radio } from 'lucide-react';

interface Realtime {
    aktif: number;
    perMenit: number[];
    halamanTop: { halaman: string; aktif: number }[];
    sumberAktif: { sumber: string; aktif: number }[];
}

export default function Realtime({ realtime }: { realtime: Realtime }) {
    const maxMenit = Math.max(...realtime.perMenit, 1);
    const maxHalaman = Math.max(...realtime.halamanTop.map((h) => h.aktif), 1);
    const maxSumber = Math.max(...realtime.sumberAktif.map((s) => s.aktif), 1);

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Realtime"
                description="Pengunjung yang sedang aktif di situs saat ini."
                breadcrumbs={[{ label: 'Analytics', href: '/analytics' }, { label: 'Realtime' }]}
            />
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
                            </span>
                            <p className="text-xs font-medium uppercase tracking-wide">
                                Pengunjung aktif
                            </p>
                        </div>
                        <p className="tnum mt-2 text-4xl font-bold tracking-tight">
                            <StatCounter value={realtime.aktif} />
                        </p>
                        <div className="mt-4 flex h-16 items-end gap-1">
                            {realtime.perMenit.map((v, i) => (
                                <div
                                    key={i}
                                    className="bg-primary/70 flex-1 rounded-t"
                                    style={{ height: `${(v / maxMenit) * 100}%` }}
                                    title={`${v} pengunjung`}
                                />
                            ))}
                        </div>
                        <p className="text-muted-foreground mt-2 text-xs">
                            Aktivitas 10 menit terakhir.
                        </p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Halaman Aktif</CardTitle>
                        <p className="text-muted-foreground text-sm">Sedang dibuka pengunjung.</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {realtime.halamanTop.map((h) => (
                            <div key={h.halaman}>
                                <div className="mb-1 flex items-center justify-between text-sm">
                                    <span className="font-mono text-xs">{h.halaman}</span>
                                    <span className="tnum font-semibold">{h.aktif}</span>
                                </div>
                                <div className="bg-muted h-2 rounded-full">
                                    <div
                                        className="bg-success h-2 rounded-full"
                                        style={{ width: `${(h.aktif / maxHalaman) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Radio className="h-4 w-4 text-primary" /> Sumber Aktif
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">Dari mana mereka datang.</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {realtime.sumberAktif.map((s) => (
                            <div key={s.sumber}>
                                <div className="mb-1 flex items-center justify-between text-sm">
                                    <span className="font-medium">{s.sumber}</span>
                                    <span className="tnum font-semibold">{s.aktif}</span>
                                </div>
                                <div className="bg-muted h-2 rounded-full">
                                    <div
                                        className="bg-info h-2 rounded-full"
                                        style={{ width: `${(s.aktif / maxSumber) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
