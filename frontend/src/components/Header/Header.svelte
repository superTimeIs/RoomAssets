<script lang="ts">
  import type { NavItem, UserBrief } from './header.types';
  import { DEFAULT_NAV } from './header.config';

  export let navItems: NavItem[] = DEFAULT_NAV;
  export let activeNavId: string;
  export let onNavigate: (id: string) => void = () => {};
  export let user: UserBrief | undefined = undefined;

  function getInitials(name: string | undefined) {
    if (!name) return 'NN';
    const [a = '', b = ''] = name.trim().split(/\s+/);
    return (a[0] ?? '').concat(b[0] ?? '').toUpperCase();
  }
</script>

<header class="header">
  <div class="row">
    <div class="brand">
      <div class="logoBox">🏢</div>
      <div class="app">Room Booking</div>
    </div>

    <nav class="nav" aria-label="Основная навигация">
      {#each navItems as item}
        <button
          type="button"
          class="tab {item.id === activeNavId ? 'tabActive' : ''}"
          on:click={() => onNavigate(item.id)}
          title={item.label}
        >
          {item.label}
        </button>
      {/each}
    </nav>

    <div class="spacer"></div>

    <div class="right">
      <div class="avatar" title={user?.name || 'Гость'}>
        {#if user?.avatarUrl}
          <img src={user.avatarUrl} alt="" width="32" height="32" style="border-radius:999px" />
        {:else}
          <span>{getInitials(user?.name)}</span>
        {/if}
      </div>
    </div>
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    background: #fff;
    border-bottom: 1px solid #eef0f3;
    z-index: 10;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 10px 16px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #0f172a;
    font-weight: 700;
  }
  .logoBox {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: #1d4ed8;
    color: #fff;
    display: grid;
    place-items: center;
  }
  .app { font-size: 18px; }
  .nav {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 8px;
  }
  .tab {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: #334155;
    cursor: pointer;
  }
  .tabActive {
    background: #1d4ed8;
    color: #fff;
  }
  .spacer { flex: 1; }
  .right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background: #cdd5df;
    display: grid;
    place-items: center;
    color: #334155;
    font-weight: 700;
  }
</style>