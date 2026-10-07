import { mount } from 'svelte';
import App from './App.svelte';
import './app.css';

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      },
    });
  }
}

const app = await enableMocking().then(() => {
  return mount(App, { target: document.getElementById('app')! });
});

export default app;