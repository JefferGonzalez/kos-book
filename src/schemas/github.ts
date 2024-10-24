import z from 'zod'

export const DeleteGitHubInstallationSchema = z.object({
  text: z
    .string()
    .min(1, { message: 'Please enter the text.' })
    .refine((text) => text === 'delete the installation', {
      message: 'Please enter the correct text.'
    })
})

export type DeleteGitHubInstallation = z.TypeOf<
  typeof DeleteGitHubInstallationSchema
>
