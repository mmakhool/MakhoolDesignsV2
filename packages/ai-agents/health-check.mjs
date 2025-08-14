#!/usr/bin/env node

/**
 * MCP Server Health Check and Diagnostics
 * 
 * This script performs comprehensive health checks on the MCP server
 * and validates GitHub Copilot integration readiness.
 */

import { spawn } from 'child_process';
import { existsSync, readFileSync } from 'fs';

async function runHealthCheck() {
  console.log('🏥 MakhoolDesigns MCP Server - Health Check\n');
  
  const results = {
    server: false,
    configuration: false,
    resources: false,
    prompts: false,
    tools: false,
    environment: false
  };

  // 1. Server Startup Test
  console.log('1️⃣ Testing MCP Server Startup...');
  try {
    const serverProcess = spawn('node', ['dist/mcp-server.js'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const initRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'health-check', version: '1.0.0' }
      }
    };

    serverProcess.stdin.write(JSON.stringify(initRequest) + '\n');

    await new Promise((resolve, reject) => {
      let hasResponse = false;
      
      serverProcess.stdout.on('data', (data) => {
        const response = data.toString();
        if (response.includes('capabilities') && response.includes('tools')) {
          console.log('   ✅ Server startup successful');
          console.log('   ✅ MCP capabilities declared');
          results.server = true;
          hasResponse = true;
          serverProcess.kill();
          resolve(true);
        }
      });

      setTimeout(() => {
        if (!hasResponse) {
          console.log('   ❌ Server startup timeout');
          serverProcess.kill();
          resolve(false);
        }
      }, 3000);
    });
  } catch (error) {
    console.log('   ❌ Server startup failed:', error.message);
  }

  // 2. Test Resources
  console.log('\n2️⃣ Testing Resource Handlers...');
  try {
    const serverProcess = spawn('node', ['dist/mcp-server.js'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const resourceRequest = {
      jsonrpc: '2.0',
      id: 2,
      method: 'resources/list'
    };

    setTimeout(() => {
      serverProcess.stdin.write(JSON.stringify(resourceRequest) + '\n');
    }, 100);

    await new Promise((resolve) => {
      serverProcess.stdout.on('data', (data) => {
        const response = data.toString();
        if (response.includes('resources') && response.includes('uri')) {
          console.log('   ✅ Resource handlers working');
          results.resources = true;
        }
        serverProcess.kill();
        resolve(true);
      });

      setTimeout(() => {
        console.log('   ⚠️ Resource test timeout (may still work)');
        serverProcess.kill();
        resolve(false);
      }, 2000);
    });
  } catch (error) {
    console.log('   ❌ Resource test failed:', error.message);
  }

  // 3. Test Prompts
  console.log('\n3️⃣ Testing Prompt Handlers...');
  try {
    const serverProcess = spawn('node', ['dist/mcp-server.js'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const promptRequest = {
      jsonrpc: '2.0',
      id: 3,
      method: 'prompts/list'
    };

    setTimeout(() => {
      serverProcess.stdin.write(JSON.stringify(promptRequest) + '\n');
    }, 100);

    await new Promise((resolve) => {
      serverProcess.stdout.on('data', (data) => {
        const response = data.toString();
        if (response.includes('prompts') && (response.includes('analyze_task') || response.includes('plan_architecture'))) {
          console.log('   ✅ Prompt handlers working');
          results.prompts = true;
        }
        serverProcess.kill();
        resolve(true);
      });

      setTimeout(() => {
        console.log('   ⚠️ Prompt test timeout (may still work)');
        serverProcess.kill();
        resolve(false);
      }, 2000);
    });
  } catch (error) {
    console.log('   ❌ Prompt test failed:', error.message);
  }

  // 4. Test Tools
  console.log('\n4️⃣ Testing Tool Handlers...');
  try {
    const serverProcess = spawn('node', ['dist/mcp-server.js'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const toolRequest = {
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/list'
    };

    setTimeout(() => {
      serverProcess.stdin.write(JSON.stringify(toolRequest) + '\n');
    }, 100);

    await new Promise((resolve) => {
      serverProcess.stdout.on('data', (data) => {
        const response = data.toString();
        if (response.includes('tools') && response.includes('assign_task')) {
          console.log('   ✅ Tool handlers working');
          results.tools = true;
        }
        serverProcess.kill();
        resolve(true);
      });

      setTimeout(() => {
        console.log('   ⚠️ Tool test timeout (may still work)');
        serverProcess.kill();
        resolve(false);
      }, 2000);
    });
  } catch (error) {
    console.log('   ❌ Tool test failed:', error.message);
  }

  // 5. Configuration Check
  console.log('\n5️⃣ Checking VS Code Configuration...');
  try {
    const workspaceFile = '../../MakhoolDesignsV2.code-workspace';
    if (existsSync(workspaceFile)) {
      const workspace = JSON.parse(readFileSync(workspaceFile, 'utf8'));
      
      if (workspace.settings?.['mcp.servers']?.['makhool-designs-agents']) {
        console.log('   ✅ MCP server registered in workspace');
        
        if (workspace.settings?.['github.copilot.advanced']?.['mcp.enabled']) {
          console.log('   ✅ GitHub Copilot MCP integration enabled');
          results.configuration = true;
        } else {
          console.log('   ❌ GitHub Copilot MCP integration not enabled');
        }
      } else {
        console.log('   ❌ MCP server not found in workspace settings');
      }
    } else {
      console.log('   ❌ Workspace file not found');
    }
  } catch (error) {
    console.log('   ❌ Configuration check failed:', error.message);
  }

  // 6. Environment Check
  console.log('\n6️⃣ Checking Environment...');
  try {
    if (existsSync('.env')) {
      const envContent = readFileSync('.env', 'utf8');
      
      if (envContent.includes('OPENAI_API_KEY=') && !envContent.includes('OPENAI_API_KEY=your_')) {
        console.log('   ✅ OpenAI API key configured');
        results.environment = true;
      } else {
        console.log('   ⚠️ OpenAI API key not configured');
      }

      if (envContent.includes('ANTHROPIC_API_KEY=') && !envContent.includes('ANTHROPIC_API_KEY=your_')) {
        console.log('   ✅ Anthropic API key configured');
      } else {
        console.log('   ⚠️ Anthropic API key not configured (optional)');
      }
    } else {
      console.log('   ❌ .env file not found');
    }
  } catch (error) {
    console.log('   ❌ Environment check failed:', error.message);
  }

  // Summary
  console.log('\n📊 Health Check Summary:');
  const passed = Object.values(results).filter(Boolean).length;
  const total = Object.keys(results).length;
  
  console.log(`   Score: ${passed}/${total} components healthy`);
  
  if (passed >= 4) {
    console.log('   🎉 MCP Server is ready for GitHub Copilot!');
  } else if (passed >= 2) {
    console.log('   ⚠️ MCP Server partially functional - review failed checks');
  } else {
    console.log('   ❌ MCP Server needs attention - multiple components failing');
  }

  console.log('\n🚀 Next Steps:');
  if (!results.environment) {
    console.log('   1. Add API keys to .env file');
  }
  if (!results.configuration) {
    console.log('   2. Restart VS Code to load MCP configuration');
  }
  console.log('   3. Try complex requests with GitHub Copilot');
  console.log('   4. Monitor VS Code Output → "MCP" for server logs');
}

// Run health check
runHealthCheck().catch(console.error);
