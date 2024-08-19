import { z } from 'zod'

export const outputSchema = z.object({
  // note: z.string().describe('Describe what you just did and the process of generating the artifact.'),
  template: z.string().describe('Name of the template used to generate the artifact.'),
  // template_ready: z.boolean().describe('Detect if finished identifying the template.'),
  title: z.string().describe('Short title of the artifact. Max 5 characters.'),
  description: z.string().describe('Short description of the artifact. Max 10 characters.'),
  additional_dependencies: z.array(z.string()).describe('Additional dependencies required by the artifact. Do not include dependencies that are already included in the template.'),
  has_additional_dependencies: z.boolean().describe('Detect if additional dependencies that are not included in the template are required by the artifact.'),
  install_dependencies_command: z.string().describe('Command to install additional dependencies required by the artifact.'),
  // install_dependencies_ready: z.boolean().describe('Detect if finished identifying additional dependencies.'),
  port: z.number().nullable().describe('Port number used by the resulted artifact. Null when no ports are exposed.'),
  code: z.array(z.object({
    file_name: z.string().describe('Name of the file.'),
    file_path: z.string().describe('Relative path to the file, including the file name.'),
    file_content: z.string().describe('Content of the file.'),
    // file_finished: z.boolean().describe('Detect if finished generating the file.'),
  })),
  // code_finished: z.boolean().describe('Detect if finished generating the code.'),
  // error: z.string().optional().describe('Error message if the artifact is not valid.'),
})