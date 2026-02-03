const KEY = "recent_Provinces";

export function getRecentSlugs() {

    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return [];
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];

    } catch {
        return [];
    }


}

export function setRecentSlugs(slugs) {
    localStorage.setItem(KEY, JSON.stringify(slugs));
}


export function addRecentSlug(slug) {

    const previo = getRecentSlugs();

    // Quitamos el slug si ya existía (para moverlo al inicio)
    const limpio = previo.filter((s) => s !== slug);

    // Lo colocamos delante
    const nuevo = [slug, ...limpio];

    setRecentSlugs(nuevo);


}

export function clearRecentSlugs(){
    localStorage.removeItem(KEY);
}
