import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Login from "./Login";

describe('Login components',()=>{
    test('test on state change if clicked',()=>{
        render(<Login/>);
        const btnElement= screen.getByRole('button')
        userEvent.click(btnElement);
        const output= screen.getByText('Sign Up');
        expect(output).toBrInTheDocument();
    });
})
