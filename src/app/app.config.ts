import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { providePrimeNG } from "primeng/config";
import { definePreset } from "@primeuix/themes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		providePrimeNG({
			theme: {
				preset: definePreset(Aura, {
					semantic: {
						primary: {
							50: '{slate.50}',
							100: '{slate.100}',
							200: '{slate.200}',
							300: '{slate.300}',
							400: '{slate.400}',
							500: '{slate.500}',
							600: '{slate.600}',
							700: '{slate.700}',
							800: '{slate.800}',
							900: '{slate.900}',
							950: '{slate.950}'
						}
					}
				}),
				options: {
					colorScheme: 'amber',
					darkModeSelector: 'none'
				}
			}
		})
	]
};
