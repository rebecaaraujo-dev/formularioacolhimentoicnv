# Formulário Natal 2025

Um formulário moderno, responsivo e funcional que se integra com Google Forms.

## 🎄 Características

✨ **Design Moderno e Responsivo**
- Interface limpa e intuitiva
- Totalmente responsiva (mobile-first)
- Animações suaves e transições

🔒 **Validação Robusta**
- Validação em tempo real
- Mensagens de erro claras
- Suporte a múltiplos tipos de entrada

📨 **Integração Google Forms**
- Envia dados diretamente para Google Forms
- Sem necessidade de backend
- Armazenamento seguro na nuvem

⚡ **Performance**
- Carregamento rápido
- Sem dependências externas
- Código otimizado

## 🚀 Como Usar

### 1. Crie um Google Form

1. Acesse [Google Forms](https://forms.google.com)
2. Clique em "+" para criar um novo formulário
3. Adicione os campos:
   - **Nome Completo** (Texto curto)
   - **Email** (Texto curto)
   - **Telefone** (Texto curto)
   - **Mensagem** (Parágrafo)

### 2. Obtenha o ID do Formulário

1. Clique em "Enviar" (ícone de compartilhamento)
2. Copie o URL do formulário
3. Extraia o ID: `https://docs.google.com/forms/d/YOUR_FORM_ID/edit`

### 3. Obtenha os IDs dos Campos

**Método 1: Através do modo visualização**
1. Abra o formulário em modo de visualização (ícone de olho)
2. Clique com botão direito > Inspecionar elemento
3. Procure por `name="entry_XXXXXXXXX"` em cada campo
4. Anote esses IDs

**Método 2: Através do URL (alternativa)**
1. Envie o formulário com dados fictícios
2. Observe a URL de resposta que contém os entry IDs

### 4. Configure o Arquivo script.js

Abra `script.js` e atualize:

```javascript
// Linha 4 - Substitua YOUR_FORM_ID
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/YOUR_FORM_ID/formResponse';

// Linhas 7-12 - Substitua com os IDs dos seus campos
const FIELD_MAPPING = {
    name: 'entry_1234567890',      // Seu ID do campo Nome
    email: 'entry_0987654321',     // Seu ID do campo Email
    phone: 'entry_1122334455',     // Seu ID do campo Telefone
    message: 'entry_5566778899',   // Seu ID do campo Mensagem
};
```

### 5. Teste o Formulário

1. Abra `index.html` em um navegador
2. Preencha os campos de teste
3. Clique em "Enviar Formulário"
4. Verifique os dados no seu Google Form

## 📁 Estrutura do Projeto

```
formularioNatal2025/
├── index.html          # Estrutura HTML do formulário
├── styles.css          # Estilos e design
├── script.js           # Lógica e integração
└── README.md           # Este arquivo
```

## 🎨 Personalizações

### Alterar Cores

No `styles.css`, procure por `:root` e altere as cores:

```css
:root {
    --primary-color: #d4af37;      /* Cor principal (ouro) */
    --secondary-color: #c41e3a;    /* Cor secundária (vermelho) */
    --success-color: #28a745;      /* Cor de sucesso (verde) */
    --error-color: #dc3545;        /* Cor de erro (vermelho) */
}
```

### Alterar Campos do Formulário

Para adicionar ou remover campos:

1. Edite `index.html` - adicione/remova `<div class="form-group">`
2. Edite `script.js`:
   - Adicione validação em `validateForm()`
   - Adicione o novo campo em `FIELD_MAPPING`
   - Adicione lógica de limpeza de erro

### Alterar Mensagens

No `index.html`, procure por:
- `Formulário Natal 2025` - título
- `Preencha o formulário abaixo` - subtítulo
- Rótulos dos campos
- Mensagens de sucesso/erro

## 🔒 Segurança

✅ **CORS Habilitado** - Usa modo `no-cors` para evitar problemas de CORS
✅ **Validação Cliente** - Reduz dados inválidos antes do envio
✅ **Sem Exposição de Dados** - Google Forms mantém segurança dos dados

## 📱 Responsividade

O formulário é totalmente responsivo:
- **Desktop**: Layout ótimo em telas grandes
- **Tablet**: Ajustado para telas médias
- **Mobile**: Perfeitamente otimizado para celulares

## 🐛 Troubleshooting

### "Formulário não está enviando"
- Verifique se o URL do Google Form está correto
- Confirme que os entry IDs estão corretos
- Verifique o console (F12) para erros

### "Campos de entrada muito pequenos no mobile"
- Isso é intencional - evita zoom indesejado no iOS

### "Validação não está funcionando"
- Abra o console (F12) e procure por erros
- Verifique se os IDs dos campos HTML estão corretos

## 📊 Próximas Etapas (Opcional)

1. **Deploy Online** - Hospede em GitHub Pages, Netlify ou Vercel
2. **Email de Confirmação** - Configure notificações do Google Forms
3. **Temas** - Crie diferentes versões com estilos diferentes
4. **Análise** - Use o Google Forms Analytics para ver respostas

## 📝 Licença

Livre para usar e modificar conforme necessário.

## 💬 Suporte

Se tiver dúvidas, verifique:
1. Se o Google Form está compartilhado corretamente
2. Se os entry IDs estão corretos
3. O console do navegador para mensagens de erro

---

**Desenvolvido com ❤️ para Natal 2025**
