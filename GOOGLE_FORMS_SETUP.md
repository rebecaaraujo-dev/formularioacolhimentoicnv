# 📝 Guia de Integração com Google Forms

Este guia mostra como conectar seu formulário HTML ao Google Forms para armazenar as respostas.

## 🎯 Passo a Passo

### 1️⃣ Criar o Google Form

1. Acesse [Google Forms](https://forms.google.com)
2. Clique em **"+ Blank"** ou **"+ Em branco"** para criar um novo formulário
3. Dê um nome ao formulário (ex: "Formulário Natal 2025")

### 2️⃣ Adicionar os Campos no Google Forms

Adicione os seguintes campos **na mesma ordem**:

#### Seção 1: Dados Pessoais
1. **Nome Completo** - Resposta curta
2. **Telefone** - Resposta curta

#### Seção 2: Visitas
3. **Você deseja receber uma visita?** - Múltipla escolha
   - Opções: Sim, Não
4. **Endereço para Visita** - Resposta curta
6. **Complemento (Apto, Sala, etc)** - Resposta curta
7. **Qual o melhor dia para visita?** - Resposta curta
8. **Observações sobre a visita** - Parágrafo

#### Seção 3: Pedido de Oração
9. **Você tem um pedido de oração?** - Múltipla escolha
   - Opções: Sim, Não
10. **Qual é o seu pedido de oração?** - Parágrafo

#### Seção 4: Casa de Paz
12. **Você deseja receber o projeto Casa de Paz?** - Múltipla escolha
    - Opções: Sim, Não
13. **Endereço (Casa de Paz)** - Resposta curta
14. **Complemento (Casa de Paz)** - Resposta curta
15. **Qual o melhor dia para visita? (Casa de Paz)** - Resposta curta
16. **Observações (Casa de Paz)** - Parágrafo

### 3️⃣ Obter o Form ID

1. No Google Forms, clique em **"Enviar"** (botão no canto superior direito)
2. Na janela que abrir, você verá um link como:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSe_XXXXXXXXXXXXXXX/viewform
   ```
3. Copie a parte entre `/d/e/` e `/viewform` - esse é o seu **Form ID**

### 4️⃣ Obter os Entry IDs

1. No Google Forms, clique nos **3 pontos (⋮)** no canto superior direito
2. Selecione **"Obter link pré-preenchido"** ou **"Get pre-filled link"**
3. Preencha TODOS os campos do formulário com textos identificadores:
   - Nome Completo: `NOME`
   - Email: `EMAIL`
   - Telefone: `TELEFONE`
   - E assim por diante...
4. Clique em **"Obter link"** ou **"Get link"**
5. Copie o link gerado
6. Cole em um editor de texto (Notepad, VS Code, etc.)

O link terá este formato:
```
https://docs.google.com/forms/d/e/1FAIpQLSe.../viewform?
entry.123456789=NOME&
entry.987654321=EMAIL&
entry.555666777=TELEFONE&
...
```

7. Para cada campo, anote o número do `entry` correspondente:
   - Nome Completo: `entry.123456789`
   - Email: `entry.987654321`
   - Telefone: `entry.555666777`
   - etc.

### 5️⃣ Atualizar o arquivo script.js

1. Abra o arquivo `script.js` no VS Code
2. No topo do arquivo, encontre as linhas:

```javascript
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
```

3. Substitua `YOUR_FORM_ID` pelo Form ID que você copiou no **Passo 3**

4. Mais abaixo, encontre o objeto `FIELD_MAPPING`:

```javascript
const FIELD_MAPPING = {
    name: 'entry.1234567890',
    email: 'entry.0987654321',
    // ... etc
};
```

5. Substitua cada `entry.XXXXXXXXXX` pelo Entry ID correto que você anotou no **Passo 4**

**Exemplo:**
```javascript
const FIELD_MAPPING = {
    name: 'entry.123456789',                    // Substitua pelo entry do campo Nome
    email: 'entry.987654321',                   // Substitua pelo entry do campo Email
    phone: 'entry.555666777',                   // Substitua pelo entry do campo Telefone
    // ... continue para todos os campos
};
```

### 6️⃣ Configurar CORS (opcional mas recomendado)

O Google Forms pode bloquear envios diretos do seu site por questões de segurança (CORS). Para resolver:

**Opção A: Usar extensão do navegador (somente para testes)**
- Instale uma extensão CORS no navegador (ex: "Allow CORS")
- ⚠️ Use apenas para testes locais

**Opção B: Hospedar em um servidor**
- Faça deploy do seu site em um servidor web (GitHub Pages, Netlify, Vercel)
- O Google Forms aceita melhor requisições de domínios públicos

### 7️⃣ Testar o Formulário

1. Abra o arquivo `index.html` no navegador
2. Preencha todos os campos obrigatórios
3. Envie o formulário
4. Verifique se aparece a mensagem de sucesso
5. Confira se a resposta foi registrada no Google Forms (aba "Respostas")

## 🔍 Verificação Rápida

Abra o arquivo `get-form-ids.html` no navegador para ver instruções visuais detalhadas.

## ⚠️ Problemas Comuns

### "Erro ao enviar o formulário"
- Verifique se o Form ID está correto
- Verifique se todos os Entry IDs estão corretos
- Verifique se há erros no Console do navegador (F12)

### "CORS error"
- Teste hospedando o site em um servidor web
- Use uma extensão CORS temporariamente para testes

### "Resposta não aparece no Google Forms"
- Confirme que os Entry IDs correspondem exatamente aos campos
- Verifique se não há espaços extras nos Entry IDs

## 📞 Suporte

Se tiver dúvidas, abra o Console do navegador (F12) e veja se há mensagens de erro que possam ajudar a identificar o problema.

## ✅ Checklist Final

- [ ] Google Form criado com todos os campos
- [ ] Form ID copiado e colado no script.js
- [ ] Todos os Entry IDs copiados e colados no FIELD_MAPPING
- [ ] Arquivo salvo
- [ ] Formulário testado
- [ ] Resposta aparece no Google Forms

---

**Boa sorte! 🎄**
