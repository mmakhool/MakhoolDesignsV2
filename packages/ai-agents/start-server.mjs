#!/usr/bin/env node

/**
 * MCP Server Launcher for MakhoolDesigns AI Agents
 * 
 * This script initializes and starts the Model Context Protocol server
 * with the multi-agent development team.
 */

import * as dotenv from 'dotenv';
import { MCPServer } from './dist/mcp-server.js';

// Load environment variables
dotenv.config();

async function startServer() {
  console.log('🚀 Starting MakhoolDesigns AI Agent Team...');
  console.log('   Building your development dream team...\n');

  try {
    const server = new MCPServer();
    
    console.log('🤖 Agent Team Members:');
    console.log('   • Backend Agent - API & Database specialist');
    console.log('   • Frontend Agent - React & UI specialist'); 
    console.log('   • UI/UX Agent - Design & accessibility expert');
    console.log('   • Project Manager Agent - Coordination & planning');
    console.log('   • QA Agent - Quality assurance specialist');
    console.log('   • Testing Agent - Test automation expert');
    console.log('');

    await server.start();
    
    console.log('✅ MCP Server started successfully!');
    console.log('🔗 Ready to collaborate with GitHub Copilot');
    console.log('📊 Server running on stdio transport');
    console.log('');
    console.log('💡 Use with VS Code GitHub Copilot for enhanced AI assistance');
    
  } catch (error) {
    console.error('❌ Failed to start MCP Server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down AI Agent Team...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down AI Agent Team...');
  process.exit(0);
});

// Start the server
startServer().catch((error) => {
  console.error('💥 Critical error starting server:', error);
  process.exit(1);
});
