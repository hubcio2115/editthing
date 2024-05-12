# Editthing

## Contributing

### Setup
To start you'll need:
- `pnpm@9.1.0`
- run `pnpm install`
- copy `.env.local.example` in `./apps/web` and rename it to `.env.local`

### Webhooks
We're using [Mux](https://www.mux.com/) for storing, uploading and preprocessing videos.
For *Mux* to communicate with our app it needs a webhook. But for localdevelopment 
it doesn't have access to our local ip address. To fix that you'll need to forward your port to 
the web.

We recommend [ngrok](https://ngrok.com/) for that. You can also figure it our yourself. :)
