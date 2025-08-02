#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  const repoArg = args[0];
  let destDir = args[1];

  // Validar formato do repositório
  if (!repoArg || !repoArg.includes('/')) {
    console.error('❌ Erro: Formato do repositório inválido. Use: usuario/repositorio');
    process.exit(1);
  }

  const [githubUser, repoName] = repoArg.split('/');
  
  if (!githubUser || !repoName) {
    console.error('❌ Erro: Nome de usuário ou repositório não pode estar vazio');
    process.exit(1);
  }

  // Se diretório não foi especificado, usar nome do repositório
  if (!destDir) {
    destDir = `./${repoName}`;
  }

  // Verificar se diretório já existe
  if (fs.existsSync(destDir)) {
    console.error(`❌ Erro: O diretório '${destDir}' já existe`);
    process.exit(1);
  }

  try {
    console.log(`🔄 Clonando repositório ${repoArg}...`);
    
    // Executar git clone
    const cloneUrl = `https://github.com/${githubUser}/${repoName}`;
    execSync(`git clone --depth 1 ${cloneUrl} "${destDir}"`, { stdio: 'inherit' });
    
    console.log(`📁 Entrando no diretório ${destDir}...`);
    
    // Entrar no diretório e executar comandos
    process.chdir(destDir);
    
    console.log('🔗 Removendo origin remoto...');
    execSync('git remote remove origin', { stdio: 'inherit' });
    
    console.log('🗑️  Removendo histórico do git...');
    execSync('rm -rf .git', { stdio: 'inherit' });
    
    console.log('🎉 Inicializando novo repositório git...');
    execSync('git init', { stdio: 'inherit' });
    
    console.log(`✅ Projeto clonado com sucesso em: ${path.resolve(destDir)}`);
    console.log('');
    console.log('Próximos passos:');
    console.log(`  cd ${destDir}`);
    console.log('  # Fazer suas modificações');
    console.log('  git add .');
    console.log('  git commit -m "Initial commit"');
    
  } catch (error) {
    console.error('❌ Erro durante a execução:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
🚀 project-clone - Clone e inicialize projetos do GitHub

Uso:
  npx project-clone <usuario/repositorio> [diretorio-destino]

Argumentos:
  usuario/repositorio    Nome do usuário e repositório do GitHub
  diretorio-destino     Diretório onde o projeto será criado (opcional)
                        Por padrão, usa o nome do repositório

Exemplos:
  npx project-clone maiquealmeida/template-repo
  npx project-clone maiquealmeida/template-repo ./meu-projeto
  npx project-clone facebook/react ./meu-react-app

O que o script faz:
  1. Clona o repositório com --depth 1
  2. Remove o remote origin
  3. Remove o histórico do git (.git)
  4. Inicializa um novo repositório git

Opções:
  --help, -h            Mostra esta ajuda
`);
}

if (require.main === module) {
  main();
}

module.exports = { main };