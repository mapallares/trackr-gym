import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    'postgres', 
    'postgres.sgfkrumwaockfrgnyaey', 
    'ZBsaBnwx7La6Sz2RqgH9SVnvcjuTE3b2gfq', 
    {
    host: 'aws-0-us-west-1.pooler.supabase.com',
    dialect: 'postgres'
})