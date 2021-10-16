import { StringPublicKey } from '@oyster/common';
import { createSlice } from '@reduxjs/toolkit';
import { PublicKey, Keypair } from '@solana/web3.js'
import { friendsPlayGame } from '../../../nft-store/games/dummyGames';
import { dummyItems } from '../../../nft-store/items/dummyItems';

export interface InventoryPageState {
  itemsByGames: [{
    gameId: StringPublicKey,
    items: StringPublicKey[]
  }],
}

const initialState: InventoryPageState = {
  itemsByGames: [
    {
      gameId: friendsPlayGame.publicKey.toString(),
      items: dummyItems.map(x => x.address.toString())
    }
  ]
};

export const inventoryPageSlice = createSlice({
  name: 'inventoryPage',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {

  },
});


export default inventoryPageSlice.reducer;