import {InjectionToken} from "@angular/core";

export const APP_HEADER_BUTTONS = new InjectionToken<{ title: string, link: string, role: string }[]>('Кнопки хэдера')
