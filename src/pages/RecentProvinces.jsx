import { useMemo, useState} from "react";
import { Link } from "react-router-dom";
import { PROVINCES } from "../data/provincesES";
import { clearRecentSlugs, getRecentSlugs } from "../utils/recentProvinces";

export default function RecentProvinces() {

            const [recentSlugs, setRecentSlugs] = useState(() => getRecentSlugs());

            





}