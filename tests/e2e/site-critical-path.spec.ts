import { expect, test } from '@playwright/test'

test.describe('critical site paths', () => {
  test('home carga y permite navegar a contacto', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /transformamos operaciones criticas/i })).toBeVisible()

    await page.getByRole('link', { name: /solicitar demo/i }).first().click()
    await expect(page).toHaveURL(/\/contacto$/)
    await expect(page.getByRole('heading', { name: /hablemos de tu siguiente salto digital/i })).toBeVisible()
  })

  test('formulario de contacto renderiza campos criticos de captura', async ({ page }) => {
    await page.goto('/contacto')

    await expect(page.getByLabel('Nombre')).toBeVisible()
    await expect(page.getByLabel('Correo empresarial')).toBeVisible()
    await expect(page.getByLabel('Interes principal')).toBeVisible()
    await expect(page.getByLabel('Mensaje')).toBeVisible()
    await expect(page.getByRole('button', { name: /enviar solicitud/i })).toBeVisible()
  })
})
