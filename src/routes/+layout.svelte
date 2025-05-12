<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    import { removeToast, toasts } from '../stores/toasts';
    import { PUBLIC_APP_NAME } from '$env/static/public';

    let { children } = $props();

    let theme = $state('system'); // default

    const applyTheme = (selected: string) => {
        theme = selected;
        localStorage.setItem('theme', selected);

        if (selected === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const systemTheme = prefersDark ? 'dracula' : 'winter';
            document.documentElement.setAttribute('data-theme', systemTheme);
        } else {
            document.documentElement.setAttribute('data-theme', selected);
        }

        // close the popover
        const popover = document.getElementById('theme-popover');
        popover?.hidePopover?.();
    };

    onMount(() => {
        theme = localStorage.getItem('theme') || 'system';
        applyTheme(theme);
    });
</script>

<div class="navbar bg-base-200 shadow-sm">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">{PUBLIC_APP_NAME}</a>
    </div>
    <div class="flex-none flex flex-row items-center gap-4">

        <!-- Theme select -->
        <button class="btn" popovertarget="theme-popover" style="anchor-name:theme-anchor">
            {#if theme === 'winter'}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
            {:else if theme === 'dracula'}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>

            {/if}
        </button>
        <ul class="dropdown menu rounded-box bg-base-100 shadow-sm"
            popover id="theme-popover" style="position-anchor:theme-anchor">
            <li>
                <button aria-label="light" onclick={() => applyTheme('winter')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>

                </button>
            </li>
            <li>
                <button aria-label="dark" onclick={() => applyTheme('dracula')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>

                </button>
            </li>
            <li>
                <button aria-label="system" onclick={() => applyTheme('system')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                    </svg>

                </button>
            </li>
        </ul>

        <!-- Account button -->
        <button class="btn  btn-ghost btn-circle avatar mr-4">
            <div class="w-10 rounded-full">
                <img
                    alt="Account"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </button>
    </div>
</div>

<div class="toast toast-end flex flex-col-reverse">
    {#each $toasts as toast (toast.id)}
        {#if toast.type === 'success'}
            <div class="alert alert-success">
                <span>{toast.message}</span>
            </div>
        {:else if toast.type === 'error'}
            <div class="alert alert-error">
                <span>{toast.message}</span>
                <button aria-label="close" onclick={() => removeToast(toast.id)} class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        {/if}
    {/each}
</div>


<main>
    {@render children()}
</main>
