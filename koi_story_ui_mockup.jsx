import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Waves, Fish, ShieldCheck, MessageCircle, Search, MapPin, BadgeEuro, Filter, ChevronRight, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const koiItems = [
  {
    id: 1,
    name: 'Kohaku 65',
    variety: 'Kohaku',
    size: '65 cm',
    price: '850 €',
    konishi: true,
    status: 'Disponible',
    image:
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'Showa 58',
    variety: 'Showa',
    size: '58 cm',
    price: '1 150 €',
    konishi: true,
    status: 'Disponible',
    image:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'Sanke 42',
    variety: 'Sanke',
    size: '42 cm',
    price: '540 €',
    konishi: false,
    status: 'Réservé',
    image:
      'https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    name: 'Ogon 50',
    variety: 'Ogon',
    size: '50 cm',
    price: '620 €',
    konishi: true,
    status: 'Disponible',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    name: 'Kohaku 72',
    variety: 'Kohaku',
    size: '72 cm',
    price: '1 490 €',
    konishi: true,
    status: 'Disponible',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    name: 'Shiro Utsuri 47',
    variety: 'Shiro Utsuri',
    size: '47 cm',
    price: '690 €',
    konishi: false,
    status: 'Vendu',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
  },
];

const varieties = ['Toutes', 'Kohaku', 'Showa', 'Sanke', 'Ogon', 'Shiro Utsuri'];
const sizes = ['Toutes tailles', '< 50 cm', '50 à 65 cm', '> 65 cm'];

function ProductCard({ item }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden rounded-3xl border-slate-200 bg-white/90 shadow-sm backdrop-blur">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex gap-2">
            {item.konishi && (
              <Badge className="rounded-full bg-amber-400 px-3 py-1 text-slate-900 hover:bg-amber-400">
                Lignée Konishi
              </Badge>
            )}
            <Badge
              variant="secondary"
              className="rounded-full bg-white/85 px-3 py-1 text-slate-900"
            >
              {item.status}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
            <div>
              <p className="text-lg font-semibold tracking-tight">{item.name}</p>
              <p className="text-sm text-white/80">{item.variety} · {item.size}</p>
            </div>
            <div className="rounded-2xl bg-white/15 px-3 py-2 text-right backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">Prix</p>
              <p className="text-xl font-bold">{item.price}</p>
            </div>
          </div>
        </div>
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Fish className="h-4 w-4" />
            Spécimen sélectionné, certificat disponible
          </div>
          <div className="flex gap-3">
            <Button className="flex-1 rounded-2xl bg-red-700 hover:bg-red-800">
              <MessageCircle className="mr-2 h-4 w-4" />
              Commander
            </Button>
            <Button variant="outline" className="rounded-2xl border-slate-300">
              Voir la fiche
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function KoiStoryUIMockup() {
  const [variety, setVariety] = useState('Toutes');
  const [size, setSize] = useState('Toutes tailles');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return koiItems.filter((item) => {
      const varietyOk = variety === 'Toutes' || item.variety === variety;
      const sizeNum = Number(item.size.replace(/[^\d]/g, ''));
      const sizeOk =
        size === 'Toutes tailles' ||
        (size === '< 50 cm' && sizeNum < 50) ||
        (size === '50 à 65 cm' && sizeNum >= 50 && sizeNum <= 65) ||
        (size === '> 65 cm' && sizeNum > 65);
      const searchOk =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.variety.toLowerCase().includes(search.toLowerCase());
      return varietyOk && sizeOk && searchOk;
    });
  }, [variety, size, search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-50 text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.18),transparent_25%),radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_30%)]" />
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-8">
          <nav className="mb-10 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white backdrop-blur">
            <div className="flex items-center gap-3 font-semibold tracking-wide">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-slate-950">
                <Fish className="h-5 w-5" />
              </div>
              Koi's Story
            </div>
            <div className="hidden items-center gap-6 md:flex">
              <a className="text-white/80">Accueil</a>
              <a className="text-white/80">Catalogue</a>
              <a className="text-white/80">Élevage</a>
              <a className="text-white/80">Galerie</a>
              <a className="text-white/80">Contact</a>
            </div>
            <Button className="rounded-full bg-white text-slate-950 hover:bg-slate-100">Voir le catalogue</Button>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-7 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200"
              >
                <ShieldCheck className="h-4 w-4" />
                Lignée Konishi mise en avant
              </motion.div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
                  Élevage de carpes koï d’exception, pensé pour une conversion mobile immédiate.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/75">
                  Maquette UI orientée premium, aquatique et commerçante. Hero immersif, proposition de valeur claire, prix visibles et accès direct au catalogue en moins de 3 clics.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-2xl bg-red-700 px-6 hover:bg-red-800">
                  Voir les koï disponibles
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-2xl border-white/20 bg-white/5 px-6 text-white hover:bg-white/10">
                  Découvrir l'élevage
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="rounded-3xl border-white/10 bg-white/5 text-white shadow-none backdrop-blur">
                  <CardContent className="p-5">
                    <p className="mb-2 text-sm text-white/60">Promesse</p>
                    <p className="text-base font-medium">Comprendre l’offre en 5 secondes</p>
                  </CardContent>
                </Card>
                <Card className="rounded-3xl border-white/10 bg-white/5 text-white shadow-none backdrop-blur">
                  <CardContent className="p-5">
                    <p className="mb-2 text-sm text-white/60">Conversion</p>
                    <p className="text-base font-medium">WhatsApp direct depuis chaque fiche</p>
                  </CardContent>
                </Card>
                <Card className="rounded-3xl border-white/10 bg-white/5 text-white shadow-none backdrop-blur">
                  <CardContent className="p-5">
                    <p className="mb-2 text-sm text-white/60">Crédibilité</p>
                    <p className="text-base font-medium">Badge Konishi et certificats visibles</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-amber-400/20 to-sky-400/10 blur-3xl" />
              <Card className="relative overflow-hidden rounded-[2rem] border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80"
                    alt="Bassin et koï"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-4 flex items-center gap-2 text-sm text-white/70">
                      <MapPin className="h-4 w-4" />
                      Élevage en France · Spécimens sélectionnés
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                        <p className="text-xs uppercase tracking-[0.18em] text-white/60">Style</p>
                        <p className="mt-1 text-lg font-semibold">Premium aquatique</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                        <p className="text-xs uppercase tracking-[0.18em] text-white/60">UI</p>
                        <p className="mt-1 text-lg font-semibold">Mobile-first</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative -mt-2 rounded-t-[2.5rem] bg-slate-50 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm text-sky-900">
                <Waves className="h-4 w-4" />
                Maquette catalogue
              </div>
              <h2 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                Catalogue orienté vente, clair dès le premier scroll.
              </h2>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                Filtres visibles, recherche simple, cartes premium avec prix immédiatement lisible et badge Konishi prioritaire.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Star className="h-4 w-4 text-amber-500" />
                Direction artistique validée : dynamique, commerçante, contrastée.
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <Card className="rounded-[2rem] border-slate-200 bg-white shadow-sm">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <Filter className="h-5 w-5" />
                  Filtres
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Recherche</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Nom ou variété"
                      className="rounded-2xl border-slate-200 pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Variété</label>
                  <div className="flex flex-wrap gap-2">
                    {varieties.map((v) => (
                      <button
                        key={v}
                        onClick={() => setVariety(v)}
                        className={`rounded-full px-3 py-2 text-sm transition ${
                          variety === v
                            ? 'bg-slate-950 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Taille</label>
                  <div className="grid gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          size === s
                            ? 'border-slate-950 bg-slate-950 text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-sky-950 p-5 text-white">
                  <div className="mb-2 flex items-center gap-2 text-sm text-sky-200">
                    <BadgeEuro className="h-4 w-4" />
                    Focus conversion
                  </div>
                  <p className="text-sm leading-7 text-white/85">
                    Le prix reste visible directement sur chaque card pour répondre à la direction commerçante du projet.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-5">
              <div className="flex items-center justify-between rounded-[2rem] border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <div>
                  <p className="text-sm text-slate-500">Résultats</p>
                  <p className="text-2xl font-semibold tracking-tight text-slate-950">{filtered.length} koï visibles</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  Vue catalogue premium
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
