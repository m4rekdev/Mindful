import { config } from 'dotenv';
config({ path: '.env' });

import OAuthClient from 'disco-oauth';
const client = new OAuthClient(process.env.OAUTH_ID, process.env.OAUTH_SECRET);

client.setRedirect(`${process.env.DASHBOARD_URL}/auth`);
client.setScopes('identify', 'guilds');

export default client;