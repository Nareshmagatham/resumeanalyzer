import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
    color: #ffffff;
    min-height: 100vh;
    line-height: 1.6;
  }

  .app-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Card = styled.div`
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid #333;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    background: #555;
    cursor: not-allowed;
    transform: none;
  }
`;

export const DangerButton = styled(Button)`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  
  &:hover {
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }
`;

export const SecondaryButton = styled(Button)`
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  
  &:hover {
    box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(25, 25, 25, 0.8);
  border-radius: 8px;
  overflow: hidden;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #333;
  }

  th {
    background: rgba(40, 40, 40, 0.9);
    font-weight: 600;
    color: #667eea;
  }

  tr:hover {
    background: rgba(50, 50, 50, 0.6);
  }
`;

export const Input = styled.input`
  background: rgba(40, 40, 40, 0.8);
  border: 1px solid #444;
  border-radius: 6px;
  padding: 12px 16px;
  color: white;
  font-size: 14px;
  margin: 0.5rem 0;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 1.8rem;
  color: #4ecdc4;
  margin-bottom: 1rem;
`;