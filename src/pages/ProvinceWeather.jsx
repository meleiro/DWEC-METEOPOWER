import {useMemo, useEffect, useState} from "react";

import { useParams, Link } from "react-router-dom";

import { PROVINCES } from "../data/provincesES";

import { geocodeCity, getCurrentWeather } from "../api/openweather";

export default function ProvinceWeather() {


    const { slug } = useParams();

    const province = useMemo(
        () => PROVINCES.find(p => p.slug === slug)
        ,
        [slug]
    );

    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [weather, setWeather] = useState(null);
    const [place, setPlace] = useState(null);

    useEffect(() => {


    }, [province])

}

