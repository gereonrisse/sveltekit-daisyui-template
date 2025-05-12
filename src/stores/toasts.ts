import { type Writable, writable } from 'svelte/store';

export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error';
}

let idCounter = 0;

export const toasts: Writable<Toast[]> = writable([]);

export function addToast(message: string, type: 'success' | 'error') {
    const id = ++idCounter;
    const toast = { id, message, type };

    toasts.update((all) => [toast, ...all]);

    if (type === 'success') {
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    }

    return id;
}

export function removeToast(id: number) {
    toasts.update((all) => all.filter((t) => t.id !== id));
}