import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client';
import { HttpLink  } from 'apollo-angular/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DeleteModalService } from './services/delete.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    DeleteModalService,
    provideClientHydration(),
    provideHttpClient(),
    {
      provide: APOLLO_OPTIONS,
      useFactory:(
        httpLink: HttpLink
      ): ApolloClientOptions<unknown> => ({
        link: ApolloLink.from([
          httpLink.create({uri: "http://localhost:4000/graphql"}),
        ]),
        cache: new InMemoryCache()
      }),
      deps: [HttpLink]
    },
    Apollo, provideAnimationsAsync()
  ]
};
