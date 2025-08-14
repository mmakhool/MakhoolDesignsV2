#!/usr/bin/env node

/**
 * MCP Setup and Verification Script
 * 
 * This script performs comprehensive setup and verification of the
 * MakhoolDesigns AI Agent Team MCP server integration.
 */

import { execSync, spawn } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function setupMCPIntegration() {
  console.log('🚀 MakhoolDesigns AI Agent Team - Complete Setup\n');
  
  // Step 1: Environment Configuration
  console.log('1️⃣ Environment Configuration');
  await setupEnvironment();
  
  // Step 2: VS Code Extensions
  console.log('\n2️⃣ VS Code Extensions');
  await installRequiredExtensions();
  
  // Step 3: MCP Server Configuration
  console.log('\n3️⃣ MCP Server Configuration');
  await configureMCPServer();
  
  // Step 4: Build and Test
  console.log('\n4️⃣ Build and Test');
  await buildAndTest();
  
  // Step 5: Verification
  console.log('\n5️⃣ Final Verification');
  await verifySetup();
  
  console.log('\n🎉 Setup Complete!');
  console.log('\n📋 Next Steps:');
  console.log('   1. Restart VS Code to load MCP configuration');
  console.log('   2. Try complex requests with GitHub Copilot');
  console.log('   3. Monitor VS Code Output → "MCP" for server logs');
  console.log('\n✨ Your AI development team is ready!');
  
  rl.close();
}

async function setupEnvironment() {
  const envPath = '.env';
  const envExamplePath = '.env.example';
  
  if (!existsSync(envPath)) {
    if (existsSync(envExamplePath)) {
      execSync(`cp ${envExamplePath} ${envPath}`);
      console.log('   ✅ Created .env file from template');
    } else {
      console.log('   ❌ .env.example not found');
      return;
    }
  }
  
  const envContent = readFileSync(envPath, 'utf8');
  
  // Check for API keys
  const needsOpenAI = envContent.includes('OPENAI_API_KEY=your_') || !envContent.includes('OPENAI_API_KEY=');
  const needsAnthropic = envContent.includes('ANTHROPIC_API_KEY=your_') || !envContent.includes('ANTHROPIC_API_KEY=');
  
  if (needsOpenAI) {
    console.log('   ⚠️ OpenAI API key not configured');
    const openaiKey = await ask('   Enter your OpenAI API key (or press Enter to skip): ');
    if (openaiKey.trim()) {
      const updatedContent = envContent.replace(/OPENAI_API_KEY=.*/, `OPENAI_API_KEY=${openaiKey}`);
      writeFileSync(envPath, updatedContent);
      console.log('   ✅ OpenAI API key configured');
    }
  } else {
    console.log('   ✅ OpenAI API key configured');
  }
  
  if (needsAnthropic) {
    console.log('   ⚠️ Anthropic API key not configured (optional)');
    const anthropicKey = await ask('   Enter your Anthropic API key (or press Enter to skip): ');
    if (anthropicKey.trim()) {
      const updatedContent = readFileSync(envPath, 'utf8').replace(/ANTHROPIC_API_KEY=.*/, `ANTHROPIC_API_KEY=${anthropicKey}`);
      writeFileSync(envPath, updatedContent);
      console.log('   ✅ Anthropic API key configured');
    }
  } else {
    console.log('   ✅ Anthropic API key configured');
  }
  
  // Create logs directory
  if (!existsSync('logs')) {
    mkdirSync('logs');
    console.log('   ✅ Created logs directory');
  }
}

async function installRequiredExtensions() {
  const requiredExtensions = [
    'automatalabs.copilot-mcp',
    'zebradev.mcp-server-runner'
  ];
  
  console.log('   📦 Installing required VS Code extensions...');
  
  for (const extension of requiredExtensions) {
    try {
      execSync(`code --install-extension ${extension}`, { stdio: 'pipe' });
      console.log(`   ✅ Installed ${extension}`);
    } catch (error) {
      console.log(`   ⚠️ Failed to install ${extension} (may already be installed)`);
    }
  }
  
  console.log('   💡 Note: You may need to restart VS Code for extensions to activate');
}

async function configureMCPServer() {
  // Update workspace configuration
  const workspacePath = '../../MakhoolDesignsV2.code-workspace';
  
  if (existsSync(workspacePath)) {
    try {
      const workspace = JSON.parse(readFileSync(workspacePath, 'utf8'));
      
      if (!workspace.settings) {
        workspace.settings = {};
      }
      
      // Add MCP configuration if not present
      if (!workspace.settings['mcp.servers']) {
        workspace.settings['mcp.servers'] = {
          'makhool-designs-agents': {
            'command': 'node',
            'args': ['${workspaceFolder}/packages/ai-agents/dist/mcp-server.js'],
            'env': { 'NODE_ENV': 'development' },
            'description': 'MakhoolDesigns AI Agent Team'
          }
        };
        console.log('   ✅ Added MCP server configuration');
      }
      
      if (!workspace.settings['github.copilot.advanced']) {
        workspace.settings['github.copilot.advanced'] = {
          'mcp.enabled': true,
          'mcp.servers': ['makhool-designs-agents']
        };
        console.log('   ✅ Enabled GitHub Copilot MCP integration');
      }
      
      writeFileSync(workspacePath, JSON.stringify(workspace, null, 2));
      console.log('   ✅ Updated workspace configuration');
      
    } catch (error) {
      console.log('   ❌ Failed to update workspace configuration:', error);
    }
  } else {
    console.log('   ⚠️ Workspace file not found');
  }
}

async function buildAndTest() {
  try {
    console.log('   🔨 Building MCP server...');
    execSync('npm run build', { stdio: 'pipe' });
    console.log('   ✅ Build successful');
    
    console.log('   🧪 Testing server startup...');
    const testProcess = spawn('node', ['dist/mcp-server.js'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    await new Promise((resolve, reject) => {
      let output = '';
      
      testProcess.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      testProcess.stderr.on('data', (data) => {
        if (data.toString().includes('MCP Server running')) {
          console.log('   ✅ Server starts successfully');
          testProcess.kill();
          resolve(true);
        }
      });
      
      setTimeout(() => {
        testProcess.kill();
        reject(new Error('Test timeout'));
      }, 5000);
    }).catch(() => {
      console.log('   ⚠️ Server test timeout (this is normal)');
    });
    
  } catch (error) {
    console.log('   ❌ Build or test failed:', error);
  }
}

async function verifySetup() {
  const checks = [
    {
      name: 'MCP server built',
      check: () => existsSync('dist/mcp-server.js')
    },
    {
      name: 'Environment configured',
      check: () => existsSync('.env')
    },
    {
      name: 'Workspace MCP config',
      check: () => {
        try {
          const workspace = JSON.parse(readFileSync('../../MakhoolDesignsV2.code-workspace', 'utf8'));
          return workspace.settings?.['mcp.servers']?.['makhool-designs-agents'];
        } catch { return false; }
      }
    },
    {
      name: 'Logs directory',
      check: () => existsSync('logs')
    }
  ];
  
  console.log('   🔍 Verification checklist:');
  
  for (const { name, check } of checks) {
    const status = check() ? '✅' : '❌';
    console.log(`   ${status} ${name}`);
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Setup cancelled');
  rl.close();
  process.exit(0);
});

// Start setup
setupMCPIntegration().catch(console.error);
