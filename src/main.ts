import 'reflect-metadata';
import { Container } from 'inversify';
import Application from './app/application.js';
import { Component } from './types/component.types.js';
import { applicationContainer } from './app/aplication.container.js';
import { userContainer } from './modules/user/user.container.js';
import { offerContainer } from './modules/offer/offer.container.js';
import { commentContainer } from './modules/comment/comment.container.js';

const mainContainer = Container.merge(
  applicationContainer,
  userContainer,
  offerContainer,
  commentContainer);

async function bootstrap() {
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
