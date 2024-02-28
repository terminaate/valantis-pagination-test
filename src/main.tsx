import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';

const rootNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(rootNode);

root.render(<App />);
