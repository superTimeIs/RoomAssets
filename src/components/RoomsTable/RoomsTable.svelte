<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchRooms, type RoomDto } from '@/api/roomsApi';

  let items: RoomDto[] = [];
  let loading = true;
  let error: string | null = null;

  const STATUS_LABEL: Record<string, string> = {
    available: 'Доступна',
    booked: 'Забронирована',
    maintenance: 'На обслуживании',
  };

  onMount(async () => {
    try {
      const data = await fetchRooms(1);
      items = data.items;
    } catch (e) {
      error = (e as Error).message || 'Ошибка загрузки';
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Загрузка...</p>
{:else if error}
  <p style="color: red">Не удалось загрузить данные: {error}</p>
{:else}
  <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%">
    <thead>
      <tr>
        <th>Код</th>
        <th>Название</th>
        <th>Вместимость</th>
        <th>Оборудование</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      {#each items as room}
        <tr>
          <td>{room.code}</td>
          <td>{room.name}</td>
          <td>{room.capacity}</td>
          <td>{room.equipment.join(', ')}</td>
          <td>{STATUS_LABEL[room.status] ?? room.status}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}