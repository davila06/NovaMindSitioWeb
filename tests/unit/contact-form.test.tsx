import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from '@/components/shared/ui/ContactForm'

describe('ContactForm', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('muestra errores de validacion si faltan campos requeridos', async () => {
    render(<ContactForm />)

    fireEvent.click(screen.getByRole('button', { name: /enviar solicitud/i }))

    await waitFor(() => {
      expect(document.getElementById('contact-form-error-summary')).toBeInTheDocument()
    })
    expect(screen.getByText(/ingresa un nombre valido/i)).toBeInTheDocument()
  })

  it('envia el formulario y muestra confirmacion en caso exitoso', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true, channel: 'resend', requestId: 'req-123' }),
    })

    render(<ContactForm />)

    fireEvent.change(screen.getByPlaceholderText(/tu nombre/i), { target: { value: 'Juan Perez' } })
    fireEvent.change(screen.getByPlaceholderText(/nombre@empresa.com/i), { target: { value: 'juan@empresa.com' } })
    fireEvent.change(screen.getByLabelText(/interes principal/i), { target: { value: 'MindFlow' } })
    fireEvent.change(screen.getByPlaceholderText(/cuéntanos sobre tu operación/i), {
      target: { value: 'Necesitamos automatizar procesos de seguimiento comercial este trimestre.' },
    })

    fireEvent.click(screen.getByRole('button', { name: /enviar solicitud/i }))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
      )
    })

    expect(await screen.findByText(/solicitud enviada por resend/i)).toBeInTheDocument()
  })
})
