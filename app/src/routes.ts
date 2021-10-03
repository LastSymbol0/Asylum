// @ts-nocheck

import { AccountPage } from "./pages/Account";
import { GamesStorePage } from "./pages/GamesStore";
import { InventoryPage } from "./pages/Inventory";
import { LibraryPage } from "./pages/Library";
import { MarketplacePage } from "./pages/Marketplace";

import PlayersDemo from "./demos/Demo1_players";

export type Route = {
  path: string;
  name: string;
  component: () => JSX.Element;
};

export const routes: Route[] = [
  {
    path: "/account",
    name: "Account",
    component: AccountPage,
  },
  {
    path: "/gamesStore",
    name: "Games Store",
    component: GamesStorePage,
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: InventoryPage,
  },
  {
    path: "/library",
    name: "Library",
    component: LibraryPage,
  },
  {
    path: "/marketplace",
    name: "Marketplace",
    component: MarketplacePage,
  },
  {
    path: "/demo1",
    name: "Demo 1 (Players)",
    component: PlayersDemo,
  },
];

