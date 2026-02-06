const KEY = "favorite_Provinces";

export function getFavoriteSlugs() {

    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return [];
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];

    } catch {
        return [];
    }


}

export function setFavoriteSlugs(slugs) {
    localStorage.setItem(KEY, JSON.stringify(slugs));
}




export function addFavoriteSlug(slug) {

    const previo = getRecentSlugs();

    // Quitamos el slug si ya existía (para moverlo al inicio)
    const limpio = previo.filter((s) => s !== slug);

    // Lo colocamos delante
    const nuevo = [slug, ...limpio];

    setRecentSlugs(nuevo);


}

export function clearFavoritySlugs(){
    localStorage.removeItem(KEY);
}

export function toggleFavoriteSlug(slug) {

    if (!slug) return getFavoriteSlugs();

    const prev = getFavoriteSlugs();

    const exists = prev.includes(slug);

    const nuevo = exists ? prev.filter((s) => s !== slug) : [slug, ...prev];

    setFavoriteSlugs(nuevo);
    return nuevo;

}