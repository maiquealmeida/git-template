# git-template

Uma ferramenta CLI para clonar repositórios do GitHub e inicializá-los como novos projetos, removendo o histórico de git e configurações originais.

## Funcionalidades

- Clona repositórios do GitHub com histórico reduzido (`--depth 1`)
- Remove automaticamente o remote origin
- Apaga o histórico do git existente
- Inicializa um novo repositório git limpo
- Interface de linha de comando simples e intuitiva

## Instalação

```bash
npm install -g @maiquealmeida/git-template
```

## Uso

### Sintaxe Básica

```bash
git-template <usuario/repositorio> [diretorio-destino]
```

### Exemplos

```bash
# Clona para diretório com nome do repositório
git-template maiquealmeida/template-repo

# Clona para diretório específico
git-template maiquealmeida/template-repo ./meu-projeto
```

### Ajuda

```bash
git-template --help
# ou
git-template -h
```

## O que o script faz

1. **Clona o repositório** usando `git clone --depth 1` para obter apenas o último commit
2. **Remove o remote origin** para desconectar do repositório original
3. **Remove o histórico do git** excluindo a pasta `.git`
4. **Inicializa um novo repositório git** limpo e pronto para uso

## Próximos Passos

Após executar o comando, você verá instruções para:

```bash
cd [diretorio-do-projeto]
# Fazer suas modificações
git add .
git commit -m "Initial commit"
```

## Requisitos

- Node.js >= 14.0.0
- Git instalado no sistema

## Licença

MIT

## Autor

Desenvolvido por Maique Almeida