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
    if (!slug) return

    const previos = getRecentSlugs();

    let nuevo = [];

    const limpio =  previos.filter((s) => s !== slug);

    if (!previos.includes(slug)) {
        nuevo = [slug, ...limpio];
    }

    setRecentSlugs(nuevo);


}

export function clearRecentSlugs(){
    localStorage.removeItem(KEY);
}
