# Clon de Spotify

Primer contacto con NextJs 13, ya tocaba actualizarse. Siguiendo las indicaciones de Code With Antonio para comprobar las nuevas features!

https://www.youtube.com/watch?v=2aeMRB8LL4o&t=586s

Su perfil de Github: https://github.com/AntonioErdeljac/next13-spotify

Tecnologías que estamos usando:

- NextJS
- TS
- TailwindCSS
- tailwind-merge
- React-Icons
- Supabase para la gestion de la DB
- Autenticacion con Github
- Radix para uso de componentes
- Zustand
- ...

Importante hacer correr Stripe para sincronizar con la DB de Supabase

- .\stripe login
- .\stripe listen --forward-to localhost:3000/api/webhooks
- .\stripe trigger payment_intent.succeeded
