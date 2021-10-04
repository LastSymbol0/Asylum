import * as anchor from '@project-serum/anchor';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

export const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
);


export const getMetadata = async (
    mint: anchor.web3.PublicKey,
  ): Promise<anchor.web3.PublicKey> => {
    return (
      await anchor.web3.PublicKey.findProgramAddress(
        [
          Buffer.from('metadata'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mint.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID,
      )
    )[0];
  };
  
  export const getMasterEdition = async (
    mint: anchor.web3.PublicKey,
  ): Promise<anchor.web3.PublicKey> => {
    return (
      await anchor.web3.PublicKey.findProgramAddress(
        [
          Buffer.from('metadata'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mint.toBuffer(),
          Buffer.from('edition'),
        ],
        TOKEN_METADATA_PROGRAM_ID,
      )
    )[0];
  };
  
  export const getEditionMarkPda = async (
    mint: anchor.web3.PublicKey,
    edition: number,
  ): Promise<anchor.web3.PublicKey> => {
    const editionNumber = Math.floor(edition / 248);
    return (
      await anchor.web3.PublicKey.findProgramAddress(
        [
          Buffer.from('metadata'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mint.toBuffer(),
          Buffer.from('edition'),
          Buffer.from(editionNumber.toString()),
        ],
        TOKEN_METADATA_PROGRAM_ID,
      )
    )[0];
  };