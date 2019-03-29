import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
    stagger,
} from '@angular/animations';

export const contactFadeIn = 
trigger('contactFadeIn', [
    transition('void => *', [
        query('div', style({ opacity: 0 }), { optional: true }),
        query('div', 
        stagger('30ms', [
            animate('800ms', style({ opacity: 1 }))
        ]), { optional: true })
    ])
])
