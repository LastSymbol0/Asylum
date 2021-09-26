use anchor_lang::prelude::*;
use std::mem::size_of;

declare_id!("Ec5HRTfsozgfQerig5DTsKqGL3MkZ3jcdohb3qYXwzMN");

#[program]
mod asylum {
use super::*;

    pub fn initialize(ctx: Context<Initialize>, _bump: u8, nickname: String, avatar: Pubkey) -> ProgramResult {
        assert!(nickname.len() < 32, "Nickname is too long.");
        // TODO: add sent minimum rent-extemp logic

        let player_account = &mut ctx.accounts.player_account;

        player_account.nickname = nickname;
        // TODO: add is avatar owner check (or remove avatar set from init)
        player_account.avatar = avatar;
        player_account.games = Vec::with_capacity(100);

        Ok(())
    }

    pub fn update_nickname(ctx: Context<Update>, nickname: String) -> ProgramResult {
        assert!(nickname.len() < 32, "Nickname is too long.");

        let player_account = &mut ctx.accounts.player_account;

        player_account.nickname = nickname;

        Ok(())
    }

    pub fn update_avatar(ctx: Context<Update>, avatar: Pubkey) -> ProgramResult {
        let player_account = &mut ctx.accounts.player_account;

        // TODO: add is owner check
        player_account.avatar = avatar;

        Ok(())
    }

    pub fn add_game(ctx: Context<Update>, game: Pubkey) -> ProgramResult {
        let games = &mut ctx.accounts.player_account.games;

        // TODO: add uniqueness check
        assert!(games.len() < 100, "Exceed games limit.");

        games.push(game);

        Ok(())
    }

    pub fn remove_game(ctx: Context<Update>, game: Pubkey) -> ProgramResult {
        let games = &mut ctx.accounts.player_account.games;

        let game_index = games.iter().position(|x| *x == game).expect("Game not found in library");
        games.swap_remove(game_index);

        Ok(())
    }
}


#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct Initialize<'info> {
    #[account(init, seeds = [user.key.as_ref()], bump = bump, payer = user, space = 32 + size_of::<Pubkey>() + (size_of::<Pubkey>() * 100))]
    pub player_account: Account<'info, PlayerAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub player_account: Account<'info, PlayerAccount>,
}

#[account]
pub struct PlayerAccount {
    // Max len: 32
    pub nickname: String,
    pub avatar: Pubkey,
    // Max len: 100
    pub games: Vec<Pubkey>,
}
