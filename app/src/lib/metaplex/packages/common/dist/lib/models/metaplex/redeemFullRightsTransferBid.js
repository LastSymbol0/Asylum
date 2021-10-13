"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemFullRightsTransferBid = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const _1 = require(".");
const actions_1 = require("../../actions");
const utils_1 = require("../../utils");
async function redeemFullRightsTransferBid(vault, safetyDepositTokenStore, destination, safetyDeposit, fractionMint, bidder, payer, instructions, masterMetadata, newAuthority, 
// If this is an auctioneer trying to reclaim a specific winning index, pass it here,
// and this will instead call the proxy route instead of the real one, wrapping the original
// redemption call in an override call that forces the winning index if the auctioneer is authorized.
auctioneerReclaimIndex) {
    const PROGRAM_IDS = utils_1.programIds();
    const store = PROGRAM_IDS.store;
    if (!store) {
        throw new Error('Store not initialized');
    }
    const { auctionKey, auctionManagerKey } = await _1.getAuctionKeys(vault);
    const { bidRedemption, bidMetadata } = await _1.getBidderKeys(auctionKey, bidder);
    const transferAuthority = (await utils_1.findProgramAddress([
        Buffer.from(actions_1.VAULT_PREFIX),
        utils_1.toPublicKey(PROGRAM_IDS.vault).toBuffer(),
        utils_1.toPublicKey(vault).toBuffer(),
    ], utils_1.toPublicKey(PROGRAM_IDS.vault)))[0];
    const safetyDepositConfig = await _1.getSafetyDepositConfig(auctionManagerKey, safetyDeposit);
    const auctionExtended = await actions_1.getAuctionExtended({
        auctionProgramId: PROGRAM_IDS.auction,
        resource: vault,
    });
    const value = auctioneerReclaimIndex !== undefined
        ? new _1.RedeemUnusedWinningConfigItemsAsAuctioneerArgs({
            winningConfigItemIndex: auctioneerReclaimIndex,
            proxyCall: _1.ProxyCallAddress.RedeemFullRightsTransferBid,
        })
        : new _1.RedeemFullRightsTransferBidArgs();
    const data = Buffer.from(borsh_1.serialize(_1.SCHEMA, value));
    const keys = [
        {
            pubkey: utils_1.toPublicKey(auctionManagerKey),
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: utils_1.toPublicKey(safetyDepositTokenStore),
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: utils_1.toPublicKey(destination),
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: utils_1.toPublicKey(bidRedemption),
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: utils_1.toPublicKey(safetyDeposit),
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: utils_1.toPublicKey(vault),
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: utils_1.toPublicKey(fractionMint),
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: utils_1.toPublicKey(auctionKey),
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: utils_1.toPublicKey(bidMetadata),
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: utils_1.toPublicKey(bidder),
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: utils_1.toPublicKey(payer),
            isSigner: true,
            isWritable: false,
        },
        {
            pubkey: PROGRAM_IDS.token,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: utils_1.toPublicKey(PROGRAM_IDS.vault),
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: utils_1.toPublicKey(PROGRAM_IDS.metadata),
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: store,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: web3_js_1.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: utils_1.toPublicKey(masterMetadata),
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: utils_1.toPublicKey(newAuthority),
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: utils_1.toPublicKey(transferAuthority),
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: utils_1.toPublicKey(safetyDepositConfig),
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: utils_1.toPublicKey(auctionExtended),
            isSigner: false,
            isWritable: false,
        },
    ];
    instructions.push(new web3_js_1.TransactionInstruction({
        keys,
        programId: utils_1.toPublicKey(PROGRAM_IDS.metaplex),
        data,
    }));
}
exports.redeemFullRightsTransferBid = redeemFullRightsTransferBid;
//# sourceMappingURL=redeemFullRightsTransferBid.js.map