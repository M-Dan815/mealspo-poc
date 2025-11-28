import styled from "styled-components";

export const Card = styled.div`
	background: var(--surface);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-sm);
	overflow: hidden;
	transition: var(--transition);
`;

export const CardImage = styled.div<{src: string; aspectRatio?: string}>`
	width: 100%;
	aspect-ratio: ${({aspectRatio}) => aspectRatio || "1"};
	background-image: url(${({src}) => src});
	background-size: cover;
	background-position: center;
`;

export const CardContent = styled.div`
	padding: 12px 16px;
`;
