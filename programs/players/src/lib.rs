use anchor_lang::prelude::*;
use std::mem::size_of;

declare_id!("9acXdXcHNvgNiy5J62B5mt2gyZuMQ1fBYaqtdnHcjGkj");

#[program]
mod players {
use super::*;

    pub fn initialize(ctx: Context<Initialize>, _bump: u8, nickname: String, avatar: Pubkey) -> ProgramResult {
        assert!(nickname.len() < 32, "Nickname is too long.");
        // TODO: add sent minimum rent-extemp logic

        let player_account = &mut ctx.accounts.player_account;

        player_account.nickname = nickname;
        // TODO: add is avatar owner check (or remove avatar set from init)
        player_account.avatar = avatar;
        player_account.games = Vec::with_capacity(100);
        player_account.level = 1;
        player_account.exp = 0;
        player_account.achievements = Vec::with_capacity(1000);

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

    pub fn add_achievement(ctx: Context<Update>, achievement_id: u16, exp_to_add: u32) -> ProgramResult {
        let achievements = &mut ctx.accounts.player_account.achievements;

        // TODO: add uniqueness check
        assert!(achievements.len() < 100, "Exceed achievements limit.");

        achievements.push(achievement_id);

        if exp_to_add > 0
        {
            return add_exp(ctx, exp_to_add);
        }

        Ok(())
    }

    pub fn add_exp(ctx: Context<Update>, exp: u32) -> ProgramResult {
        let account = &mut ctx.accounts.player_account;

        if u32::MAX - exp > account.exp
        {
            account.exp += exp;
            let exp_for_next_level = helpers::calculate_exp_for_level(account.level + 1);

            if account.exp >= exp_for_next_level
            {
                account.level +=1;
            }
        }

        Ok(())
    }
}

mod helpers {
    pub fn calculate_exp_for_level(level: u8) -> u32 {
        return u32::from(level) * 100;
    }
}


#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct Initialize<'info> {
    #[account(
        init,
        seeds = [user.key.as_ref()],
        bump = bump,
        payer = user,
        space = /* nickname */ 32
            + /* avatar */ size_of::<Pubkey>()
            + /* games */ (size_of::<Pubkey>() * 100)
            + /* level */ size_of::<u8>()
            + /* exp */ size_of::<u64>()
            + /* achievements */ (size_of::<u16>() * 100))]
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
    pub level: u8,
    pub exp: u32,
    // Max len: 100
    pub achievements: Vec<u16>,
}
