import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gamesNftStoreReducer from '../nft-store/games/gamesNftStore';
import itemsNftStoreReducer from '../nft-store/items/itemsNftStoreSlice';
import accountPageReducer from '../pages/Account/store/accountSlice';
import gamesStorePageReducer from '../pages/GamesStore/store/gamesStoreSlice';
import inventoryPageReducer from '../pages/Inventory/store/inventorySlice';
import libraryPageReducer from '../pages/Library/store/librarySlice';
import marketplacePageReducer from '../pages/Marketplace/store/marketplaceSlice';

export const store = configureStore({
  reducer: {
    accountPage: accountPageReducer,
    gamesStorePage: gamesStorePageReducer,
    inventoryPage: inventoryPageReducer,
    libraryPage: libraryPageReducer,
    marketplacePage: marketplacePageReducer,
    gamesNftStore: gamesNftStoreReducer,
    itemsNftStore: itemsNftStoreReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
