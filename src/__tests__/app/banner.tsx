import {render, screen} from '@testing-library/react'
import Landing from '@/app/page';

it('Devuelve los dagtos la API', () => {
    render(<Landing/>)

    expect(screen.getByText('DOCUMENTATION TOOL')).toBeInTheDocument()
});