<script lang="ts">
  import { Header } from '@/components/Header';
  import { RoomsTable } from '@/components/RoomsTable';

  let active = 'catalog';
</script>

<Header activeNavId={active} onNavigate={(id) => (active = id)} user={{ name: 'Мария Петрова' }} />

<main style="padding: 16px;">
  {#if active === 'catalog'}
    <RoomsTable />
  {:else}
    <p>Контент вкладки: {active}</p>
  {/if}
</main>