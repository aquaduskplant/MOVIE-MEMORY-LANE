// resources/js/app.jsx

import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// 👇 Force the app name to be MML (used in the browser tab title)
const appName = import.meta.env.VITE_APP_NAME || 'MML';

createInertiaApp({
  // This controls the <title> text in the browser tab
  title: (title) => (title ? `${title} - ${appName}` : appName),

  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),

  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <React.StrictMode>
        <App {...props} />
      </React.StrictMode>
    );
  },

  progress: {
    color: '#ec4899', // pink progress bar, optional
  },
});
