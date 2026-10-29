<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;

  let className = '';
  export { className as class };
</script>

<button
  type="button"
  {disabled}
  class="button {variant} {size} {disabled ? 'disabled' : ''} {className}"
>
  <slot />
</button>

<style>
  .button {
    padding: 8px 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  .primary {
    background: var(--color-primary, #3b82f6);
    color: #fff;
  }
  .secondary {
    background: #eee;
    color: #222;
  }
  .sm { font-size: 14px; }
  .md { font-size: 16px; }
  .lg { font-size: 18px; }
  .disabled {
    opacity: 0.6;
    pointer-events: none;
  }
</style>