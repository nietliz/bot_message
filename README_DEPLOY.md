# Como fazer Deploy do Bot na Railway

## Passo a Passo:

1. **Acesse [Railway.app](https://railway.app)** e faça login com GitHub

2. **Crie um novo projeto:**
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Escolha o repositório do seu bot

3. **Configure as variáveis de ambiente:**
   - No projeto, vá em "Variables"
   - Adicione:
     - `TOKEN` = seu token do bot Discord
     - `CLIENT_ID` = ID do seu bot
     - `GUILD_ID` = ID do servidor Discord

4. **Configure o comando de start:**
   - Vá em "Settings" > "Deploy"
   - Em "Start Command", coloque: `node index.js`

5. **Deploy automático:**
   - O Railway detecta automaticamente Node.js
   - Faz o deploy automaticamente quando você faz push no GitHub

## Alternativa: Render.com

1. Acesse [Render.com](https://render.com)
2. Crie um "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - Adicione as variáveis de ambiente (TOKEN, CLIENT_ID, GUILD_ID)
5. Deploy!

## Nota Importante:
- Ambos Railway e Render oferecem planos gratuitos
- Railway é geralmente mais fácil para iniciantes
- Render pode ter timeouts no plano gratuito (mas funciona para bots)

