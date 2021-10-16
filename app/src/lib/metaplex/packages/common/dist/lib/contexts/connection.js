"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSignedTransaction = exports.getUnixTs = exports.sendTransactionWithRetry = exports.sendTransaction = exports.sendTransactions = exports.sendTransactionsWithManualRetry = exports.SequenceType = exports.getErrorForTransaction = exports.useConnectionConfig = exports.useConnection = exports.ConnectionProvider = exports.ENDPOINTS = void 0;
const utils_1 = require("../utils/utils");
const web3_js_1 = require("@solana/web3.js");
const react_1 = __importStar(require("react"));
const notifications_1 = require("../utils/notifications");
const ExplorerLink_1 = require("../components/ExplorerLink");
const hooks_1 = require("../hooks");
const spl_token_registry_1 = require("@solana/spl-token-registry");
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
exports.ENDPOINTS = [
    {
        name: 'mainnet-beta',
        endpoint: 'https://api.metaplex.solana.com/',
        ChainId: spl_token_registry_1.ENV.MainnetBeta,
    },
    {
        name: 'mainnet-beta (Solana)',
        endpoint: 'https://api.mainnet-beta.solana.com',
        ChainId: spl_token_registry_1.ENV.MainnetBeta,
    },
    {
        name: 'mainnet-beta (Serum)',
        endpoint: 'https://solana-api.projectserum.com/',
        ChainId: spl_token_registry_1.ENV.MainnetBeta,
    },
    {
        name: 'testnet',
        endpoint: web3_js_1.clusterApiUrl('testnet'),
        ChainId: spl_token_registry_1.ENV.Testnet,
    },
    {
        name: 'devnet',
        endpoint: web3_js_1.clusterApiUrl('devnet'),
        ChainId: spl_token_registry_1.ENV.Devnet,
    },
];
const DEFAULT = exports.ENDPOINTS[0].endpoint;
const ConnectionContext = react_1.default.createContext({
    endpoint: DEFAULT,
    setEndpoint: () => { },
    connection: new web3_js_1.Connection(DEFAULT, 'recent'),
    env: exports.ENDPOINTS[0].name,
    tokens: [],
    tokenMap: new Map(),
});
function ConnectionProvider({ children = undefined }) {
    var _a, _b;
    const searchParams = hooks_1.useQuerySearch();
    const network = searchParams.get('network');
    const queryEndpoint = network && ((_a = exports.ENDPOINTS.find(({ name }) => name.startsWith(network))) === null || _a === void 0 ? void 0 : _a.endpoint);
    const [savedEndpoint, setEndpoint] = utils_1.useLocalStorageState('connectionEndpoint', exports.ENDPOINTS[0].endpoint);
    const endpoint = queryEndpoint || savedEndpoint;
    const connection = react_1.useMemo(() => new web3_js_1.Connection(endpoint, 'recent'), [endpoint]);
    const env = ((_b = exports.ENDPOINTS.find(end => end.endpoint === endpoint)) === null || _b === void 0 ? void 0 : _b.name) || exports.ENDPOINTS[0].name;
    const [tokens, setTokens] = react_1.useState([]);
    const [tokenMap, setTokenMap] = react_1.useState(new Map());
    react_1.useEffect(() => {
        // fetch token files
        new spl_token_registry_1.TokenListProvider().resolve().then(container => {
            var _a;
            const list = container
                .excludeByTag('nft')
                .filterByChainId(((_a = exports.ENDPOINTS.find(end => end.endpoint === endpoint)) === null || _a === void 0 ? void 0 : _a.ChainId) ||
                spl_token_registry_1.ENV.MainnetBeta)
                .getList();
            const knownMints = [...list].reduce((map, item) => {
                map.set(item.address, item);
                return map;
            }, new Map());
            setTokenMap(knownMints);
            setTokens(list);
        });
    }, [env]);
    // The websocket library solana/web3.js uses closes its websocket connection when the subscription list
    // is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
    // This is a hack to prevent the list from every getting empty
    react_1.useEffect(() => {
        const id = connection.onAccountChange(web3_js_1.Keypair.generate().publicKey, () => { });
        return () => {
            connection.removeAccountChangeListener(id);
        };
    }, [connection]);
    react_1.useEffect(() => {
        const id = connection.onSlotChange(() => null);
        return () => {
            connection.removeSlotChangeListener(id);
        };
    }, [connection]);
    return (react_1.default.createElement(ConnectionContext.Provider, { value: {
            endpoint,
            setEndpoint,
            connection,
            tokens,
            tokenMap,
            env,
        } }, children));
}
exports.ConnectionProvider = ConnectionProvider;
function useConnection() {
    return react_1.useContext(ConnectionContext).connection;
}
exports.useConnection = useConnection;
function useConnectionConfig() {
    const context = react_1.useContext(ConnectionContext);
    return {
        endpoint: context.endpoint,
        setEndpoint: context.setEndpoint,
        env: context.env,
        tokens: context.tokens,
        tokenMap: context.tokenMap,
    };
}
exports.useConnectionConfig = useConnectionConfig;
const getErrorForTransaction = async (connection, txid) => {
    // wait for all confirmation before geting transaction
    await connection.confirmTransaction(txid, 'max');
    const tx = await connection.getParsedConfirmedTransaction(txid);
    const errors = [];
    if ((tx === null || tx === void 0 ? void 0 : tx.meta) && tx.meta.logMessages) {
        tx.meta.logMessages.forEach(log => {
            const regex = /Error: (.*)/gm;
            let m;
            while ((m = regex.exec(log)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                if (m.length > 1) {
                    errors.push(m[1]);
                }
            }
        });
    }
    return errors;
};
exports.getErrorForTransaction = getErrorForTransaction;
var SequenceType;
(function (SequenceType) {
    SequenceType[SequenceType["Sequential"] = 0] = "Sequential";
    SequenceType[SequenceType["Parallel"] = 1] = "Parallel";
    SequenceType[SequenceType["StopOnFailure"] = 2] = "StopOnFailure";
})(SequenceType = exports.SequenceType || (exports.SequenceType = {}));
async function sendTransactionsWithManualRetry(connection, wallet, instructions, signers) {
    let stopPoint = 0;
    let tries = 0;
    let lastInstructionsLength = null;
    let toRemoveSigners = {};
    instructions = instructions.filter((instr, i) => {
        if (instr.length > 0) {
            return true;
        }
        else {
            toRemoveSigners[i] = true;
            return false;
        }
    });
    let filteredSigners = signers.filter((_, i) => !toRemoveSigners[i]);
    while (stopPoint < instructions.length && tries < 3) {
        instructions = instructions.slice(stopPoint, instructions.length);
        filteredSigners = filteredSigners.slice(stopPoint, filteredSigners.length);
        if (instructions.length === lastInstructionsLength)
            tries = tries + 1;
        else
            tries = 0;
        try {
            if (instructions.length === 1) {
                await exports.sendTransactionWithRetry(connection, wallet, instructions[0], filteredSigners[0], 'single');
                stopPoint = 1;
            }
            else {
                stopPoint = await exports.sendTransactions(connection, wallet, instructions, filteredSigners, SequenceType.StopOnFailure, 'single');
            }
        }
        catch (e) {
            console.error(e);
        }
        console.log('Died on ', stopPoint, 'retrying from instruction', instructions[stopPoint], 'instructions length is', instructions.length);
        lastInstructionsLength = instructions.length;
    }
}
exports.sendTransactionsWithManualRetry = sendTransactionsWithManualRetry;
const sendTransactions = async (connection, wallet, instructionSet, signersSet, sequenceType = SequenceType.Parallel, commitment = 'singleGossip', successCallback = (txid, ind) => { }, failCallback = (txid, ind) => false, block) => {
    if (!wallet.publicKey)
        throw new wallet_adapter_base_1.WalletNotConnectedError();
    const unsignedTxns = [];
    if (!block) {
        block = await connection.getRecentBlockhash(commitment);
    }
    for (let i = 0; i < instructionSet.length; i++) {
        const instructions = instructionSet[i];
        const signers = signersSet[i];
        if (instructions.length === 0) {
            continue;
        }
        let transaction = new web3_js_1.Transaction();
        instructions.forEach(instruction => transaction.add(instruction));
        transaction.recentBlockhash = block.blockhash;
        transaction.setSigners(
        // fee payed by the wallet owner
        wallet.publicKey, ...signers.map(s => s.publicKey));
        if (signers.length > 0) {
            transaction.partialSign(...signers);
        }
        unsignedTxns.push(transaction);
    }
    const signedTxns = await wallet.signAllTransactions(unsignedTxns);
    const pendingTxns = [];
    let breakEarlyObject = { breakEarly: false, i: 0 };
    console.log('Signed txns length', signedTxns.length, 'vs handed in length', instructionSet.length);
    for (let i = 0; i < signedTxns.length; i++) {
        const signedTxnPromise = sendSignedTransaction({
            connection,
            signedTransaction: signedTxns[i],
        });
        signedTxnPromise
            .then(({ txid, slot }) => {
            successCallback(txid, i);
        })
            .catch(reason => {
            // @ts-ignore
            failCallback(signedTxns[i], i);
            if (sequenceType === SequenceType.StopOnFailure) {
                breakEarlyObject.breakEarly = true;
                breakEarlyObject.i = i;
            }
        });
        if (sequenceType !== SequenceType.Parallel) {
            try {
                await signedTxnPromise;
            }
            catch (e) {
                console.log('Caught failure', e);
                if (breakEarlyObject.breakEarly) {
                    console.log('Died on ', breakEarlyObject.i);
                    return breakEarlyObject.i; // Return the txn we failed on by index
                }
            }
        }
        else {
            pendingTxns.push(signedTxnPromise);
        }
    }
    if (sequenceType !== SequenceType.Parallel) {
        await Promise.all(pendingTxns);
    }
    return signedTxns.length;
};
exports.sendTransactions = sendTransactions;
const sendTransaction = async (connection, wallet, instructions, signers, awaitConfirmation = true, commitment = 'singleGossip', includesFeePayer = false, block) => {
    if (!wallet.publicKey)
        throw new wallet_adapter_base_1.WalletNotConnectedError();
    let transaction = new web3_js_1.Transaction();
    instructions.forEach(instruction => transaction.add(instruction));
    transaction.recentBlockhash = (block || (await connection.getRecentBlockhash(commitment))).blockhash;
    if (includesFeePayer) {
        transaction.setSigners(...signers.map(s => s.publicKey));
    }
    else {
        transaction.setSigners(
        // fee payed by the wallet owner
        wallet.publicKey, ...signers.map(s => s.publicKey));
    }
    if (signers.length > 0) {
        transaction.partialSign(...signers);
    }
    if (!includesFeePayer) {
        transaction = await wallet.signTransaction(transaction);
    }
    const rawTransaction = transaction.serialize();
    let options = {
        skipPreflight: true,
        commitment,
    };
    const txid = await connection.sendRawTransaction(rawTransaction, options);
    let slot = 0;
    if (awaitConfirmation) {
        const confirmation = await awaitTransactionSignatureConfirmation(txid, DEFAULT_TIMEOUT, connection, commitment);
        if (!confirmation)
            throw new Error('Timed out awaiting confirmation on transaction');
        slot = (confirmation === null || confirmation === void 0 ? void 0 : confirmation.slot) || 0;
        if (confirmation === null || confirmation === void 0 ? void 0 : confirmation.err) {
            const errors = await exports.getErrorForTransaction(connection, txid);
            notifications_1.notify({
                message: 'Transaction failed...',
                description: (react_1.default.createElement(react_1.default.Fragment, null,
                    errors.map(err => (react_1.default.createElement("div", null, err))),
                    react_1.default.createElement(ExplorerLink_1.ExplorerLink, { address: txid, type: "transaction" }))),
                type: 'error',
            });
            throw new Error(`Raw transaction ${txid} failed (${JSON.stringify(status)})`);
        }
    }
    return { txid, slot };
};
exports.sendTransaction = sendTransaction;
const sendTransactionWithRetry = async (connection, wallet, instructions, signers, commitment = 'singleGossip', includesFeePayer = false, block, beforeSend) => {
    if (!wallet.publicKey)
        throw new wallet_adapter_base_1.WalletNotConnectedError();
    let transaction = new web3_js_1.Transaction();
    instructions.forEach(instruction => transaction.add(instruction));
    transaction.recentBlockhash = (block || (await connection.getRecentBlockhash(commitment))).blockhash;
    if (includesFeePayer) {
        transaction.setSigners(...signers.map(s => s.publicKey));
    }
    else {
        transaction.setSigners(
        // fee payed by the wallet owner
        wallet.publicKey, ...signers.map(s => s.publicKey));
    }
    if (signers.length > 0) {
        transaction.partialSign(...signers);
    }
    if (!includesFeePayer) {
        transaction = await wallet.signTransaction(transaction);
    }
    if (beforeSend) {
        beforeSend();
    }
    const { txid, slot } = await sendSignedTransaction({
        connection,
        signedTransaction: transaction,
    });
    return { txid, slot };
};
exports.sendTransactionWithRetry = sendTransactionWithRetry;
const getUnixTs = () => {
    return new Date().getTime() / 1000;
};
exports.getUnixTs = getUnixTs;
const DEFAULT_TIMEOUT = 15000;
async function sendSignedTransaction({ signedTransaction, connection, timeout = DEFAULT_TIMEOUT, }) {
    const rawTransaction = signedTransaction.serialize();
    const startTime = exports.getUnixTs();
    let slot = 0;
    const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
    });
    console.log('Started awaiting confirmation for', txid);
    let done = false;
    (async () => {
        while (!done && exports.getUnixTs() - startTime < timeout) {
            connection.sendRawTransaction(rawTransaction, {
                skipPreflight: true,
            });
            await utils_1.sleep(500);
        }
    })();
    try {
        const confirmation = await awaitTransactionSignatureConfirmation(txid, timeout, connection, 'recent', true);
        if (!confirmation)
            throw new Error('Timed out awaiting confirmation on transaction');
        if (confirmation.err) {
            console.error(confirmation.err);
            throw new Error('Transaction failed: Custom instruction error');
        }
        slot = (confirmation === null || confirmation === void 0 ? void 0 : confirmation.slot) || 0;
    }
    catch (err) {
        console.error('Timeout Error caught', err);
        if (err.timeout) {
            throw new Error('Timed out awaiting confirmation on transaction');
        }
        let simulateResult = null;
        try {
            simulateResult = (await simulateTransaction(connection, signedTransaction, 'single')).value;
        }
        catch (e) { }
        if (simulateResult && simulateResult.err) {
            if (simulateResult.logs) {
                for (let i = simulateResult.logs.length - 1; i >= 0; --i) {
                    const line = simulateResult.logs[i];
                    if (line.startsWith('Program log: ')) {
                        throw new Error('Transaction failed: ' + line.slice('Program log: '.length));
                    }
                }
            }
            throw new Error(JSON.stringify(simulateResult.err));
        }
        // throw new Error('Transaction failed');
    }
    finally {
        done = true;
    }
    console.log('Latency', txid, exports.getUnixTs() - startTime);
    return { txid, slot };
}
exports.sendSignedTransaction = sendSignedTransaction;
async function simulateTransaction(connection, transaction, commitment) {
    // @ts-ignore
    transaction.recentBlockhash = await connection._recentBlockhash(
    // @ts-ignore
    connection._disableBlockhashCaching);
    const signData = transaction.serializeMessage();
    // @ts-ignore
    const wireTransaction = transaction._serialize(signData);
    const encodedTransaction = wireTransaction.toString('base64');
    const config = { encoding: 'base64', commitment };
    const args = [encodedTransaction, config];
    // @ts-ignore
    const res = await connection._rpcRequest('simulateTransaction', args);
    if (res.error) {
        throw new Error('failed to simulate transaction: ' + res.error.message);
    }
    return res.result;
}
async function awaitTransactionSignatureConfirmation(txid, timeout, connection, commitment = 'recent', queryStatus = false) {
    let done = false;
    let status = {
        slot: 0,
        confirmations: 0,
        err: null,
    };
    let subId = 0;
    status = await new Promise(async (resolve, reject) => {
        setTimeout(() => {
            if (done) {
                return;
            }
            done = true;
            console.log('Rejecting for timeout...');
            reject({ timeout: true });
        }, timeout);
        try {
            subId = connection.onSignature(txid, (result, context) => {
                done = true;
                status = {
                    err: result.err,
                    slot: context.slot,
                    confirmations: 0,
                };
                if (result.err) {
                    console.log('Rejected via websocket', result.err);
                    reject(status);
                }
                else {
                    console.log('Resolved via websocket', result);
                    resolve(status);
                }
            }, commitment);
        }
        catch (e) {
            done = true;
            console.error('WS error in setup', txid, e);
        }
        while (!done && queryStatus) {
            // eslint-disable-next-line no-loop-func
            (async () => {
                try {
                    const signatureStatuses = await connection.getSignatureStatuses([
                        txid,
                    ]);
                    status = signatureStatuses && signatureStatuses.value[0];
                    if (!done) {
                        if (!status) {
                            console.log('REST null result for', txid, status);
                        }
                        else if (status.err) {
                            console.log('REST error for', txid, status);
                            done = true;
                            reject(status.err);
                        }
                        else if (!status.confirmations) {
                            console.log('REST no confirmations for', txid, status);
                        }
                        else {
                            console.log('REST confirmation for', txid, status);
                            done = true;
                            resolve(status);
                        }
                    }
                }
                catch (e) {
                    if (!done) {
                        console.log('REST connection error: txid', txid, e);
                    }
                }
            })();
            await utils_1.sleep(2000);
        }
    });
    //@ts-ignore
    if (connection._signatureSubscriptions[subId])
        connection.removeSignatureListener(subId);
    done = true;
    console.log('Returning status', status);
    return status;
}
//# sourceMappingURL=connection.js.map