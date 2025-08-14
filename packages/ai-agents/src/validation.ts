import { z } from 'zod';

/**
 * MCP Server Input Validation Schemas
 * 
 * These schemas validate inputs to MCP tools using Zod,
 * following MCP best practices for input validation.
 */

export const AssignTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['api_design', 'ui_design', 'testing', 'code_review', 'feature_planning', 'bug_fix', 'optimization', 'documentation']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  files: z.array(z.string()).default([]),
  context: z.record(z.any()).default({}),
  requiredCapabilities: z.array(z.string()).default([])
});

export const CoordinateAgentsSchema = z.object({
  task: z.object({
    title: z.string(),
    description: z.string(),
    type: z.string()
  }),
  agentIds: z.array(z.string()).min(1, 'At least one agent ID is required'),
  collaborationType: z.enum(['sequential', 'parallel', 'review'])
});

export const PlanFeatureSchema = z.object({
  featureName: z.string().min(1, 'Feature name is required'),
  requirements: z.string().min(1, 'Requirements are required'),
  scope: z.string().optional(),
  constraints: z.string().optional()
});

export const ReviewCodeSchema = z.object({
  files: z.array(z.string()).min(1, 'At least one file is required'),
  reviewType: z.enum(['quality', 'security', 'performance', 'accessibility', 'general']).default('general'),
  context: z.string().optional()
});

export const GetAgentInfoSchema = z.object({
  agentId: z.string().optional()
});

/**
 * Utility function to validate MCP tool inputs
 */
export function validateInput<T>(schema: z.ZodSchema<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) {
    const errors = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    throw new Error(`Invalid input: ${errors}`);
  }
  return result.data;
}

export type AssignTaskInput = z.infer<typeof AssignTaskSchema>;
export type CoordinateAgentsInput = z.infer<typeof CoordinateAgentsSchema>;
export type PlanFeatureInput = z.infer<typeof PlanFeatureSchema>;
export type ReviewCodeInput = z.infer<typeof ReviewCodeSchema>;
export type GetAgentInfoInput = z.infer<typeof GetAgentInfoSchema>;
