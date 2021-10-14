
import { AccountPage } from './pages/Account';
import { GamesStorePage } from './pages/GamesStore';
import { InventoryPage } from './pages/Inventory';
import { LibraryPage } from './pages/Library';
import { MarketplacePage } from './pages/Marketplace';

import PlayersDemo from './demos/Demo1_players'
import AchievementsDemo from './demos/Demo2_achievements'
import DevPanel from './demos/Dev_Panel_Page';

export type Route = {
    path: string;
    name: string;
    component: () => JSX.Element;
}

export const homepath = '/gamesStore';

export const routes: Route[] = [
    // Tmp
    {
        path: "/gamesStore",
        name: "Games Store",
        component: GamesStorePage
    },
    {
        path: "/inventory",
        name: "Inventory",
        component: InventoryPage
    },
    {
        path: "/library",
        name: "Library",
        component: LibraryPage
    },
    {
        path: "/marketplace",
        name: "Marketplace",
        component: MarketplacePage
    },
    {
        path: "/demo1",
        name: "[DEV] Demo 1 (Players)",
        component: PlayersDemo
    },
    {
        path: "/demo2",
        name: "[DEV] Demo 2 (Achievements; admin)",
        component: AchievementsDemo
    },
    {
        path: "/dev-panel",
        name: "[Dev] DevPanel",
        component: DevPanel
    },
]
