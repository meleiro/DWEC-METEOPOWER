import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PROVINCES } from "../data/provincesES";

export default function Favorites(){


    // importar funciones del js de favoritos

    const favoriteProvinces = useMemo(() => {
        const map = new Map(PROVINCES.map((p) => [p.slug, p]));
        return fovorites.map((slug) => map.get(slug)).filter(Boolean);


    }, [favorites]);





}