import { decodeMetadata, getMetadata } from 'oyster-common';
import * as anchor from '@project-serum/anchor';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

export const fetchNft = async (connection: Connection, mint: PublicKey) => {
    const metaAddress = await getMetadata(mint.toString());
    const buffer = await connection.getAccountInfo(new PublicKey(metaAddress))

    if (!buffer)
        throw Error("getAccountInfo returns invalid data")

    const metadata = decodeMetadata(buffer.data)

    const resp = await fetch(metadata.data.uri)
    const json = await resp.json()

    return {
        ...metadata,
        jsonData: json
    }
}