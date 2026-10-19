O Front.zip foi extraído e o projeto está montado na pasta Frontend Clarify na Área de Trabalho, alinhado ao protótipo do Figma (site publicado).

O que foi feito
Extração do Front.zip (export do Figma Make).
Cópia de todos os arquivos para: C:\Users\ntsta\OneDrive\Área de Trabalho\Frontend Clarify
npm install — dependências instaladas.
Servidor de desenvolvimento rodando em http://localhost:5173/.
Estrutura do projeto
Arquivo	Função
src/App.tsx
Telas Input + Histórico, componentes e interações
src/index.css
Design system (cores, tipografia, responsivo)
src/main.tsx
Bootstrap do React
package.json
Scripts e dependências
vite.config.ts
Vite + Tailwind + plugins do Figma Make
index.html
Shell HTML
tsconfig.json
TypeScript
Também há public/favicon.svg e a pasta .figma/make/ (metadados do Figma Make).

Como rodar no terminal

cd "C:\Users\ntsta\OneDrive\Área de Trabalho\Frontend Clarify"
npm install
$env:PORT="5173"
npm run dev
Abra http://localhost:5173/. Sem PORT, o Vite usa a porta 8443 (padrão do Figma Make).

Verificação
Confirmei localmente:

Input — “Cadastre uma reunião”, formulário, upload e arquivos de exemplo.
Histórico — lista de reuniões, transcrição com destaques e painel de sentimento.
Isso corresponde ao protótipo publicado.

A pasta Front-extracted na Área de Trabalho é só cópia da extração; o projeto de trabalho é Frontend Clarify. Posso remover a pasta duplicada ou abrir o workspace no Cursor em Frontend Clarify se quiser.
