import styled from "styled-components";

export const Button = styled.button`
    padding: 0 1rem;
    background-color: var(--colors-ui-base);
    box-shadow: var(--shadow);
    /* line-height: 2.5rem; */
    height: 40px;
    border-radius: var(--radii);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    color: var(--colors-text);
    cursor: pointer;
`