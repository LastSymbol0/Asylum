use anchor_lang::prelude::*;

declare_id!("Ec5HRTfsozgfQerig5DTsKqGL3MkZ3jcdohb3qYXwzMN");

#[program]
mod asylum {
use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}


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
