use anchor_lang::prelude::*;
use std::convert::TryInto;

declare_id!("Ec5HRTfsozgfQerig5DTsKqGL3MkZ3jcdohb3qYXwzMN");

#[program]
mod asylum {
use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }

    pub fn initialize_achievements(ctx: Context<InitializeAchievements>, bump: u8) -> ProgramResult {
        let account = &mut ctx.accounts.achievements_account;

        account.achievements = Vec::with_capacity(128);

        Ok(())
    }

    pub fn add_achievement(ctx: Context<UpdateAchievements>, label: String, description: String, game: Pubkey) -> ProgramResult {
        let achievements = &mut ctx.accounts.achievements_account.achievements;

        assert!(achievements.len() < 64, "Exceed achievements limit.");
        let id: u16 = achievements.len().try_into().unwrap();

        achievements.push(Achievement{label: label, description: description, game: game, id: id });
        Ok(())
    }

    pub fn initialize_games_catalog(ctx: Context<InitializeGamesCatalog>, bump: u8) -> ProgramResult {
        let account = &mut ctx.accounts.games_catalog_account;

        account.games = Vec::with_capacity(128);

        Ok(())
    }

    pub fn add_game_to_catalog(ctx: Context<UpdateGamesCatalog>, game: Pubkey) -> ProgramResult {
        let games = &mut ctx.accounts.games_catalog_account.games;

        // TODO: add uniquness check
        assert!(games.len() < 128, "Exceed games limit.");

        games.push(game);
        Ok(())
    }
}

// ---------------- Main ----------------
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 0)]
    pub main_account: Account<'info, AsylumMainAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct AsylumMainAccount {
}

// ----------- Games catalog ------------
#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct InitializeGamesCatalog<'info> {
    #[account(
        init,
        seeds = [b"GamesCatalog".as_ref()],
        bump = bump,
        payer = user,
        space = (32) * 128)]
    pub games_catalog_account: Account<'info, GamesCatalogAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateGamesCatalog<'info> {
    #[account(mut)]
    pub games_catalog_account: Account<'info, GamesCatalogAccount>,
}

#[account]
pub struct GamesCatalogAccount {
    pub games: Vec<Pubkey>,
}

// TODO: rewrite achievements logic as a Master-Print NFTs
// ------------ Achievements ------------
#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct InitializeAchievements<'info> {
    #[account(
        init,
        seeds = [b"Achievements".as_ref()],
        bump = bump,
        payer = user,
        space = (/* id */ 16
        + /* label */ 32
        + /* description */ 64
        + /* game */ 32) * 64)]
    pub achievements_account: Account<'info, AchievementsAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateAchievements<'info> {
    #[account(mut)]
    pub achievements_account: Account<'info, AchievementsAccount>,
}

#[account]
pub struct AchievementsAccount {
    pub achievements: Vec<Achievement>,
}

#[derive(borsh::BorshSerialize)]
#[derive(borsh::BorshDeserialize)]
#[derive(Clone)]
pub struct Achievement {
    // unique id
    pub id: u16,
    // achievement name; 32 symbols max
    pub label: String,
    // readable description; 64 symbols max
    pub description: String,
    // game master NFT addr; zero addr if global
    pub game: Pubkey,
}
