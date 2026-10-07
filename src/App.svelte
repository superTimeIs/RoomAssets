<script lang="ts">
  import { Header } from '@/components/Header';
  import { Button } from '@/components/Button';

  let active = 'catalog';
  let count = 0;
</script>

<Header activeNavId={active} onNavigate={(id) => (active = id)} user={{ name: 'Мария Петрова' }} />

<main style="padding: 16px; display: grid; gap: 16px;">
  <h1>Vite + Svelte</h1>
  <Button on:click={() => count++}>Кликнули {count} раз</Button>
  <Button variant="secondary" size="lg" disabled>Большая неактивная</Button>
  <p>Контент вкладки: {active}</p>
</main>
